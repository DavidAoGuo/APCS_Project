// File: src/screens/auth/ChangePasswordScreen.js
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Loading } from '../../components/common';
import { changePassword } from '../../store/actions/authActions';
import { theme } from '../../theme';
import platformAlert from '../../utils/platformAlert';

const ChangePasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const formErrors = {};
    
    if (!currentPassword) {
      formErrors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      formErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      formErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleChangePassword = async () => {
    if (!validateForm()) return;
    
    try {
      await dispatch(changePassword(currentPassword, newPassword));
      
      platformAlert(
        'Success',
        'Your password has been changed successfully.'
      );
      
      navigation.goBack();
    } catch (error) {
      platformAlert(
        'Change Failed',
        error.message || 'Failed to change password. Please try again.'
      );
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {loading && <Loading fullscreen />}
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Change Password</Text>
          
          <Input
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter your current password"
            secureTextEntry
            error={errors.currentPassword}
          />
          
          <Input
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter your new password"
            secureTextEntry
            error={errors.newPassword}
          />
          
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your new password"
            secureTextEntry
            error={errors.confirmPassword}
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              type="outline"
              onPress={() => navigation.goBack()}
              style={styles.button}
            />
            
            <Button
              title="Change Password"
              onPress={handleChangePassword}
              style={styles.button}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: theme.metrics.spacing.large,
  },
  title: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.large,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.metrics.spacing.large,
  },
  button: {
    flex: 0.48,
  },
});

export default ChangePasswordScreen;