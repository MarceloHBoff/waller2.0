import React, { useRef, useEffect, useCallback } from 'react';
import { ScrollView, Keyboard, Alert, TextInput } from 'react-native';
import TouchID from 'react-native-touch-id';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FormHandles, Form } from '@unform/core';

import * as Yup from 'yup';

import { opacity, left, right, onScreenFocus } from '#animations';
import signInImage from '#assets/signInImage.png';
import Input from '#components/Input';
import { useAuth } from '#hooks/auth';
import { useConfig } from '#hooks/config';
import getValidationErrors from '#utils/getValidationErrors';

import {
  Container,
  Content,
  BackButton,
  TitleImage,
  Title,
  SubmitButtonContainer,
  SubmitButton,
  SubmitButtonText,
} from '../AuthStyles';

interface SignInFormData {
  email: string;
  password: string;
}

let timeout: NodeJS.Timeout;

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { goBack, addListener, removeListener } = useNavigation();
  const { signIn, signInByTouchId } = useAuth();
  const { fingerPrint } = useConfig();

  useFocusEffect(onScreenFocus);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      scrollViewRef.current?.scrollToEnd({ animated: true }),
    );
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      TouchID.isSupported().then(() => {
        if (fingerPrint)
          TouchID.authenticate('Sign In with Touch ID', { title: '' })
            .then(() => signInByTouchId())
            .catch();
      });
    }, 2000);
  }, [fingerPrint, signInByTouchId]);

  const handleGoBack = useCallback(() => {
    clearTimeout(timeout);

    goBack();
  }, [goBack]);

  useEffect(() => {
    addListener('blur', () => {
      clearTimeout(timeout);
    });

    return () => {
      removeListener('blur', () => {});
    };
  }, [addListener, removeListener]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid e-mail'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Error in SignIn', 'Email or password is invalid!');
      }
    },
    [signIn],
  );

  return (
    <ScrollView ref={scrollViewRef}>
      <Container style={{ opacity }}>
        <Content style={{ transform: [{ translateX: left.x }] }}>
          <BackButton testID="go-back" onPress={handleGoBack}>
            <Icon name="arrow-circle-left" size={30} color="#fff" />
          </BackButton>

          <TitleImage resizeMode="contain" source={signInImage} />

          <Title>Welcome {'\n'}back</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              icon="envelope"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              secureTextEntry
              placeholder="Password"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>
        </Content>

        <SubmitButtonContainer style={{ transform: [{ translateX: right.x }] }}>
          <SubmitButton
            testID="submit-button"
            onPress={() => formRef.current?.submitForm()}
          >
            <SubmitButtonText>SignIn</SubmitButtonText>

            <Icon name="sign-in-alt" size={30} color="#fff" />
          </SubmitButton>
        </SubmitButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
