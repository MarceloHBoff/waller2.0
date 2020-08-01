import { Animated } from 'react-native';

import { Metrics } from '#styles';

const left = new Animated.ValueXY({ x: Metrics.width * -1, y: 0 });
const right = new Animated.ValueXY({ x: Metrics.width, y: 0 });
const opacity = new Animated.Value(0);

export function handleEnterPage(): void {
  Animated.parallel([
    Animated.spring(left.x, {
      toValue: 0,
      speed: 0.1,
      bounciness: 1000,
      useNativeDriver: true,
    }),
    Animated.spring(right.x, {
      toValue: 0,
      speed: 0.1,
      bounciness: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
  ]).start();
}

export function handleLeavePage(): void {
  Animated.parallel([
    Animated.spring(left.x, {
      toValue: Metrics.width * -1,
      speed: 0.1,
      useNativeDriver: true,
    }),
    Animated.spring(right.x, {
      toValue: Metrics.width,
      speed: 0.1,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start();
}

export { opacity, left, right };
