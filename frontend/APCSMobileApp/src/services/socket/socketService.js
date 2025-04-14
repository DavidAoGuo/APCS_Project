// File: src/services/socket/socketService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../utils/constants';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.dispatch = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  async connect(dispatch) {
    if (this.isConnected) return;
    
    this.dispatch = dispatch;
    
    try {
      // Get authentication token
      const token = await AsyncStorage.getItem('userToken');
      
      // Connect to socket server with auth token
      this.socket = io(SOCKET_URL, {
        auth: {
          token
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts
      });
      
      // Set up connection event handlers
      this.socket.on('connect', this.handleConnect.bind(this));
      this.socket.on('disconnect', this.handleDisconnect.bind(this));
      this.socket.on('error', this.handleError.bind(this));
      this.socket.on('connect_error', this.handleConnectError.bind(this));
      
      // Set up reconnection attempts counter
      this.socket.on('reconnect_attempt', (attempt) => {
        this.reconnectAttempts = attempt;
        console.log(`Socket reconnection attempt ${attempt}/${this.maxReconnectAttempts}`);
      });
      
      // Set up custom event handlers
      this.setupEventHandlers();
      
      console.log('Socket service initialized');
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }
  
  disconnect() {
    if (!this.isConnected || !this.socket) return;
    
    this.socket.disconnect();
    this.socket = null;
    this.isConnected = false;
    console.log('Socket service disconnected');
  }
  
  handleConnect() {
    this.isConnected = true;
    this.reconnectAttempts = 0;
    console.log('Socket connected');
  }
  
  handleDisconnect(reason) {
    this.isConnected = false;
    console.log(`Socket disconnected: ${reason}`);
  }
  
  handleError(error) {
    console.error('Socket error:', error);
  }
  
  handleConnectError(error) {
    console.error('Socket connection error:', error);
    
    // If max reconnection attempts reached, notify user
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Maximum reconnection attempts reached');
      // You might want to dispatch an action to show an error message
    }
  }
  
  setupEventHandlers() {
    if (!this.socket) return;
    
    // Listen for sensor updates
    this.socket.on('foodLevelUpdate', this.handleFoodLevelUpdate.bind(this));
    this.socket.on('waterLevelUpdate', this.handleWaterLevelUpdate.bind(this));
    this.socket.on('temperatureUpdate', this.handleTemperatureUpdate.bind(this));
    this.socket.on('humidityUpdate', this.handleHumidityUpdate.bind(this));
    
    // Listen for notifications
    this.socket.on('notification', this.handleNotification.bind(this));
    
    // Listen for status updates
    this.socket.on('deviceStatus', this.handleDeviceStatus.bind(this));
  }
  
  handleFoodLevelUpdate(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'UPDATE_FOOD_LEVEL',
      payload: data.level
    });
  }
  
  handleWaterLevelUpdate(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'UPDATE_WATER_LEVEL',
      payload: data.level
    });
  }
  
  handleTemperatureUpdate(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'UPDATE_TEMPERATURE',
      payload: data.temperature
    });
  }
  
  handleHumidityUpdate(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'UPDATE_HUMIDITY',
      payload: data.humidity
    });
  }
  
  handleNotification(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: data.id,
        title: data.title,
        message: data.message,
        type: data.type,
        read: false,
        timestamp: data.timestamp || new Date().toISOString()
      }
    });
  }
  
  handleDeviceStatus(data) {
    if (!this.dispatch) return;
    
    this.dispatch({
      type: 'UPDATE_DEVICE_STATUS',
      payload: data
    });
  }
  
  // Methods to emit events to the server
  dispenseFood(amount) {
    if (!this.socket || !this.isConnected) return false;
    
    this.socket.emit('dispenseFood', { amount });
    return true;
  }
  
  dispenseWater(amount) {
    if (!this.socket || !this.isConnected) return false;
    
    this.socket.emit('dispenseWater', { amount });
    return true;
  }
  
  setTemperature(temperature) {
    if (!this.socket || !this.isConnected) return false;
    
    this.socket.emit('setTemperature', { temperature });
    return true;
  }
}

export default new SocketService();