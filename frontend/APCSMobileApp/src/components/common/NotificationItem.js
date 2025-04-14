// File: src/components/common/NotificationItem.js
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';

const NotificationItem = ({ notification, onPress, onMarkAsRead }) => {
  const { id, title, message, type, read, timestamp } = notification;
  
  const getIconName = () => {
    switch (type) {
      case 'danger':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'success':
        return 'checkmark-circle';
      case 'info':
      default:
        return 'information-circle';
    }
  };
  
  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      case 'info':
      default:
        return theme.colors.primary;
    }
  };
  
  const formatTimestamp = () => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'unknown time';
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        read ? styles.readContainer : styles.unreadContainer
      ]}
      onPress={() => onPress(notification)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColor() }]}>
        <Ionicons name={getIconName()} size={20} color="white" />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.timestamp}>{formatTimestamp()}</Text>
        </View>
        
        <Text style={styles.message} numberOfLines={2}>{message}</Text>
        
        {!read && (
          <TouchableOpacity 
            style={styles.readButton}
            onPress={() => onMarkAsRead(id)}
          >
            <Text style={styles.readButtonText}>Mark as read</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.medium,
    marginBottom: theme.metrics.spacing.medium,
  },
  unreadContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  readContainer: {
    backgroundColor: theme.colors.card,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.metrics.spacing.medium,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.tiny,
  },
  title: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.metrics.spacing.small,
  },
  timestamp: {
    fontSize: theme.fonts.sizes.tiny,
    color: theme.colors.textSecondary,
  },
  message: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.small,
  },
  readButton: {
    alignSelf: 'flex-start',
  },
  readButtonText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default NotificationItem;