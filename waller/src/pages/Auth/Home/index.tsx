import React, { useEffect, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';

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

const { width } = Dimensions.get('window');

const Home: React.FC = () => {
  const offsetLeft = new Animated.ValueXY({ x: -800, y: 0 });
  const offsetRight = new Animated.ValueXY({ x: 800, y: 0 });
  const opacity = new Animated.Value(0);

  const { navigate, addListener } = useNavigation();

  const handleEnterPage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: 0,
        speed: 0.1,
        bounciness: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
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
  }, [opacity, offsetLeft, offsetRight]);

  const handleLeavePage = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: width * -1,
        speed: 0.1,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
        toValue: width,
        speed: 0.1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offsetLeft, offsetRight]);

  const handleNavigateSignIn = useCallback(() => {
    handleLeavePage();

    navigate('SignIn');
  }, [handleLeavePage, navigate]);

  const handleNavigateSignUp = useCallback(() => {
    handleLeavePage();

    navigate('SignUp');
  }, [handleLeavePage, navigate]);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      handleEnterPage();
    });

    return unsubscribe;
  }, [addListener, handleEnterPage]);

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
          <SignInButton onPress={handleNavigateSignIn}>
            <SignInButtonText>SignIn</SignInButtonText>
          </SignInButton>
        </SignInButtonContainer>

        <SignUpButtonContainer
          style={{
            opacity,
            transform: [{ translateX: offsetLeft.x }],
          }}
        >
          <SignUpButton onPress={handleNavigateSignUp}>
            <SignUpButtonText>SignUp</SignUpButtonText>
          </SignUpButton>
        </SignUpButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
