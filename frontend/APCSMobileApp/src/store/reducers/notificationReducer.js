// File: src/store/reducers/notificationReducer.js
import * as types from '../types';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case types.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
        error: null,
      };
      
    case types.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case types.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
      
    case types.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          notification.id === action.payload 
            ? { ...notification, read: true } 
            : notification
        ),
      };
      
    case types.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
      
    default:
      return state;
  }
};

export default notificationReducer;