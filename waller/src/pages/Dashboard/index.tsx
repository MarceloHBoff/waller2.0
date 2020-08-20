import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import Header, { HeaderText } from '#components/Header';
import { useAuth } from '#hooks/auth';
import { useFetch } from '#hooks/swr';
import { Colors, ChartColors, Metrics } from '#styles';
import { IUserActivesResponse } from '#types/UserActive';
import { formatPrice, round10 } from '#utils/format';

import Card from './Card';
import { Container, Cards } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { navigate } = useNavigation();

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { totals, types } = useMemo(
    () => ({
      totals: data?.totals,
      types: data?.types,
    }),
    [data],
  );

  const greeting = useCallback(() => {
    const nowHour = new Date().getHours();

    if (nowHour > 18 || nowHour < 5) return 'Good night';
    if (nowHour > 12) return 'Good afternoon';
    return 'Good morning';
  }, []);

  const { investment = 0, currentValue = 0, profit = 0, percent = 0 } = useMemo(
    () => ({
      investment: formatPrice(totals?.investment),
      currentValue: formatPrice(totals?.currentValue),
      profit: formatPrice(totals?.profit),
      percent: round10(totals?.percent),
    }),
    [totals],
  );

  const pieData = useMemo(() => {
    if (!types || !totals) return [];

    return Object.keys(types)
      .filter(value => types[value] !== 0)
      .map((type, index) => ({
        name: type,
        value: types[type],
        color: ChartColors[index],
        legendFontColor: Colors.graySuperLight,
        legendFontSize: 15,
      }));
  }, [types, totals]);

  return (
    <Container>
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
        <Card icon="wallet" label="Investment">
          {investment}
        </Card>
        <Card icon="money-bill-wave" label="Current Value">
          {currentValue}
        </Card>
        <Card icon="dollar-sign" label="Profit">
          {profit}
        </Card>
        <Card icon="percentage" label="Profit percent">
          {percent} %
        </Card>
      </Cards>

      <PieChart
        data={pieData}
        width={Metrics.width}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="16"
        fromZero
        hasLegend
        xLabelsOffset={10}
        center={[0.3, 1, 3, 2]}
      />
    </Container>
  );
};

export default Dashboard;
