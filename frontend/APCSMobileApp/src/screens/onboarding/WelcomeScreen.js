// File: src/screens/onboarding/WelcomeScreen.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to APCS</Text>
      <Text style={styles.subtitle}>Your Automated Pet Care System</Text>
      
      <View style={styles.featureContainer}>
        <Text style={styles.featureText}>• Monitor your pet's food and water levels</Text>
        <Text style={styles.featureText}>• Control temperature and humidity</Text>
        <Text style={styles.featureText}>• Schedule automatic feeding</Text>
        <Text style={styles.featureText}>• Get real-time notifications</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Setup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
    fontSize: theme.fonts.sizes.header,
    fontWeight: 'bold',
    marginBottom: theme.metrics.spacing.medium,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: theme.fonts.sizes.large,
    marginBottom: theme.metrics.spacing.xlarge,
    color: theme.colors.textSecondary,
  },
  featureContainer: {
    alignSelf: 'flex-start',
    marginBottom: theme.metrics.spacing.xlarge,
  },
  featureText: {
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
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;