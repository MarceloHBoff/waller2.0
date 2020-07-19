import React, { useCallback, useEffect } from 'react';
import { Animated, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '#styles';

import { Container, HeaderText } from './styles';

export { HeaderText };

const Header: React.FC = ({ children }) => {
  const opacity = new Animated.Value(50);
  const offsetTop = new Animated.ValueXY({ x: 0, y: -80 });

  const { addListener, removeListener } = useNavigation();

  const handleEnterPage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetTop.y, {
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
  }, [opacity, offsetTop]);

  const handleLeavePage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetTop.y, {
        toValue: -80,
        speed: 0.1,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offsetTop]);

  useEffect(() => {
    addListener('focus', () => {
      handleEnterPage();
    });

    addListener('blur', () => {
      handleLeavePage();
    });

    return () => {
      removeListener('focus', () => {});
      removeListener('blur', () => {});
    };
  }, [addListener, removeListener, handleEnterPage, handleLeavePage]);

  return (
    <>
      <StatusBar backgroundColor={Colors.primaryDark} />

      <Container
        style={{
          elevation: 1,
          opacity,
          transform: [{ translateY: offsetTop.y }],
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Header;
