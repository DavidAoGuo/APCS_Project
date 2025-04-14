// File: src/screens/main/DashboardScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Loading, StatusBar } from '../../components/common';
import socketService from '../../services/socket/socketService';
import { fetchSensorData } from '../../store/actions/sensorActions';
import { theme } from '../../theme';
import { THRESHOLD_LEVELS } from '../../utils/constants';

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { foodLevel, waterLevel, temperature, humidity, lastUpdated, loading, error } = useSelector(state => state.sensors);
  
  useEffect(() => {
    loadSensorData();
  }, []);

  useEffect(() => {
  // Connect to socket and pass dispatch function
  socketService.connect(dispatch);
  
  // Disconnect when component unmounts
  return () => {
    socketService.disconnect();
  };
  }, [dispatch]);

  const loadSensorData = async () => {
    try {
      await dispatch(fetchSensorData());
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadSensorData();
    setRefreshing(false);
  };
  
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    
    const date = new Date(lastUpdated);
    return date.toLocaleTimeString();
  };
  
  const getTemperatureStatus = () => {
    if (temperature < THRESHOLD_LEVELS.TEMPERATURE.MIN) {
      return { status: 'Too Cold', color: theme.colors.error };
    } else if (temperature > THRESHOLD_LEVELS.TEMPERATURE.MAX) {
      return { status: 'Too Hot', color: theme.colors.error };
    } else {
      return { status: 'Normal', color: theme.colors.success };
    }
  };
  
  const getHumidityStatus = () => {
    if (humidity < THRESHOLD_LEVELS.HUMIDITY.MIN) {
      return { status: 'Too Dry', color: theme.colors.error };
    } else if (humidity > THRESHOLD_LEVELS.HUMIDITY.MAX) {
      return { status: 'Too Humid', color: theme.colors.error };
    } else {
      return { status: 'Normal', color: theme.colors.success };
    }
  };
  
  const tempStatus = getTemperatureStatus();
  const humidStatus = getHumidityStatus();
  
  if (loading && !refreshing) {
    return <Loading fullscreen message="Loading sensor data..." />;
  }
  
  return (
    <ScrollView 
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.cardAction}
                onPress={() => {
                  console.log('Navigate to control screen - Food');
                  navigation.navigate('Control', { initialTab: 'food' });
                }}
              >
                <Ionicons name="restaurant-outline" size={16} color={theme.colors.primary} />
                <Text style={styles.cardActionText}>Dispense Food</Text>
              </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Dashboard</Text>
          <View style={styles.lastUpdatedContainer}>
            <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.lastUpdatedText}>
              Last updated: {formatLastUpdated()}
            </Text>
          </View>
        </View>
        
        <Card title="System Status">
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
            <Text style={styles.statusText}>All systems operational</Text>
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>Supply Levels</Text>
        
        <Card 
          title="Food Level"
          footer={
            <TouchableOpacity 
              style={styles.cardAction}
              onPress={() => {
                console.log('Navigate to control screen - Food');
                navigation.navigate('Control', { initialTab: 'food' });
              }}
            >
              <Ionicons name="restaurant-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.cardActionText}>Dispense Food</Text>
            </TouchableOpacity>
          }
        >
          <StatusBar 
            value={foodLevel} 
            maxValue={100} 
            showPercentage={false}
          />
          <View style={styles.levelInfoContainer}>
            <Text style={styles.levelValue}>{foodLevel}%</Text>
            <Text 
              style={[
                styles.levelStatus, 
                { 
                  color: foodLevel <= THRESHOLD_LEVELS.FOOD.CRITICAL 
                    ? theme.colors.error 
                    : foodLevel <= THRESHOLD_LEVELS.FOOD.LOW 
                      ? theme.colors.warning 
                      : theme.colors.success 
                }
              ]}
            >
              {foodLevel <= THRESHOLD_LEVELS.FOOD.CRITICAL 
                ? 'Critical' 
                : foodLevel <= THRESHOLD_LEVELS.FOOD.LOW 
                  ? 'Low' 
                  : 'Good'}
            </Text>
          </View>
        </Card>
        
        <Card 
          title="Water Level"
          footer={
            <TouchableOpacity 
              style={styles.cardAction}
              onPress={() => {
                console.log('Navigate to control screen - Food');
                navigation.navigate('Control', { initialTab: 'food' });
              }}
            >
              <Ionicons name="restaurant-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.cardActionText}>Dispense Food</Text>
            </TouchableOpacity>
          }
        >
          <StatusBar 
            value={waterLevel} 
            maxValue={100} 
            type="water" 
            showPercentage={false}
          />
          <View style={styles.levelInfoContainer}>
            <Text style={styles.levelValue}>{waterLevel}%</Text>
            <Text 
              style={[
                styles.levelStatus, 
                { 
                  color: waterLevel <= THRESHOLD_LEVELS.WATER.CRITICAL 
                    ? theme.colors.error 
                    : waterLevel <= THRESHOLD_LEVELS.WATER.LOW 
                      ? theme.colors.warning 
                      : theme.colors.success 
                }
              ]}
            >
              {waterLevel <= THRESHOLD_LEVELS.WATER.CRITICAL 
                ? 'Critical' 
                : waterLevel <= THRESHOLD_LEVELS.WATER.LOW 
                  ? 'Low' 
                  : 'Good'}
            </Text>
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>Environmental Conditions</Text>
        
        <View style={styles.environmentRow}>
          <Card title="Temperature" style={styles.halfCard}>
            <View style={styles.environmentValue}>
              <Text style={styles.envValueText}>{temperature}°C</Text>
              <Text style={[styles.envStatus, { color: tempStatus.color }]}>
                {tempStatus.status}
              </Text>
            </View>
          </Card>
          
          <Card title="Humidity" style={styles.halfCard}>
            <View style={styles.environmentValue}>
              <Text style={styles.envValueText}>{humidity}%</Text>
              <Text style={[styles.envStatus, { color: humidStatus.color }]}>
                {humidStatus.status}
              </Text>
            </View>
          </Card>
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
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.small,
    marginBottom: theme.metrics.spacing.medium,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacing.medium,
  },
  headerText: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: theme.fonts.sizes.tiny,
    color: theme.colors.textSecondary,
    marginLeft: theme.metrics.spacing.tiny,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.metrics.spacing.small,
  },
  statusText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    marginTop: theme.metrics.spacing.large,
    marginBottom: theme.metrics.spacing.small,
    color: theme.colors.text,
  },
  levelInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.metrics.spacing.small,
  },
  levelValue: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  levelStatus: {
    fontSize: theme.fonts.sizes.medium,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    marginLeft: theme.metrics.spacing.tiny,
  },
  environmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
  },
  environmentValue: {
    alignItems: 'center',
  },
  envValueText: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.metrics.spacing.tiny,
  },
  envStatus: {
    fontSize: theme.fonts.sizes.medium,
  },
});

export default DashboardScreen;