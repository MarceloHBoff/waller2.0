import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, ScrollView, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import { FormHandles, Form } from '@unform/core';
import * as Yup from 'yup';

import signUpImage from '../../../assets/signUpImage.png';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
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
  const offsetLeft = new Animated.ValueXY({ x: -800, y: 0 });
  const offsetRight = new Animated.ValueXY({ x: 800, y: 0 });
  const opacity = new Animated.Value(0);

  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { goBack } = useNavigation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      scrollViewRef.current?.scrollToEnd({ animated: true }),
    );

    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: 0,
        speed: 0.1,
        bounciness: 200,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
        toValue: 0,
        speed: 0.1,
        bounciness: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offsetLeft, offsetRight]);

  const handleGoBack = useCallback(() => {
    Animated.parallel([
      Animated.spring(offsetLeft.x, {
        toValue: -800,
        speed: 0.001,
        bounciness: 100,
        useNativeDriver: true,
      }),
      Animated.spring(offsetRight.x, {
        toValue: 800,
        speed: 0.001,
        bounciness: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    goBack();
  }, [goBack, opacity, offsetRight, offsetLeft]);

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
        <Content
          style={{
            transform: [{ translateX: offsetLeft.x }],
          }}
        >
          <BackButton onPress={handleGoBack}>
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

        <SubmitButtonContainer
          style={{
            transform: [{ translateX: offsetRight.x }],
          }}
        >
          <SubmitButton onPress={() => formRef.current?.submitForm()}>
            <SubmitButtonText>SignUp</SubmitButtonText>
            <Icon name="plus-circle" size={30} color="#fff" />
          </SubmitButton>
        </SubmitButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
