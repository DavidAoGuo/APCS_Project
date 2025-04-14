// File: src/store/reducers/authReducer.js
import * as types from '../types';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
      
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case types.LOGOUT:
      return {
        ...initialState,
      };
      
    default:
      return state;

    case types.UPDATE_PROFILE_REQUEST:
    case types.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    
    case types.UPDATE_PROFILE_FAILURE:
    case types.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };  
    }
};

export default authReducer;