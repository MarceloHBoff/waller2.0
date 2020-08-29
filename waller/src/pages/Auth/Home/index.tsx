import React, { useCallback } from 'react';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { opacity, left, right, onScreenFocus } from '#animations';
import homeImage from '#assets/homeImage.png';

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
  const { navigate } = useNavigation();

  useFocusEffect(onScreenFocus);

  const handleNavigateSignIn = useCallback(() => navigate('SignIn'), [
    navigate,
  ]);

  const handleNavigateSignUp = useCallback(() => navigate('SignUp'), [
    navigate,
  ]);

  return (
    <Container>
      <HomeImage
        source={homeImage}
        style={{
          opacity,
          transform: [{ translateX: left.x }],
        }}
      />

      <ButtonsContainer>
        <SignInButtonContainer
          style={{
            opacity,
            transform: [{ translateX: right.x }],
          }}
        >
          <SignInButton testID="signin-button" onPress={handleNavigateSignIn}>
            <SignInButtonText>SignIn</SignInButtonText>
          </SignInButton>
        </SignInButtonContainer>

        <SignUpButtonContainer
          style={{
            opacity,
            transform: [{ translateX: left.x }],
          }}
        >
          <SignUpButton testID="signup-button" onPress={handleNavigateSignUp}>
            <SignUpButtonText>SignUp</SignUpButtonText>
          </SignUpButton>
        </SignUpButtonContainer>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
