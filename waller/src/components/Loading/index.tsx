import React, { useEffect } from 'react';
import { Animated, ViewProps } from 'react-native';

import logo from '#assets/logo.png';
import logoDark from '#assets/logoDark.png';

import { Container, Image } from './styles';

interface LoadingProps extends ViewProps {
  mode?: 'light' | 'dark';
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ mode = 'light', size, ...rest }) => {
  const opacity = new Animated.Value(0);
  const rotate = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
    ).start();
  }, [opacity, rotate]);

  return (
    <Container testID="loading" {...rest}>
      <Image
        source={mode === 'light' ? logo : logoDark}
        style={{
          opacity,
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: [`${0}deg`, `${360}deg`],
              }),
            },
          ],
          width: size,
          height: size,
        }}
      />
    </Container>
  );
};

export default Loading;
