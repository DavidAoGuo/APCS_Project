import { Alert, Platform } from 'react-native';

/**
 * Cross-platform alert that works on both native and web
 * @param {string} title Alert title
 * @param {string} message Alert message
 * @param {Array} buttons Array of button objects with text and onPress
 */
const platformAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    console.log(`Alert: ${title} - ${message}`);
    
    // For web, use browser's native alert
    window.alert(`${title}\n\n${message}`);
    
    // Find the OK or confirm button and call its onPress handler if any
    const confirmButton = buttons.find(button => 
      button.text === 'OK' || 
      button.text === 'Yes' || 
      button.text === 'Confirm' ||
      button.style === 'default'
    );
    
    if (confirmButton && confirmButton.onPress) {
      // Small delay to let alert close
      setTimeout(() => {
        confirmButton.onPress();
      }, 100);
    }
  } else {
    // For native platforms, use React Native's Alert
    Alert.alert(title, message, buttons);
  }
};

export default platformAlert;