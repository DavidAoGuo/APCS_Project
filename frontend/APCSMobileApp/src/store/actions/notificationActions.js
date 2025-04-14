// File: src/store/actions/notificationActions.js
import * as types from '../types';

// Fetch notifications
export const fetchNotifications = () => {
  return async dispatch => {
    dispatch({ type: types.FETCH_NOTIFICATIONS_REQUEST });
    
    try {
      // In a real app, you would fetch from an API
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock notifications
      const notifications = [
        {
          id: '1',
          title: 'Low Food Level',
          message: 'Food level is below 20%. Consider refilling soon.',
          type: 'warning',
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        },
        {
          id: '2',
          title: 'Water Refilled',
          message: 'Water has been automatically refilled.',
          type: 'info',
          read: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: '3',
          title: 'Temperature Alert',
          message: 'Temperature is above normal range (28°C).',
          type: 'danger',
          read: false,
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        },
        {
          id: '4',
          title: 'Feeding Scheduled',
          message: 'Next feeding scheduled for 8:00 AM tomorrow.',
          type: 'info',
          read: true,
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ];
      
      dispatch({
        type: types.FETCH_NOTIFICATIONS_SUCCESS,
        payload: notifications,
      });
      
      return Promise.resolve(notifications);
    } catch (error) {
      dispatch({
        type: types.FETCH_NOTIFICATIONS_FAILURE,
        payload: error.message || 'Failed to fetch notifications',
      });
      
      return Promise.reject(error);
    }
  };
};

// Add a new notification
export const addNotification = (notification) => ({
  type: types.ADD_NOTIFICATION,
  payload: notification,
});

// Mark notification as read
export const markNotificationRead = (id) => ({
  type: types.MARK_NOTIFICATION_READ,
  payload: id,
});

// Clear all notifications
export const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
});