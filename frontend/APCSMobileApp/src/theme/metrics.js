import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: 999  // For circular elements
  },
  icons: {
    tiny: 16,
    small: 20,
    medium: 24,
    large: 30,
    xlarge: 40
  }
};