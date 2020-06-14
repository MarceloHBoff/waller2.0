import React, { useRef, useEffect } from 'react';
import { Animated, ScrollView, Keyboard } from 'react-native';

import { FormHandles, Form } from '@unform/core';

import signInImage from '../../../assets/signInImage.png';
import Input from '../../../components/Input';

import {
  Container,
  Content,
  SignInImage,
  Title,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const opacity = new Animated.Value(0);

  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      scrollViewRef.current?.scrollToEnd({ animated: true }),
    );

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView ref={scrollViewRef}>
      <Container style={{ opacity }}>
        <Content>
          <SignInImage source={signInImage} />

          <Title>Welcome {'\n'}back</Title>

          <Form onSubmit={() => {}}>
            <Input
              name="email"
              placeholder="E-mail"
              icon="envelope"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Input
              name="password"
              secureTextEntry
              placeholder="Password"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>
        </Content>

        <SubmitButton>
          <SubmitButtonText>SignIn</SubmitButtonText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
