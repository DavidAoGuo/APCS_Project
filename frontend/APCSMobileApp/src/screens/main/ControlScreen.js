import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Loading } from '../../components/common';
import { dispenseFood, dispenseWater, setTemperature as setTempAction } from '../../store/actions/controlActions';
import { theme } from '../../theme';

const ControlScreen = () => {
  const [foodAmount, setFoodAmount] = useState(50);
  const [waterAmount, setWaterAmount] = useState(50);
  const [temperatureSetpoint, setTemperatureSetpoint] = useState(22);
  
  const dispatch = useDispatch();
  const { loading: controlLoading } = useSelector(state => state.control || { loading: false });
  
  const dispenseFoodNow = async () => {
    console.log(`dispenseFoodNow called with amount: ${foodAmount}`);
    try {
      console.log('Dispatching dispenseFood action...');
      await dispatch(dispenseFood(foodAmount));
      console.log('dispenseFood action completed successfully');
      
      if (Platform.OS === 'web') {
        window.alert(`Command Sent\n\nCommand to dispense ${foodAmount}% of food has been sent to the device.`);
      } else {
        Alert.alert(
          'Command Sent',
          `Command to dispense ${foodAmount}% of food has been sent to the device.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error in dispenseFoodNow:', error);
      if (Platform.OS === 'web') {
        window.alert('Error\n\nFailed to send dispense command. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to send dispense command. Please try again.');
      }
    }
  };
  
  const dispenseWaterNow = async () => {
    console.log(`dispenseWaterNow called with amount: ${waterAmount}`);
    try {
      console.log('Dispatching dispenseWater action...');
      await dispatch(dispenseWater(waterAmount));
      console.log('dispenseWater action completed successfully');
      
      if (Platform.OS === 'web') {
        window.alert(`Command Sent\n\nCommand to dispense ${waterAmount}% of water has been sent to the device.`);
      } else {
        Alert.alert(
          'Command Sent',
          `Command to dispense ${waterAmount}% of water has been sent to the device.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error in dispenseWaterNow:', error);
      if (Platform.OS === 'web') {
        window.alert('Error\n\nFailed to send dispense command. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to send dispense command. Please try again.');
      }
    }
  };
  
  const setTemperature = async () => {
    console.log(`setTemperature called with value: ${temperatureSetpoint}`);
    try {
      console.log('Dispatching setTemperature action...');
      await dispatch(setTempAction(temperatureSetpoint));
      console.log('setTemperature action completed successfully');
      
      if (Platform.OS === 'web') {
        window.alert(`Command Sent\n\nCommand to set temperature to ${temperatureSetpoint}°C has been sent to the device.`);
      } else {
        Alert.alert(
          'Command Sent',
          `Command to set temperature to ${temperatureSetpoint}°C has been sent to the device.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error in setTemperature:', error);
      if (Platform.OS === 'web') {
        window.alert('Error\n\nFailed to send temperature command. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to send temperature command. Please try again.');
      }
    }
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      {controlLoading && <Loading fullscreen />}
      
      <View style={styles.container}>
        <Text style={styles.title}>Manual Controls</Text>
        <Text style={styles.subtitle}>Adjust dispensing amounts and environmental settings</Text>
        
        <Card title="Food Dispenser">
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Amount:</Text>
            <Text style={styles.controlValue}>{foodAmount}%</Text>
          </View>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={foodAmount}
            onValueChange={setFoodAmount}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={theme.colors.primary}
          />
          
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelMin}>Min</Text>
            <Text style={styles.sliderLabelMax}>Max</Text>
          </View>
          
          <Button
            title="Dispense Food Now"
            onPress={dispenseFoodNow}
            style={styles.actionButton}
            disabled={controlLoading}
          />
        </Card>
        
        <Card title="Water Dispenser">
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Amount:</Text>
            <Text style={styles.controlValue}>{waterAmount}%</Text>
          </View>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={waterAmount}
            onValueChange={setWaterAmount}
            minimumTrackTintColor={theme.colors.secondary}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={theme.colors.secondary}
          />
          
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelMin}>Min</Text>
            <Text style={styles.sliderLabelMax}>Max</Text>
          </View>
          
          <Button
            title="Dispense Water Now"
            onPress={dispenseWaterNow}
            style={styles.actionButton}
            type="secondary"
            disabled={controlLoading}
          />
        </Card>
        
        <Card title="Temperature Control">
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Set temperature:</Text>
            <Text style={styles.controlValue}>{temperatureSetpoint}°C</Text>
          </View>
          
          <Slider
            style={styles.slider}
            minimumValue={15}
            maximumValue={30}
            step={0.5}
            value={temperatureSetpoint}
            onValueChange={setTemperatureSetpoint}
            minimumTrackTintColor="#FF9800"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#FF9800"
          />
          
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelMin}>15°C</Text>
            <Text style={styles.sliderLabelMax}>30°C</Text>
          </View>
          
          <Button
            title="Set Temperature"
            onPress={setTemperature}
            style={styles.actionButton}
            type="outline"
            disabled={controlLoading}
          />
        </Card>
        
        <Card title="Quick Actions">
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickAction} 
              onPress={() => {
                console.log('Check Camera button pressed');
                if (Platform.OS === 'web') {
                  window.alert('Coming Soon\n\nThis feature will be available in a future update.');
                } else {
                  Alert.alert('Coming Soon', 'This feature will be available in a future update.');
                }
              }}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="camera-outline" size={24} color={theme.colors.background} />
              </View>
              <Text style={styles.quickActionText}>Check Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction} 
              onPress={() => {
                console.log('Refresh System button pressed');
                if (Platform.OS === 'web') {
                  window.alert('Coming Soon\n\nThis feature will be available in a future update.');
                } else {
                  Alert.alert('Coming Soon', 'This feature will be available in a future update.');
                }
              }}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.secondary }]}>
                <Ionicons name="refresh-outline" size={24} color={theme.colors.background} />
              </View>
              <Text style={styles.quickActionText}>Refresh System</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction} 
              onPress={() => {
                console.log('Emergency Stop button pressed');
                if (Platform.OS === 'web') {
                  window.alert('Coming Soon\n\nThis feature will be available in a future update.');
                } else {
                  Alert.alert('Coming Soon', 'This feature will be available in a future update.');
                }
              }}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.error }]}>
                <Ionicons name="alert-circle-outline" size={24} color={theme.colors.background} />
              </View>
              <Text style={styles.quickActionText}>Emergency Stop</Text>
            </TouchableOpacity>
          </View>
        </Card>
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
  title: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.small,
  },
  subtitle: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.metrics.spacing.large,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.small,
  },
  controlLabel: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
  },
  controlValue: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.metrics.spacing.medium,
  },
  sliderLabelMin: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  sliderLabelMax: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  actionButton: {
    marginTop: theme.metrics.spacing.small,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.small,
  },
  quickActionText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
    textAlign: 'center',
  },
});

export default ControlScreen;