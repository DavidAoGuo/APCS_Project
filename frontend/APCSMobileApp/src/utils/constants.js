// File: src/utils/constants.js
// Replace with your actual backend URL
export const API_BASE_URL = 'http://192.168.1.223:5000/api';

// For WebSocket connections
export const SOCKET_URL = 'http://192.168.1.223:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  REFRESH_TOKEN: '/auth/refresh-token',
  
  // Sensor endpoints
  SENSORS: '/sensors',
  FOOD_LEVEL: '/sensors/food',
  WATER_LEVEL: '/sensors/water',
  TEMPERATURE: '/sensors/temperature',
  HUMIDITY: '/sensors/humidity',
  
  // Control endpoints
  DISPENSE_FOOD: '/control/dispense-food',
  DISPENSE_WATER: '/control/dispense-water',
  SET_TEMPERATURE: '/control/set-temperature',
  
  // Schedule endpoints
  SCHEDULES: '/schedules',
  
  // Notification endpoints
  NOTIFICATIONS: '/notifications',
  
  // User endpoints
  USER_PROFILE: '/users/profile',
  USER_SETTINGS: '/users/settings'
};

// Other constants remain the same
export const SENSOR_REFRESH_INTERVAL = 5000;

export const PET_TYPES = [
  { id: 1, name: 'Dog' },
  { id: 2, name: 'Cat' },
  { id: 3, name: 'Bird' },
  { id: 4, name: 'Fish' },
  { id: 5, name: 'Other' }
];

export const THRESHOLD_LEVELS = {
  FOOD: {
    LOW: 20,     // 20% remaining
    CRITICAL: 10  // 10% remaining
  },
  WATER: {
    LOW: 25,      // 25% remaining
    CRITICAL: 15   // 15% remaining
  },
  TEMPERATURE: {
    MIN: 15,  // Minimum safe temperature in Celsius
    MAX: 30   // Maximum safe temperature in Celsius
  },
  HUMIDITY: {
    MIN: 40,  // Minimum safe humidity in %
    MAX: 70   // Maximum safe humidity in %
  }
};