import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '#pages/Dashboard';
import Dividends from '#pages/Dividends';
import ListActives from '#pages/ListActives';
import Performance from '#pages/Performance';

import CustomTabBar from './CustomTabBar';

const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    initialRouteName="Dashboard"
  >
    <App.Screen
      name="Performance"
      component={Performance}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bars" color={color} size={size} />
        ),
      }}
    />
    <App.Screen
      name="Stonks"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <App.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <App.Screen
      name="ListActives"
      component={ListActives}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="th-large" color={color} size={size} />
        ),
      }}
    />
    <App.Screen
      name="Dividends"
      component={Dividends}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="hand-holding-usd" color={color} size={size} />
        ),
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
