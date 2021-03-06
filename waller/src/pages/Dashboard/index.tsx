import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { onScreenFocus, left, opacity } from '#animations';
import Header, { HeaderText } from '#components/Header';
import Loading from '#components/Loading';
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

  useFocusEffect(onScreenFocus);

  const { data, isValidating } = useFetch<IUserActivesResponse>('userActives');

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
      currentValue: formatPrice(totals?.currentValue) || 'R$ 0,00',
      profit: formatPrice(totals?.profit) || 'R$ 0,00',
      percent: round10(totals?.percent) || '0,00',
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

      <Animated.View
        style={{
          opacity,
          transform: [{ translateX: left.x }],
        }}
      >
        <Cards
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          <Card loading={isValidating} icon="wallet" label="Investment">
            {investment}
          </Card>
          <Card
            loading={isValidating}
            icon="money-bill-wave"
            label="Current Value"
          >
            {currentValue}
          </Card>
          <Card loading={isValidating} icon="dollar-sign" label="Profit">
            {profit}
          </Card>
          <Card loading={isValidating} icon="percentage" label="Profit percent">
            {percent} %
          </Card>
        </Cards>

        {totals?.investment === 0 ? (
          <>
            {isValidating ? (
              <Loading size={200} />
            ) : (
              <Nothing text="None actives yet" />
            )}
          </>
        ) : (
          <PieChart
            data={pieData}
            width={Metrics.width}
            height={220}
            chartConfig={{
              color: () => '#fff',
              barRadius: 10,
              barPercentage: 10,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="16"
            fromZero
            hasLegend
          />
        )}
      </Animated.View>
    </Container>
  );
};

export default Dashboard;
