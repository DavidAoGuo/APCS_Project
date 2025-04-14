// File: src/screens/onboarding/SetupScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const SetupScreen = ({ navigation }) => {
  const completeOnboarding = async () => {
    try {
      // For demo purposes, we're setting a dummy token
      await AsyncStorage.setItem('userToken', 'dummyToken');
      // Navigate to the main app
      navigation.replace('Main');
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your Device</Text>
      <Text style={styles.subtitle}>Connect your APCS to get started</Text>
      
      <View style={styles.stepsContainer}>
        <Text style={styles.stepText}>1. Power on your APCS device</Text>
        <Text style={styles.stepText}>2. Connect to your home Wi-Fi</Text>
        <Text style={styles.stepText}>3. Pair with this app</Text>
        <Text style={styles.stepText}>4. Set your preferences</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={completeOnboarding}
      >
        <Text style={styles.buttonText}>Complete Setup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={completeOnboarding}
      >
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.metrics.spacing.large,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    marginBottom: theme.metrics.spacing.medium,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: theme.fonts.sizes.large,
    marginBottom: theme.metrics.spacing.xlarge,
    color: theme.colors.textSecondary,
  },
  stepsContainer: {
    alignSelf: 'flex-start',
    marginBottom: theme.metrics.spacing.xlarge,
  },
  stepText: {
    fontSize: theme.fonts.sizes.medium,
    marginBottom: theme.metrics.spacing.medium,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.medium,
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.medium,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: theme.metrics.spacing.small,
  },
  skipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.sizes.medium,
  },
});

export default SetupScreen;