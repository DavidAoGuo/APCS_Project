// File: src/screens/auth/LoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '../../components/common';
import { login } from '../../store/actions/authActions';
import { theme } from '../../theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await dispatch(login(email, password));
        // No need to navigate - AppNavigator will handle it based on auth state
      } catch (error) {
        Alert.alert('Login Failed', error.message || 'Something went wrong. Please try again.');
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            {/* App Logo */}
            <View style={styles.logoCircle}>
              <Ionicons name="paw" size={60} color={theme.colors.primary} />
            </View>
            <Text style={styles.logoText}>APCS</Text>
            <Text style={styles.subtitle}>Automated Pet Care System</Text>
          </View>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.formContainer}>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              icon="mail-outline"
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
              icon="lock-closed-outline"
            />
            
            <TouchableOpacity 
              style={styles.forgotButton}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <Button
              title="Log In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: theme.metrics.spacing.large,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.xlarge,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.metrics.spacing.medium,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  logoText: {
    fontSize: theme.fonts.sizes.header,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.metrics.spacing.tiny,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.small,
    marginBottom: theme.metrics.spacing.medium,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fonts.sizes.small,
  },
  formContainer: {
    width: '100%',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.metrics.spacing.medium,
  },
  forgotText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizes.small,
  },
  loginButton: {
    marginTop: theme.metrics.spacing.medium,
    marginBottom: theme.metrics.spacing.large,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.text,
    fontSize: theme.fonts.sizes.medium,
  },
  registerLink: {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default LoginScreen;