// File: src/components/common/Card.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const Card = ({ 
  title,
  children,
  style,
  titleStyle,
  onPress,
  footer,
  footerStyle
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={styles.content}>
        {children}
      </View>
      {footer && (
        <View style={[styles.footer, footerStyle]}>
          {footer}
        </View>
      )}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.metrics.borderRadius.medium,
    padding: theme.metrics.spacing.medium,
    marginBottom: theme.metrics.spacing.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    marginBottom: theme.metrics.spacing.small,
    color: theme.colors.text,
  },
  content: {
    marginBottom: theme.metrics.spacing.small,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.metrics.spacing.small,
    marginTop: theme.metrics.spacing.small,
  },
});

export default Card;