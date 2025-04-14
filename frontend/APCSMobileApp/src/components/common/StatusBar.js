// File: src/components/common/StatusBar.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

const StatusBar = ({ 
  label,
  value,
  maxValue = 100,
  type = 'primary',
  showPercentage = true,
  style,
}) => {
  const percentage = (value / maxValue) * 100;
  
  const getBarColor = () => {
    if (percentage <= 20) {
      return theme.colors.error;
    } else if (percentage <= 40) {
      return theme.colors.warning;
    } else {
      switch (type) {
        case 'water':
          return theme.colors.secondary;
        case 'temperature':
          return '#FF5722'; // Orange
        case 'humidity':
          return '#8BC34A'; // Light Green
        default:
          return theme.colors.primary;
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
          )}
        </View>
      )}
      
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.bar, 
            { width: `${percentage}%`, backgroundColor: getBarColor() }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.metrics.spacing.medium,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.metrics.spacing.tiny,
  },
  label: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
  },
  percentage: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default StatusBar;