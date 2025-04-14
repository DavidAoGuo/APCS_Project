// File: src/screens/main/NotificationsScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, NotificationItem } from '../../components/common';
import { clearNotifications, fetchNotifications, markNotificationRead } from '../../store/actions/notificationActions';
import { theme } from '../../theme';

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadNotifications();
  }, []);
  
  const loadNotifications = async () => {
    try {
      await dispatch(fetchNotifications());
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };
  
  const handleNotificationPress = (notification) => {
    if (!notification.read) {
      dispatch(markNotificationRead(notification.id));
    }
    
    // Show notification details
    Alert.alert(
      notification.title,
      notification.message,
      [{ text: 'OK' }]
    );
  };
  
  const handleMarkAsRead = (id) => {
    dispatch(markNotificationRead(id));
  };
  
  const handleClearAll = () => {
    Alert.alert(
      'Clear Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => dispatch(clearNotifications()),
        },
      ]
    );
  };
  
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={60} color={theme.colors.textSecondary} />
      <Text style={styles.emptyText}>No notifications</Text>
      <Text style={styles.emptySubtext}>You're all caught up!</Text>
    </View>
  );
  
  if (loading && !refreshing) {
    return <Loading fullscreen message="Loading notifications..." />;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadNotifications}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={handleNotificationPress}
            onMarkAsRead={handleMarkAsRead}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          notifications.length === 0 && styles.emptyListContainer
        ]}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.metrics.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  clearText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.primary,
  },
  listContainer: {
    padding: theme.metrics.spacing.medium,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.metrics.spacing.large,
  },
  emptyText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.metrics.spacing.medium,
    marginBottom: theme.metrics.spacing.small,
  },
  emptySubtext: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: theme.metrics.spacing.medium,
    margin: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.fonts.sizes.small,
        flex: 1,
    },
    retryButton: {
        backgroundColor: theme.colors.error,
        paddingVertical: theme.metrics.spacing.tiny,
        paddingHorizontal: theme.metrics.spacing.small,
        borderRadius: theme.metrics.borderRadius.small,
    },
    retryText: {
        color: theme.colors.background,
        fontSize: theme.fonts.sizes.small,
        fontWeight: 'bold',
    },
    });

export default NotificationsScreen;