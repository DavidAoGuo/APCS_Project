// File: src/services/api/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../../utils/constants';
import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password
    });
    
    const { token, refreshToken, user } = response.data;
    
    // Save tokens to storage
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password
    });
    
    const { token, refreshToken, user } = response.data;
    
    // Save tokens to storage
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Optionally notify the server about logout
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        await apiClient.post('/auth/logout');
        console.log('API logout successful');
      } catch (logoutError) {
        console.error('API logout error:', logoutError);
        // Continue with local logout even if API logout fails
      }
    }
    
    // Clear tokens from storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    
    console.log('Logout successful - tokens cleared');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    
    // Still remove tokens even if API call fails
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (removeError) {
      console.error('Error removing tokens:', removeError);
    }
    
    return true;
  }
};

export const forgotPassword = async (email) => {
  try {
    await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return true;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await apiClient.get('/auth/verify');
    return response.data.user;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    await apiClient.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return true;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};