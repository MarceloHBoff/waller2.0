import React from 'react';
import { TouchableOpacity, Text, StatusBar } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { Colors } from '../../styles';

import {
  Container,
  Header,
  HeaderText,
  Cards,
  Card,
  CardTitle,
  CardValue,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const greeting = () => {
    const nowHour = new Date().getHours();

    if (nowHour > 5) return 'Good morning';
    if (nowHour > 12) return 'Good afternoon';
    return 'Good night';
  };

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primarySuperDark} />
      <Header style={{ elevation: 10 }}>
        <HeaderText>
          {greeting()}, {'\n'}
          {user.name}
        </HeaderText>
      </Header>
      <Cards horizontal showsHorizontalScrollIndicator={false}>
        <Card>
          <CardTitle>Equity</CardTitle>
          <CardValue>R$ 1000,00</CardValue>
        </Card>
        <Card>
          <CardTitle>Equity</CardTitle>
          <CardValue>R$ 1000,00</CardValue>
        </Card>
        <Card>
          <CardTitle>Equity</CardTitle>
          <CardValue>R$ 1000,00</CardValue>
        </Card>
      </Cards>
      <TouchableOpacity onPress={signOut}>
        <Text>Siar</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
