import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import SignUp from '#pages/Auth/SignUp';

import apiMock from '../../utils/ApiMock';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
let mockedFocus: () => void;
let mockedBlur: () => void;
let mockedRemoveFocus: () => void;
let mockedRemoveBlur: () => void;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedGoBack,
      navigate: mockedNavigate,
      addListener: (e: string, func: () => void) => {
        if (e === 'focus') mockedFocus = func;
        if (e === 'blur') mockedBlur = func;
      },
      removeListener: (e: string, func: () => void) => {
        if (e === 'focus') mockedRemoveFocus = func;
        if (e === 'blur') mockedRemoveBlur = func;
      },
    }),
  };
});

let emailField: ReactTestInstance;
let passwordField: ReactTestInstance;
let nameField: ReactTestInstance;
let buttonElement: ReactTestInstance;

describe('SignUp page', () => {
  beforeEach(() => {
    const { getByPlaceholder, getByTestId } = render(<SignUp />);

    emailField = getByPlaceholder('E-mail');
    passwordField = getByPlaceholder('Password');
    nameField = getByPlaceholder('Name');
    buttonElement = getByTestId('submit-button');
  });

  it('should be to sign up', async () => {
    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    apiMock
      .onPost('/users')
      .reply(201, { id: '1', name: 'John Doe', email: 'johndoe@example.com' });

    const spyAlert = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SignIn');
      expect(spyAlert).toHaveBeenCalled();
    });
  });

  it('should not be to sign in with invalid credentials', async () => {
    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'invalid-email');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    const spyAlert = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      expect(spyAlert).toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    apiMock.onPost('/users').abortRequest();

    const spyAlert = jest.spyOn(Alert, 'alert');

    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(spyAlert).toHaveBeenCalled();
    });
  });

  it('should be able to go back', async () => {
    const { getByTestId } = render(<SignUp />);

    fireEvent.press(getByTestId('go-back'));

    mockedFocus();
    mockedBlur();

    mockedRemoveFocus();
    mockedRemoveBlur();

    await waitFor(() => {
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });
});
