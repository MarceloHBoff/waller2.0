import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StatusBar } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import ValueField from '../../components/ValueField';
import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/swr';
import { Colors } from '../../styles';
import { formatPrice, round10 } from '../../utils/format';

import { Container, Header, HeaderText, Cards, Card, CardText } from './styles';

interface IUserActivesResponse {
  actives: UserActive[];
  types: {
    Acao: number;
    Stock: number;
    ETF: number;
    FII: number;
    Reit: number;
    Bond: number;
  };
  totals: {
    investment: number;
    currentValue: number;
    profit: number;
    percent: number;
  };
}

interface UserActive {
  quantity: number;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const { navigate } = useNavigation();

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const greeting = () => {
    const nowHour = new Date().getHours();

    if (nowHour > 18 || nowHour < 5) return 'Good night';
    if (nowHour > 12) return 'Good afternoon';
    return 'Good morning';
  };

  const {
    investment,
    currentValue,
    profit,
    percent,
    profitColor,
    percentColor,
  } = useMemo(() => {
    if (!data)
      return {
        investment: 0,
        currentValue: 0,
        profit: 0,
        percent: 0,
        profitColor: Colors.green,
        percentColor: Colors.green,
      };

    return {
      investment: formatPrice(data?.totals.investment),
      currentValue: formatPrice(data?.totals.currentValue),
      profit: formatPrice(data?.totals.profit),
      percent: round10(data?.totals.percent),
      profitColor: data.totals.profit > 0 ? Colors.green : Colors.dangerDark,
      percentColor: data.totals.percent > 0 ? Colors.green : Colors.dangerDark,
    };
  }, [data]);

  const pieData = [
    {
      value: data?.types.Acao,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.Acao}`,
    },
    {
      value: data?.types.Stock,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.Stock}`,
    },
    {
      value: data?.types.ETF,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.ETF}`,
    },
    {
      value: data?.types.FII,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.FII}`,
    },
    {
      value: data?.types.Reit,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.Reit}`,
    },
    {
      value: data?.types.Bond,
      svg: {
        fill: '#fff',
      },
      key: `pie-${data?.types.Bond}`,
    },
  ];

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primarySuperDark} />

      <Header style={{ elevation: 10 }}>
        <HeaderText>
          {greeting()}, {'\n'}
          {user.name}
        </HeaderText>
        <TouchableOpacity onPress={() => navigate('Config')}>
          <Icon name="user-cog" size={30} color={Colors.white} />
        </TouchableOpacity>
      </Header>

      <Cards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <Card>
          <CardText color={Colors.orange}>Investment</CardText>
          <Icon name="wallet" size={50} color={Colors.orange} />
          <ValueField color={Colors.orange}>{investment}</ValueField>
        </Card>
        <Card>
          <CardText color={Colors.orange}>Current Value</CardText>
          <Icon name="money-bill-wave" size={50} color={Colors.orange} />
          <ValueField color={Colors.orange}>{currentValue}</ValueField>
        </Card>
        <Card>
          <CardText color={profitColor}>Profit</CardText>
          <Icon name="hand-holding-usd" size={50} color={profitColor} />
          <ValueField color={profitColor}>{profit}</ValueField>
        </Card>
        <Card>
          <CardText color={percentColor}>Profit percent</CardText>
          <Icon name="percentage" size={50} color={percentColor} />
          <ValueField color={percentColor}>{percent} %</ValueField>
        </Card>
      </Cards>

      <PieChart style={{ height: 200 }} data={pieData} />

      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
