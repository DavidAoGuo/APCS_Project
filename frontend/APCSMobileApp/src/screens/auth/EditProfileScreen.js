import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Loading } from '../../components/common';
import { updateProfile } from '../../store/actions/authActions';
import { theme } from '../../theme';
import platformAlert from '../../utils/platformAlert';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const formErrors = {};
    
    if (!name.trim()) {
      formErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleUpdateProfile = async () => {
    if (!validateForm()) return;
    
    try {
      await dispatch(updateProfile({ name, email }));
      
      platformAlert(
        'Success',
        'Your profile has been updated successfully.'
      );
      
      navigation.goBack();
    } catch (error) {
      platformAlert(
        'Update Failed',
        error.message || 'Failed to update profile. Please try again.'
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
          <Text style={styles.title}>Edit Profile</Text>
          
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            error={errors.name}
            autoCapitalize="words"
          />
          
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              type="outline"
              onPress={() => navigation.goBack()}
              style={styles.button}
            />
            
            <Button
              title="Save Changes"
              onPress={handleUpdateProfile}
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

export default EditProfileScreen;