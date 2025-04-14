// File: src/screens/main/ScheduleScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Loading } from '../../components/common';
import { theme } from '../../theme';
import platformAlert from '../../utils/platformAlert';


// We'll need to install this package
// npm install @react-native-community/datetimepicker

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, type: 'food', time: '08:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], amount: 50, enabled: true },
    { id: 2, type: 'water', time: '08:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], amount: 50, enabled: true },
    { id: 3, type: 'food', time: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], amount: 50, enabled: true },
    { id: 4, type: 'water', time: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], amount: 50, enabled: true },
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const toggleSchedule = (id) => {
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.id === id) {
        return { ...schedule, enabled: !schedule.enabled };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
  };
  
  const deleteSchedule = (id) => {
    platformAlert(
      'Delete Schedule',
      'Are you sure you want to delete this schedule?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
            setSchedules(updatedSchedules);
          } 
        },
      ]
    );
  };
  
  const renderDays = (days) => {
    return days.join(', ');
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      {loading && <Loading fullscreen />}
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Feeding Schedule</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => platformAlert('Coming Soon', 'Adding new schedules will be available in a future update.')}
          >
            <Ionicons name="add-circle" size={30} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subtitle}>Automate your pet feeding and watering times</Text>
        
        {schedules.length === 0 ? (
          <Card>
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={50} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>No schedules yet</Text>
              <Text style={styles.emptySubtext}>Tap the + button to add a new schedule</Text>
            </View>
          </Card>
        ) : (
          schedules.map(schedule => (
            <Card key={schedule.id} style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <View style={styles.scheduleTypeContainer}>
                  <Ionicons 
                    name={schedule.type === 'food' ? 'restaurant-outline' : 'water-outline'} 
                    size={20} 
                    color={schedule.type === 'food' ? theme.colors.primary : theme.colors.secondary} 
                  />
                  <Text style={[
                    styles.scheduleType,
                    { color: schedule.type === 'food' ? theme.colors.primary : theme.colors.secondary }
                  ]}>
                    {schedule.type === 'food' ? 'Food' : 'Water'}
                  </Text>
                </View>
                
                <View style={styles.scheduleControls}>
                  <TouchableOpacity 
                    style={styles.scheduleControl}
                    onPress={() => toggleSchedule(schedule.id)}
                  >
                    <Ionicons 
                      name={schedule.enabled ? 'checkmark-circle' : 'checkmark-circle-outline'} 
                      size={24} 
                      color={schedule.enabled ? theme.colors.success : theme.colors.textSecondary} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.scheduleControl}
                    onPress={() => deleteSchedule(schedule.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.scheduleDetails}>
                <View style={styles.scheduleTime}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.scheduleTimeText}>{schedule.time}</Text>
                </View>
                
                <View style={styles.scheduleDays}>
                  <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.scheduleDaysText}>{renderDays(schedule.days)}</Text>
                </View>
                
                <View style={styles.scheduleAmount}>
                  <Ionicons name="stats-chart-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.scheduleAmountText}>Amount: {schedule.amount}%</Text>
                </View>
              </View>
              
              <View style={styles.scheduleStatus}>
                <Text style={[
                  styles.scheduleStatusText,
                  { color: schedule.enabled ? theme.colors.success : theme.colors.textSecondary }
                ]}>
                  {schedule.enabled ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.metrics.spacing.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.small,
  },
  title: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  addButton: {
    padding: theme.metrics.spacing.tiny,
  },
  subtitle: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.metrics.spacing.large,
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
  scheduleCard: {
    marginBottom: theme.metrics.spacing.medium,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.medium,
  },
  scheduleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleType: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    marginLeft: theme.metrics.spacing.tiny,
  },
  scheduleControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleControl: {
    marginLeft: theme.metrics.spacing.medium,
  },
  scheduleDetails: {
    marginBottom: theme.metrics.spacing.medium,
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.small,
  },
  scheduleTimeText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    marginLeft: theme.metrics.spacing.small,
  },
  scheduleDays: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.small,
  },
  scheduleDaysText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    marginLeft: theme.metrics.spacing.small,
  },
  scheduleAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleAmountText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    marginLeft: theme.metrics.spacing.small,
  },
  scheduleStatus: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.metrics.spacing.small,
  },
  scheduleStatusText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;