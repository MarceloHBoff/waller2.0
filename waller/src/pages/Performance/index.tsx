import React from 'react';
import { Animated } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';

import { left, onScreenFocus } from '#animations';
import Header, { HeaderText } from '#components/Header';
import { Colors, Fonts } from '#styles';

import Actives from './Actives';
import Bonds from './Bonds';
import { Container } from './styles';

const Tab = createMaterialTopTabNavigator();

const Performance: React.FC = () => {
  useFocusEffect(onScreenFocus);

  return (
    <Container>
      <Header>
        <HeaderText>Wallet</HeaderText>
      </Header>

      <Animated.View style={{ flex: 1, transform: [{ translateX: left.x }] }}>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: Colors.grayDark }}
          tabBarOptions={{
            style: { backgroundColor: Colors.grayDark },
            labelStyle: {
              fontSize: 12,
              fontFamily: Fonts.poppinsMedium,
            },
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.white,
            allowFontScaling: true,
          }}
        >
          <Tab.Screen name="Acao" component={Actives} />
          <Tab.Screen name="FII" component={Actives} />
          <Tab.Screen name="ETF" component={Actives} />
          <Tab.Screen name="Stock" component={Actives} />
          <Tab.Screen name="Reit" component={Actives} />
          <Tab.Screen name="Bond" component={Bonds} />
        </Tab.Navigator>
      </Animated.View>
    </Container>
  );
};

export default Performance;
