// File: src/components/common/Badge.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

const Badge = ({ count, style }) => {
  if (!count || count <= 0) return null;
  
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  text: {
    color: theme.colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Badge;