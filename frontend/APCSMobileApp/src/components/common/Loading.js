// File: src/components/common/Loading.js
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

const Loading = ({ 
  size = 'large', 
  color = theme.colors.primary,
  fullscreen = false,
  message = 'Loading...',
  showMessage = true,
}) => {
  if (fullscreen) {
    return (
      <View style={styles.fullscreen}>
        <ActivityIndicator size={size} color={color} />
        {showMessage && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {showMessage && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.metrics.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  message: {
    marginTop: theme.metrics.spacing.small,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
});

export default Loading;