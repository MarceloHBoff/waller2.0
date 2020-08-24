import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import Header, { HeaderText } from '#components/Header';
import Nothing from '#components/Nothing';
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
    const nowHour = new Date(Date.now()).getHours();

    if (nowHour > 18 || nowHour < 5) return 'Good night';
    if (nowHour > 12) return 'Good afternoon';
    return 'Good morning';
  }, []);

  const { investment, currentValue, profit, percent } = useMemo(
    () => ({
      investment: formatPrice(totals?.investment) || 'R$ 0,00',
      currentValue: formatPrice(totals?.currentValue || 0) || 'R$ 0,00',
      profit: formatPrice(totals?.profit || 0) || 'R$ 0,00',
      percent: round10(totals?.percent || 0) || '0,00',
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
        <HeaderText testID="header-text">
          {greeting()}, {'\n'}
          {user.name}
        </HeaderText>
        <TouchableOpacity testID="config" onPress={() => navigate('Config')}>
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

      {totals?.investment === 0 ? (
        <Nothing text="None actives yet" />
      ) : (
        <PieChart
          data={pieData}
          width={Metrics.width}
          height={220}
          chartConfig={{
            color: () => `rgba(26, 255, 146)`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="16"
          fromZero
          hasLegend
          xLabelsOffset={10}
          center={[0.3, 1, 3, 2]}
        />
      )}
    </Container>
  );
};

export default Dashboard;
