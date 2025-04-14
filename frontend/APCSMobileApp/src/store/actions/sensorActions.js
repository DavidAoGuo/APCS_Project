// File: src/store/actions/sensorActions.js
import * as sensorService from '../../services/api/sensorService';
import * as types from '../types';

// Fetch all sensor data
export const fetchSensorData = () => {
    return async dispatch => {
      dispatch({ type: types.FETCH_SENSORS_REQUEST });
      
      try {
        const response = await sensorService.getAllSensorData();
        
        // Make sure we're accessing the data property from the response
        dispatch({
          type: types.FETCH_SENSORS_SUCCESS,
          payload: response.data, // Access the nested data object
        });
        
        console.log('Sensor data fetched successfully:', response.data);
        return Promise.resolve(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch sensor data';
        
        console.error('Error fetching sensor data:', error);
        dispatch({
          type: types.FETCH_SENSORS_FAILURE,
          payload: errorMessage,
        });
        
        return Promise.reject(new Error(errorMessage));
      }
    };
  };

// Fetch sensor history
export const fetchSensorHistory = (sensorType, timeRange) => {
  return async dispatch => {
    dispatch({ type: types.FETCH_SENSOR_HISTORY_REQUEST });
    
    try {
      const historyData = await sensorService.getSensorHistory(sensorType, timeRange);
      
      dispatch({
        type: types.FETCH_SENSOR_HISTORY_SUCCESS,
        payload: {
          type: sensorType,
          data: historyData,
        },
      });
      
      return Promise.resolve(historyData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch sensor history';
      
      dispatch({
        type: types.FETCH_SENSOR_HISTORY_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Update individual sensor values (called from socket events)
export const updateFoodLevel = (level) => ({
  type: types.UPDATE_FOOD_LEVEL,
  payload: level,
});

export const updateWaterLevel = (level) => ({
  type: types.UPDATE_WATER_LEVEL,
  payload: level,
});

export const updateTemperature = (temp) => ({
  type: types.UPDATE_TEMPERATURE,
  payload: temp,
});

export const updateHumidity = (humidity) => ({
  type: types.UPDATE_HUMIDITY,
  payload: humidity,
});