import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '#pages/Auth/Home';
import SignIn from '#pages/Auth/SignIn';
import SignUp from '#pages/Auth/SignUp';
import { Colors } from '#styles';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.grayDarker },
    }}
  >
    <Auth.Screen name="Home" component={Home} />
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
