// File: src/screens/auth/ForgotPasswordScreen.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Back to Login</Text>
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
    marginBottom: theme.metrics.spacing.xlarge,
    color: theme.colors.primary,
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
  linkButton: {
    padding: theme.metrics.spacing.small,
    marginTop: theme.metrics.spacing.small,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizes.medium,
  },
});

export default ForgotPasswordScreen;