// File: src/store/actions/authActions.js
import { Platform } from 'react-native';
import * as authService from '../../services/api/authService';
import * as types from '../types';

// Login action
export const login = (email, password) => {
  return async dispatch => {
    dispatch({ type: types.LOGIN_REQUEST });
    
    try {
      const user = await authService.login(email, password);
      
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: user,
      });
      
      return Promise.resolve(user);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Register action
export const register = (name, email, password) => {
  return async dispatch => {
    dispatch({ type: types.REGISTER_REQUEST });
    
    try {
      const user = await authService.register(name, email, password);
      
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: user,
      });
      
      return Promise.resolve(user);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      
      dispatch({
        type: types.REGISTER_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Logout action
export const logout = () => {
  return async dispatch => {
    try {
      // Log before logout attempt
      console.log('Starting logout process in Redux action');
      
      await authService.logout();
      
      // Dispatch logout action
      console.log('Dispatching LOGOUT action');
      dispatch({ type: types.LOGOUT });
      
      console.log('Logout process completed');
      
      // For web platform, reload the page after a short delay
      if (Platform.OS === 'web') {
        console.log('Web platform detected, will reload shortly');
        setTimeout(() => {
          window.location.href = '/'; // Force navigation to home/login
        }, 300);
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Logout error in Redux action:', error);
      
      // Still dispatch logout even if API call fails
      dispatch({ type: types.LOGOUT });
      
      return Promise.reject(error);
    }
  };
};

// Check auth state
export const checkAuthState = () => {
  return async dispatch => {
    try {
      dispatch({ type: types.AUTH_STATE_CHECK });
      
      const user = await authService.verifyToken();
      
      if (user) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: user,
        });
        
        return Promise.resolve(user);
      } else {
        dispatch({ type: types.LOGOUT });
        return Promise.resolve(null);
      }
    } catch (error) {
      console.error('Auth state check error:', error);
      dispatch({ type: types.LOGOUT });
      return Promise.reject(error);
    }
  };
};

// Update profile action
export const updateProfile = (userData) => {
  return async dispatch => {
    dispatch({ type: types.UPDATE_PROFILE_REQUEST });
    
    try {
      const updatedUser = await authService.updateProfile(userData);
      
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: updatedUser,
      });
      
      return Promise.resolve(updatedUser);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      
      dispatch({
        type: types.UPDATE_PROFILE_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Change password action
export const changePassword = (currentPassword, newPassword) => {
  return async dispatch => {
    dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
    
    try {
      await authService.changePassword(currentPassword, newPassword);
      
      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS,
      });
      
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      
      dispatch({
        type: types.CHANGE_PASSWORD_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};