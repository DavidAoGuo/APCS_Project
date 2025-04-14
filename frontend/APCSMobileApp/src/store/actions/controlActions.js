// File: src/store/actions/controlActions.js
import * as controlService from '../../services/api/controlService';
import socketService from '../../services/socket/socketService';
import * as types from '../types';

// Dispense food
export const dispenseFood = (amount) => {
  return async dispatch => {
    dispatch({ type: types.DISPENSE_FOOD_REQUEST });
    
    try {
      // First try using socket for real-time feedback
      const socketSuccess = socketService.dispenseFood(amount);
      
      // If socket is not connected, fall back to REST API
      if (!socketSuccess) {
        await controlService.dispenseFood(amount);
      }
      
      dispatch({
        type: types.DISPENSE_FOOD_SUCCESS,
        payload: { amount },
      });
      
      return Promise.resolve({ success: true, amount });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to dispense food';
      
      dispatch({
        type: types.DISPENSE_FOOD_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Dispense water
export const dispenseWater = (amount) => {
  return async dispatch => {
    dispatch({ type: types.DISPENSE_WATER_REQUEST });
    
    try {
      // First try using socket for real-time feedback
      const socketSuccess = socketService.dispenseWater(amount);
      
      // If socket is not connected, fall back to REST API
      if (!socketSuccess) {
        await controlService.dispenseWater(amount);
      }
      
      dispatch({
        type: types.DISPENSE_WATER_SUCCESS,
        payload: { amount },
      });
      
      return Promise.resolve({ success: true, amount });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to dispense water';
      
      dispatch({
        type: types.DISPENSE_WATER_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};

// Set temperature
export const setTemperature = (temperature) => {
  return async dispatch => {
    dispatch({ type: types.SET_TEMPERATURE_REQUEST });
    
    try {
      // First try using socket for real-time feedback
      const socketSuccess = socketService.setTemperature(temperature);
      
      // If socket is not connected, fall back to REST API
      if (!socketSuccess) {
        await controlService.setTemperature(temperature);
      }
      
      dispatch({
        type: types.SET_TEMPERATURE_SUCCESS,
        payload: { temperature },
      });
      
      return Promise.resolve({ success: true, temperature });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to set temperature';
      
      dispatch({
        type: types.SET_TEMPERATURE_FAILURE,
        payload: errorMessage,
      });
      
      return Promise.reject(new Error(errorMessage));
    }
  };
};