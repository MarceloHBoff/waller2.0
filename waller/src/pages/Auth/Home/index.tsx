import React, { useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import homeImage from '../../../assets/homeImage.png';

import {
  Container,
  HomeImage,
  ButtonsContainer,
  SignInButtonContainer,
  SignInButton,
  SignInButtonText,
  SignUpButtonContainer,
  SignUpButton,
  SignUpButtonText,
} from './styles';

const Home: React.FC = () => {
  const offsetLeft = new Animated.ValueXY({ x: -800, y: 0 });
  const offsetRight = new Animated.ValueXY({ x: 800, y: 0 });
  const opacity = new Animated.Value(0);

  const { navigate } = useNavigation();

  const handleEnterPage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: 0,
        speed: 0.003,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
        toValue: 0,
        speed: 0.003,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offsetLeft, offsetRight]);

  const handleLeavePage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: -800,
        speed: 0.003,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
        toValue: 800,
        speed: 0.003,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    navigate('SignIn');

    handleEnterPage();
  }, [opacity, offsetLeft, offsetRight, navigate, handleEnterPage]);

  useEffect(() => {
    handleEnterPage();
  }, []);

  return (
    <Container>
      <HomeImage
        source={homeImage}
        style={{
          opacity,
          transform: [{ translateX: offsetLeft.x }],
        }}
      />

      <ButtonsContainer>
        <SignInButtonContainer
          style={{
            opacity,
            transform: [{ translateX: offsetRight.x }],
          }}
        >
          <SignInButton onPress={handleLeavePage}>
            <SignInButtonText>SignIn</SignInButtonText>
          </SignInButton>
        </SignInButtonContainer>

        <SignUpButtonContainer
          style={{
            opacity,
            transform: [{ translateX: offsetLeft.x }],
          }}
        >
          <SignUpButton>
            <SignUpButtonText>SignUp</SignUpButtonText>
          </SignUpButton>
        </SignUpButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
