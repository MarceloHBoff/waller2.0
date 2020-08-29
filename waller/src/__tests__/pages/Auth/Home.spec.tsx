import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import Home from '#pages/Auth/Home';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useFocusEffect: () => {},
  };
});

let signInButton: ReactTestInstance;
let signUpButton: ReactTestInstance;

describe('Home page', () => {
  beforeEach(() => {
    mockedNavigate.mockRestore();

    const { getByTestId } = render(<Home />);

    signInButton = getByTestId('signin-button');
    signUpButton = getByTestId('signup-button');
  });

  it('should be able to navigate to sign in', async () => {
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SignIn');
    });
  });

  it('should be able to navigate to sign up', async () => {
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SignUp');
    });
  });
});
