import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import TouchID from 'react-native-touch-id';
import { ReactTestInstance } from 'react-test-renderer';

import SignIn from '#pages/Auth/SignIn';

const mockedSignIn = jest.fn();
const mockedGoBack = jest.fn();
let mockedFocus: () => void;
let mockedBlur: () => void;
let mockedRemoveFocus: () => void;
let mockedRemoveBlur: () => void;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedGoBack,
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

jest.mock('../../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

let emailField: ReactTestInstance;
let passwordField: ReactTestInstance;
let buttonElement: ReactTestInstance;

describe('SignIn page', () => {
  beforeEach(() => {
    mockedSignIn.mockRestore();

    const { getByPlaceholder, getByTestId } = render(<SignIn />);

    emailField = getByPlaceholder('E-mail');
    passwordField = getByPlaceholder('Password');
    buttonElement = getByTestId('submit-button');
  });

  it('should be to sign in', async () => {
    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalled();
    });
  });

  it('should not be to sign in with invalid credentials', async () => {
    fireEvent.changeText(emailField, 'invalid-email');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const spyAlert = jest.spyOn(Alert, 'alert');

    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(spyAlert).toHaveBeenCalled();
    });
  });

  it('should be able to go back', async () => {
    const { getByTestId } = render(<SignIn />);

    fireEvent.press(getByTestId('go-back'));

    mockedFocus();
    mockedBlur();

    mockedRemoveFocus();
    mockedRemoveBlur();

    await waitFor(() => {
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  it('should be able to show touch id login', async () => {
    const spyTouchID = jest.spyOn(TouchID, 'isSupported');

    await waitFor(
      () => {
        expect(spyTouchID).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });
});
