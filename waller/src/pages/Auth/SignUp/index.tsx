import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, ScrollView, Keyboard, Alert } from 'react-native';

import { FormHandles, Form } from '@unform/core';
import * as Yup from 'yup';

import signUpImage from '../../../assets/signUpImage.png';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  Container,
  Content,
  TitleImage,
  Title,
  SubmitButton,
  SubmitButtonText,
} from '../AuthStyles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
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

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('E-mail is required')
          .email('Type a valid e-mail'),
        password: Yup.string()
          .required('E-mail is required')
          .min(6, 'Need at least 6 characters'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Error in SignIn', 'Email or password is invalid!');
    }
  }, []);

  return (
    <ScrollView ref={scrollViewRef}>
      <Container style={{ opacity }}>
        <Content>
          <TitleImage resizeMode="contain" source={signUpImage} />

          <Title>Create {'\n'}account</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Name"
              icon="user"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
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

        <SubmitButton onPress={() => formRef.current?.submitForm()}>
          <SubmitButtonText>SignUp</SubmitButtonText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
