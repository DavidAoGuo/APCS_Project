// File: src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import controlReducer from './controlReducer';
import notificationReducer from './notificationReducer';
import sensorReducer from './sensorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sensors: sensorReducer,
  notifications: notificationReducer,
  control: controlReducer
});

export default rootReducer;