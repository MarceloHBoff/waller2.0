import React, { useMemo } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import ValueField from '../../components/ValueField';
import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/swr';
import { Colors } from '../../styles';
import { formatPrice, round10 } from '../../utils/format';

import PieChartLabels from './PieChartLabels';
import { Container, HeaderText, Cards, Card, CardText } from './styles';

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
  const { user } = useAuth();

  const { navigate } = useNavigation();

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { totals, types } = useMemo(() => {
    return {
      totals: data?.totals,
      types: data?.types,
    };
  }, [data]);

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
    if (!totals)
      return {
        investment: 0,
        currentValue: 0,
        profit: 0,
        percent: 0,
        profitColor: Colors.green,
        percentColor: Colors.green,
      };

    return {
      investment: formatPrice(totals.investment),
      currentValue: formatPrice(totals.currentValue),
      profit: formatPrice(totals.profit),
      percent: round10(totals.percent),
      profitColor: totals.profit > 0 ? Colors.green : Colors.dangerDark,
      percentColor: totals.percent > 0 ? Colors.green : Colors.dangerDark,
    };
  }, [totals]);

  const pieData = useMemo(() => {
    if (!types || !totals) return [];

    return Object.keys(types)
      .filter((type: string) => types[type] !== 0)
      .map((type: string) => ({
        value: (types[type] / totals?.currentValue) * 100,
        svg: { fill: '#fff' },
        key: type,
      }));
  }, [types, totals]);

  return (
    <Container>
      <StatusBar backgroundColor={Colors.primarySuperDark} />

      <Header>
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

      {pieData.length !== 0 && (
        <PieChart style={{ height: 200 }} data={pieData}>
          <PieChartLabels />
        </PieChart>
      )}

      {/* <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity> */}
    </Container>
  );
};

export default Dashboard;
