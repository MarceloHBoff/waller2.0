import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  base: 16,
  big: 32,
  large: 44,
  radius: 8,
  width,
  height,
};
