import { Alert, Platform } from 'react-native';

const webAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    // For web, use browser's native alert and then call any button callbacks
    window.alert(`${title}\n\n${message}`);
    
    // Find and execute the "OK" or positive action button callback
    const okButton = buttons.find(button => 
      button.text === 'OK' || 
      button.style === 'default' || 
      button.style === 'positive'
    );
    
    if (okButton && okButton.onPress) {
      setTimeout(() => {
        okButton.onPress();
      }, 100);
    }
  } else {
    // For mobile, use React Native's Alert
    Alert.alert(title, message, buttons);
  }
};

export default webAlert;