// File: src/navigation/AppNavigator.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../store/types';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import services and actions
import socketService from '../services/socket/socketService';
import { checkAuthState } from '../store/actions/authActions';

// Import screens
import { Loading } from '../components/common';
import SetupScreen from '../screens/onboarding/SetupScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    // Check if this is the first launch
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false);
      }
    };
    
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // Add this line to check if auto-login is enabled (default to false)
        const autoLogin = await AsyncStorage.getItem('autoLogin');
        
        if (autoLogin === 'true') {
          await dispatch(checkAuthState());
        } else {
          // Skip auto-login, just set initializing to false
          dispatch({ type: types.LOGOUT });
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setInitializing(false);
      }
    };
    
    // Run both checks
    Promise.all([checkFirstLaunch(), checkAuth()]);
  }, [dispatch]);
  
  // Connect/disconnect socket service when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect(dispatch);
    } else {
      socketService.disconnect();
    }
    
    // Clean up on unmount
    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, dispatch]);
  
  // Show loading screen while initializing
  if (initializing || isFirstLaunch === null) {
    return <Loading fullscreen message="Starting up..." />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          // Onboarding screens for first time users
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Setup" component={SetupScreen} />
          </>
        ) : (
          // Main app flow - Either auth or main screens based on login status
          <>
            {isAuthenticated ? (
              <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
              <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;