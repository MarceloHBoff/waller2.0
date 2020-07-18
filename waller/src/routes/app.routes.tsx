import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '#pages/Dashboard';
import ListActives from '#pages/ListActives';

import CustomTabBar from './CustomTabBar';

const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    initialRouteName="Dashboard"
  >
    <App.Screen
      name="ListActives"
      component={ListActives}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bars" color={color} size={size} />
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
      name="Dashboard1"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
