import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import { Colors } from '../styles';

const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    tabBarOptions={{
      style: { backgroundColor: Colors.grayDark },
      activeTintColor: Colors.primaryDark,
      inactiveTintColor: Colors.graySuperLight,
      showLabel: false,
    }}
  >
    <App.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list" color={color} size={size} />
        ),
      }}
    />
    <App.Screen
      name="Dashboard1"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list" color={color} size={size} />
        ),
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
