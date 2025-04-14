// File: src/services/notifications/pushNotificationService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Setup notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class PushNotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }
  
  async registerForPushNotifications() {
    try {
      // Check if we're in Expo Go (where push notifications aren't fully supported)
      if (Constants?.manifest?.extra?.expoGo) {
        console.log('Push notifications have limited support in Expo Go');
        return false;
      }
      
      // Check for existing permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      // If not already granted, request permission
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      // If still not granted, return false
      if (finalStatus !== 'granted') {
        console.log('Permission for notifications not granted!');
        return false;
      }
      
      // Get the token
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });
        this.expoPushToken = token.data;
      } catch (error) {
        console.log('Push token not available in development environment');
        this.expoPushToken = 'development-token';
      }
      
      // Save token to storage for later use
      await AsyncStorage.setItem('pushToken', this.expoPushToken);
      
      // Set up notification channel for Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      
      console.log('Push notification token:', this.expoPushToken);
      return true;
    } catch (error) {
      console.log('Error registering for push notifications:', error);
      return false;
    }
  }
  
  setupListeners(onNotification, onNotificationResponse) {
    // Remove any existing listeners
    this.removeListeners();
    
    try {
      // When a notification is received while the app is foregrounded
      this.notificationListener = Notifications.addNotificationReceivedListener(
        notification => {
          if (onNotification) {
            onNotification(notification);
          }
        }
      );
      
      // When a user taps on a notification
      this.responseListener = Notifications.addNotificationResponseReceivedListener(
        response => {
          if (onNotificationResponse) {
            onNotificationResponse(response);
          }
        }
      );
    } catch (error) {
      console.log('Error setting up notification listeners:', error);
    }
  }
  
  removeListeners() {
    try {
      if (this.notificationListener) {
        Notifications.removeNotificationSubscription(this.notificationListener);
        this.notificationListener = null;
      }
      
      if (this.responseListener) {
        Notifications.removeNotificationSubscription(this.responseListener);
        this.responseListener = null;
      }
    } catch (error) {
      console.log('Error removing notification listeners:', error);
    }
  }
  
  async schedulePushNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: null, // Immediate notification
      });
      
      return true;
    } catch (error) {
      console.log('Error scheduling push notification:', error);
      return false;
    }
  }
}

export default new PushNotificationService();