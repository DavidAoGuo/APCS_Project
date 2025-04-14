// File: src/store/reducers/controlReducer.js
import * as types from '../types';

const initialState = {
  loading: false,
  error: null,
  lastCommand: null
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    // Food dispensing
    case types.DISPENSE_FOOD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.DISPENSE_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCommand: {
          type: 'food',
          amount: action.payload.amount,
          timestamp: new Date().toISOString()
        }
      };
    case types.DISPENSE_FOOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Water dispensing
    case types.DISPENSE_WATER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.DISPENSE_WATER_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCommand: {
          type: 'water',
          amount: action.payload.amount,
          timestamp: new Date().toISOString()
        }
      };
    case types.DISPENSE_WATER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Temperature setting
    case types.SET_TEMPERATURE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.SET_TEMPERATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCommand: {
          type: 'temperature',
          value: action.payload.temperature,
          timestamp: new Date().toISOString()
        }
      };
    case types.SET_TEMPERATURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default controlReducer;