// File: src/services/api/scheduleService.js
import { API_ENDPOINTS } from '../../utils/constants';
import apiClient from './apiClient';

export const getSchedules = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SCHEDULES);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }
};

export const createSchedule = async (scheduleData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SCHEDULES, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Error creating schedule:', error);
    throw error;
  }
};

export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await apiClient.put(`${API_ENDPOINTS.SCHEDULES}/${id}`, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    await apiClient.delete(`${API_ENDPOINTS.SCHEDULES}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
};

export const toggleSchedule = async (id, enabled) => {
  try {
    const response = await apiClient.patch(`${API_ENDPOINTS.SCHEDULES}/${id}/toggle`, { enabled });
    return response.data;
  } catch (error) {
    console.error('Error toggling schedule:', error);
    throw error;
  }
};