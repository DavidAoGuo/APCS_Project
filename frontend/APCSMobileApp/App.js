// File: App.js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import pushNotificationService from './src/services/notifications/pushNotificationService';
import { addNotification } from './src/store/actions/notificationActions';
import store from './src/store/store';

export default function App() {
  useEffect(() => {
    // Register for push notifications
    const registerNotifications = async () => {
      try {
        await pushNotificationService.registerForPushNotifications();
        
        // Set up notification listeners
        pushNotificationService.setupListeners(
          // Handle received notification
          notification => {
            console.log('Notification received:', notification);
            
            // Add notification to Redux store
            const { title, body, data } = notification.request.content;
            
            store.dispatch(addNotification({
              id: notification.request.identifier || Date.now().toString(),
              title: title || 'Notification',
              message: body || 'You have a new notification',
              type: data?.type || 'info',
              read: false,
              timestamp: new Date().toISOString(),
            }));
          },
          // Handle notification response (when user taps on notification)
          response => {
            console.log('Notification response:', response);
            
            // Here you could handle navigation based on the notification
            // For example, navigate to a specific screen
          }
        );
      } catch (error) {
        console.log('Push notification setup failed, continuing without notifications');
      }
    };
    
    registerNotifications().catch(err => {
      console.log('Failed to register notifications, app will continue without them');
    });
    
    // Clean up listeners when component unmounts
    return () => {
      try {
        pushNotificationService.removeListeners();
      } catch (error) {
        console.log('Error removing notification listeners');
      }
    };
  }, []);
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}