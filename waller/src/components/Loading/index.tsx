import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import logo from '#assets/logo.png';

import { Container, Image } from './styles';

const Loading: React.FC = () => {
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
    <Container testID="loading">
      <Image
        source={logo}
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
        }}
      />
    </Container>
  );
};

export default Loading;
