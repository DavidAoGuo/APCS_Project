// File: src/screens/main/HistoryScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Loading } from '../../components/common';
import { theme } from '../../theme';

const HistoryScreen = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month'
  const [selectedMetric, setSelectedMetric] = useState('food'); // 'food', 'water', 'temperature', 'humidity'
  const [historyData, setHistoryData] = useState({
    food: [],
    water: [],
    temperature: [],
    humidity: []
  });
  
  useEffect(() => {
    loadHistoryData();
  }, [timeRange, selectedMetric]);
  
  const loadHistoryData = async () => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate some mock data
      const mockData = generateMockData();
      setHistoryData(mockData);
    } catch (error) {
      console.error('Error loading history data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateMockData = () => {
    // Mock data for different time periods
    const result = {
      food: [
        { date: '2025-04-01', value: 95 },
        { date: '2025-04-02', value: 80 },
        { date: '2025-04-03', value: 65 },
        { date: '2025-04-04', value: 50 },
        { date: '2025-04-05', value: 35 },
        { date: '2025-04-06', value: 85 },
        { date: '2025-04-07', value: 75 },
      ],
      water: [
        { date: '2025-04-01', value: 90 },
        { date: '2025-04-02', value: 75 },
        { date: '2025-04-03', value: 60 },
        { date: '2025-04-04', value: 45 },
        { date: '2025-04-05', value: 30 },
        { date: '2025-04-06', value: 75 },
        { date: '2025-04-07', value: 65 },
      ],
      temperature: [
        { date: '2025-04-01', value: 22 },
        { date: '2025-04-02', value: 23 },
        { date: '2025-04-03', value: 25 },
        { date: '2025-04-04', value: 24 },
        { date: '2025-04-05', value: 21 },
        { date: '2025-04-06', value: 22 },
        { date: '2025-04-07', value: 23 },
      ],
      humidity: [
        { date: '2025-04-01', value: 45 },
        { date: '2025-04-02', value: 50 },
        { date: '2025-04-03', value: 55 },
        { date: '2025-04-04', value: 52 },
        { date: '2025-04-05', value: 48 },
        { date: '2025-04-06', value: 47 },
        { date: '2025-04-07', value: 51 },
      ],
    };
    
    return result;
  };
  
  const getChartColor = () => {
    switch (selectedMetric) {
      case 'food':
        return theme.colors.primary;
      case 'water':
        return theme.colors.secondary;
      case 'temperature':
        return '#FF9800'; // Orange
      case 'humidity':
        return '#8BC34A'; // Light green
      default:
        return theme.colors.primary;
    }
  };
  
  const getCurrentData = () => {
    return historyData[selectedMetric] || [];
  };
  
  const calculateAverage = () => {
    const data = getCurrentData();
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return Math.round(sum / data.length);
  };
  
  const getMin = () => {
    const data = getCurrentData();
    if (data.length === 0) return 0;
    return Math.min(...data.map(item => item.value));
  };
  
  const getMax = () => {
    const data = getCurrentData();
    if (data.length === 0) return 0;
    return Math.max(...data.map(item => item.value));
  };
  
  const getUnitLabel = () => {
    return selectedMetric === 'temperature' ? '°C' : '%';
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>View historical data for your pet care system</Text>
        
        <Card title="Metrics">
          <View style={styles.metricsContainer}>
            <TouchableOpacity 
              style={[
                styles.metricButton, 
                selectedMetric === 'food' && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => setSelectedMetric('food')}
            >
              <Ionicons 
                name="restaurant-outline" 
                size={20} 
                color={selectedMetric === 'food' ? theme.colors.background : theme.colors.primary} 
              />
              <Text style={[
                styles.metricButtonText,
                selectedMetric === 'food' && { color: theme.colors.background }
              ]}>Food</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.metricButton, 
                selectedMetric === 'water' && { backgroundColor: theme.colors.secondary }
              ]}
              onPress={() => setSelectedMetric('water')}
            >
              <Ionicons 
                name="water-outline" 
                size={20} 
                color={selectedMetric === 'water' ? theme.colors.background : theme.colors.secondary} 
              />
              <Text style={[
                styles.metricButtonText,
                selectedMetric === 'water' && { color: theme.colors.background }
              ]}>Water</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.metricButton, 
                selectedMetric === 'temperature' && { backgroundColor: '#FF9800' }
              ]}
              onPress={() => setSelectedMetric('temperature')}
            >
              <Ionicons 
                name="thermometer-outline" 
                size={20} 
                color={selectedMetric === 'temperature' ? theme.colors.background : '#FF9800'} 
              />
              <Text style={[
                styles.metricButtonText,
                selectedMetric === 'temperature' && { color: theme.colors.background }
              ]}>Temp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.metricButton, 
                selectedMetric === 'humidity' && { backgroundColor: '#8BC34A' }
              ]}
              onPress={() => setSelectedMetric('humidity')}
            >
              <Ionicons 
                name="water" 
                size={20} 
                color={selectedMetric === 'humidity' ? theme.colors.background : '#8BC34A'} 
              />
              <Text style={[
                styles.metricButtonText,
                selectedMetric === 'humidity' && { color: theme.colors.background }
              ]}>Humidity</Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card title="Time Range">
          <View style={styles.timeRangeContainer}>
            <TouchableOpacity 
              style={[
                styles.timeButton, 
                timeRange === 'day' && styles.selectedTimeButton
              ]}
              onPress={() => setTimeRange('day')}
            >
              <Text style={[
                styles.timeButtonText, 
                timeRange === 'day' && styles.selectedTimeButtonText
              ]}>Day</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.timeButton, 
                timeRange === 'week' && styles.selectedTimeButton
              ]}
              onPress={() => setTimeRange('week')}
            >
              <Text style={[
                styles.timeButtonText, 
                timeRange === 'week' && styles.selectedTimeButtonText
              ]}>Week</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.timeButton, 
                timeRange === 'month' && styles.selectedTimeButton
              ]}
              onPress={() => setTimeRange('month')}
            >
              <Text style={[
                styles.timeButtonText, 
                timeRange === 'month' && styles.selectedTimeButtonText
              ]}>Month</Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card 
          title={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} History`}
          style={styles.chartCard}
        >
          {loading ? (
            <Loading />
          ) : (
            <View style={styles.chartContainer}>
              <Text style={styles.chartPlaceholder}>
                Chart visualization will be available in the next update.
              </Text>
              
              <View style={styles.dataPointsContainer}>
                {getCurrentData().map((item, index) => (
                  <View key={index} style={styles.dataPoint}>
                    <Text style={styles.dataDate}>{item.date}</Text>
                    <Text style={[styles.dataValue, { color: getChartColor() }]}>
                      {item.value}{getUnitLabel()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>
        
        <Card title="Stats" style={styles.statsCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Average</Text>
              <Text style={[styles.statValue, { color: getChartColor() }]}>
                {loading ? '-' : `${calculateAverage()}${getUnitLabel()}`}
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Min</Text>
              <Text style={[styles.statValue, { color: getChartColor() }]}>
                {loading ? '-' : `${getMin()}${getUnitLabel()}`}
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Max</Text>
              <Text style={[styles.statValue, { color: getChartColor() }]}>
                {loading ? '-' : `${getMax()}${getUnitLabel()}`}
              </Text>
            </View>
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.metrics.spacing.small,
    paddingHorizontal: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    minWidth: '22%',
  },
  metricButtonText: {
    fontSize: theme.fonts.sizes.small,
    marginLeft: theme.metrics.spacing.tiny,
    color: theme.colors.text,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    flex: 1,
    paddingVertical: theme.metrics.spacing.small,
    paddingHorizontal: theme.metrics.spacing.medium,
    borderRadius: theme.metrics.borderRadius.medium,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.metrics.spacing.tiny,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedTimeButton: {
    backgroundColor: theme.colors.primary,
  },
  timeButtonText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
  },
  selectedTimeButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  chartCard: {
    marginVertical: theme.metrics.spacing.medium,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: theme.metrics.spacing.medium,
  },
  chartPlaceholder: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.metrics.spacing.large,
    textAlign: 'center',
  },
  dataPointsContainer: {
    width: '100%',
  },
  dataPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.metrics.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dataDate: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
  },
  dataValue: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  statsCard: {
    marginBottom: theme.metrics.spacing.large,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.metrics.spacing.tiny,
  },
  statValue: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
  },
});

export default HistoryScreen;