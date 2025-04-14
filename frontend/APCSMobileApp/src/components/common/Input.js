// File: src/components/common/Input.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const Input = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  icon,
  disabled = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer, 
        error && styles.inputError,
        disabled && styles.inputDisabled
      ]}>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color={theme.colors.textSecondary} />
          </View>
        )}
        
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.secureButton}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Ionicons 
              name={isSecure ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.metrics.spacing.medium,
    width: '100%',
  },
  label: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.tiny,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.metrics.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: theme.metrics.spacing.medium,
    paddingHorizontal: theme.metrics.spacing.medium,
    color: theme.colors.text,
    fontSize: theme.fonts.sizes.medium,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fonts.sizes.small,
    marginTop: theme.metrics.spacing.tiny,
  },
  iconContainer: {
    paddingLeft: theme.metrics.spacing.medium,
  },
  secureButton: {
    padding: theme.metrics.spacing.medium,
  },
});

export default Input;