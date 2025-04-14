// File: src/screens/main/SettingsScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from '../../components/common';
import { logout } from '../../store/actions/authActions';
import { theme } from '../../theme';
import platformAlert from '../../utils/platformAlert';

const SettingsScreen = ({ navigation }) => {  // Added navigation prop here
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [lowLevelAlerts, setLowLevelAlerts] = useState(true);
  const [temperatureAlerts, setTemperatureAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoDispenseEnabled, setAutoDispenseEnabled] = useState(true);
  
  const handleLogout = async () => {
    console.log('Logout button clicked');
    
    try {
      console.log('Attempting to dispatch logout action');
      await dispatch(logout());
      console.log('Logout action completed successfully');
      
      // Force a window reload on web platforms
      if (Platform.OS === 'web') {
        console.log('Web platform detected, reloading page');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
      platformAlert('Logout Failed', 'An error occurred during logout. Please try again.');
    }
  };
  
  const confirmLogout = () => {
    if (Platform.OS === 'web') {
      // For web, directly call handleLogout
      console.log('Web platform detected, skipping confirmation dialog');
      handleLogout();
    } else {
      platformAlert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: handleLogout, style: 'destructive' },
        ]
      );
    }
  };
  
  const handleResetApp = () => {
    platformAlert(
      'Reset App',
      'This will reset all settings to default. Your account data will remain intact. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset settings to default
            setNotificationsEnabled(true);
            setLowLevelAlerts(true);
            setTemperatureAlerts(true);
            setSoundEnabled(true);
            setDarkModeEnabled(false);
            setAutoDispenseEnabled(true);
            
            platformAlert('Success', 'App settings have been reset to default.');
          } 
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Card title="Account">
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={80} color={theme.colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.settingText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={styles.settingText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Card>
        
        <Card title="Notifications">
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, !notificationsEnabled && styles.disabledSetting]}>
            <Text style={[styles.settingText, !notificationsEnabled && styles.disabledText]}>Low Level Alerts</Text>
            <Switch
              value={lowLevelAlerts}
              onValueChange={setLowLevelAlerts}
              disabled={!notificationsEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={lowLevelAlerts ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, !notificationsEnabled && styles.disabledSetting]}>
            <Text style={[styles.settingText, !notificationsEnabled && styles.disabledText]}>Temperature Alerts</Text>
            <Switch
              value={temperatureAlerts}
              onValueChange={setTemperatureAlerts}
              disabled={!notificationsEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={temperatureAlerts ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, !notificationsEnabled && styles.disabledSetting]}>
            <Text style={[styles.settingText, !notificationsEnabled && styles.disabledText]}>Sound</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              disabled={!notificationsEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </Card>
        
        <Card title="Appearance">
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={darkModeEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </Card>
        
        <Card title="System Settings">
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Auto-Dispense when Low</Text>
            <Switch
              value={autoDispenseEnabled}
              onValueChange={setAutoDispenseEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={autoDispenseEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => platformAlert('Coming Soon', 'This feature will be available in a future update.')}
          >
            <Text style={styles.settingText}>Device Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => platformAlert('Coming Soon', 'This feature will be available in a future update.')}
          >
            <Text style={styles.settingText}>Network Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Card>
        
        <Card title="Support">
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => platformAlert('Coming Soon', 'This feature will be available in a future update.')}
          >
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingRow} 
            onPress={() => platformAlert('About', 'APCS Mobile App\nVersion 1.0.0\n\nDeveloped by APCS Team')}
          >
            <Text style={styles.settingText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Reset App Settings"
            type="outline"
            onPress={handleResetApp}
            style={styles.resetButton}
          />
          
          <Button
            title="Logout"
            type="primary"
            onPress={confirmLogout}
            style={styles.logoutButton}
          />
        </View>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.medium,
  },
  avatarContainer: {
    marginRight: theme.metrics.spacing.medium,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.tiny,
  },
  profileEmail: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.metrics.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  disabledSetting: {
    opacity: 0.5,
  },
  settingText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    marginTop: theme.metrics.spacing.large,
    marginBottom: theme.metrics.spacing.xlarge,
  },
  resetButton: {
    marginBottom: theme.metrics.spacing.medium,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
  },
});

export default SettingsScreen;