import React, { useRef, useEffect, useCallback } from 'react';
import { ScrollView, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import { FormHandles, Form } from '@unform/core';

import * as Yup from 'yup';

import {
  opacity,
  left,
  right,
  handleEnterPage,
  handleLeavePage,
} from '#animations';
import signUpImage from '#assets/signUpImage.png';
import Input from '#components/Input';
import getValidationErrors from '#utils/getValidationErrors';

import api from '../../../services/api';
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { goBack, navigate, addListener, removeListener } = useNavigation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      scrollViewRef.current?.scrollToEnd({ animated: true }),
    );
  }, []);

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
  }, [addListener, removeListener]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post('users', data);

        Alert.alert('SignUp Success', 'SignIn to enjoy the GoBarber');

        navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Error in SignUp', 'Credentials is invalid!');
      }
    },
    [navigate],
  );

  return (
    <ScrollView ref={scrollViewRef}>
      <Container style={{ opacity }}>
        <Content style={{ transform: [{ translateX: left.x }] }}>
          <BackButton testID="go-back" onPress={() => goBack()}>
            <Icon name="arrow-circle-left" size={30} color="#fff" />
          </BackButton>

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

        <SubmitButtonContainer style={{ transform: [{ translateX: right.x }] }}>
          <SubmitButton
            testID="submit-button"
            onPress={() => formRef.current?.submitForm()}
          >
            <SubmitButtonText>SignUp</SubmitButtonText>

            <Icon name="plus-circle" size={30} color="#fff" />
          </SubmitButton>
        </SubmitButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
