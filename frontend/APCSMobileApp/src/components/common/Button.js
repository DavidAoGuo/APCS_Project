import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  style,
  textStyle 
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'transparent':
        return styles.transparentButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'transparent':
        return styles.transparentText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  // Add special handling for web clicks
  const handlePress = (e) => {
    if (disabled || loading) return;
    
    // Log the button press for debugging
    console.log(`Button pressed: ${title}`);
    
    // Add special handling for web
    if (Platform.OS === 'web') {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      
      // Execute the onPress handler directly
      if (onPress) {
        console.log(`Executing ${title} handler for web`);
        onPress();
      }
    } else {
      // Mobile handling remains the same
      if (onPress) {
        onPress();
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        disabled && styles.disabledButton,
        style
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'outline' || type === 'transparent' ? theme.colors.primary : theme.colors.background} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.metrics.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  transparentButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: theme.metrics.spacing.small,
    paddingHorizontal: theme.metrics.spacing.medium,
  },
  mediumButton: {
    paddingVertical: theme.metrics.spacing.medium,
    paddingHorizontal: theme.metrics.spacing.large,
  },
  largeButton: {
    paddingVertical: theme.metrics.spacing.large,
    paddingHorizontal: theme.metrics.spacing.xlarge,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryText: {
    color: theme.colors.background,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: theme.colors.background,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  outlineText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  transparentText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizes.medium,
  },
});

export default Button;