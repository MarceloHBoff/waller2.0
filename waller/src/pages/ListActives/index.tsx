import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from '../../components/Header';
import { Colors, Fonts } from '../../styles';

import Actives from './Actives';
import { Container, HeaderText } from './styles';

const Tab = createMaterialTopTabNavigator();

const ListActives: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderText>Wallet</HeaderText>
      </Header>

      <Tab.Navigator
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
        <Tab.Screen name="Bond" component={Actives} />
      </Tab.Navigator>
    </Container>
  );
};

export default ListActives;
