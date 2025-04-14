// File: src/services/api/controlService.js
import { API_ENDPOINTS } from '../../utils/constants';
import apiClient from './apiClient';

export const dispenseFood = async (amount) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.DISPENSE_FOOD, { amount });
    return response.data;
  } catch (error) {
    console.error('Error dispensing food:', error);
    throw error;
  }
};

export const dispenseWater = async (amount) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.DISPENSE_WATER, { amount });
    return response.data;
  } catch (error) {
    console.error('Error dispensing water:', error);
    throw error;
  }
};

export const setTemperature = async (temperature) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SET_TEMPERATURE, { temperature });
    return response.data;
  } catch (error) {
    console.error('Error setting temperature:', error);
    throw error;
  }
};