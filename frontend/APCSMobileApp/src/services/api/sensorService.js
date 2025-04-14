// File: src/services/api/sensorService.js
import { API_ENDPOINTS } from '../../utils/constants';
import apiClient from './apiClient';

export const getAllSensorData = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SENSORS);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};

export const getFoodLevel = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.FOOD_LEVEL);
    return response.data;
  } catch (error) {
    console.error('Error fetching food level:', error);
    throw error;
  }
};

export const getWaterLevel = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.WATER_LEVEL);
    return response.data;
  } catch (error) {
    console.error('Error fetching water level:', error);
    throw error;
  }
};

export const getTemperature = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TEMPERATURE);
    return response.data;
  } catch (error) {
    console.error('Error fetching temperature:', error);
    throw error;
  }
};

export const getHumidity = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HUMIDITY);
    return response.data;
  } catch (error) {
    console.error('Error fetching humidity:', error);
    throw error;
  }
};

export const getSensorHistory = async (sensorType, timeRange) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.SENSORS}/history`, {
      params: { type: sensorType, range: timeRange }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor history:', error);
    throw error;
  }
};