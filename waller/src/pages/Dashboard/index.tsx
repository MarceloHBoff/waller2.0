import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
// import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import Header, { HeaderText } from '#components/Header';
import ValueField from '#components/ValueField';
import { useAuth } from '#hooks/auth';
import { useFetch } from '#hooks/swr';
import { Colors, ChartColors } from '#styles';
import { IUserActivesResponse } from '#types/UserActive';
import { formatPrice, round10 } from '#utils/format';

import PieChartLabels from './PieChartLabels';
import { Container, Cards, Card, CardText } from './styles';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.8,
  useShadowColorFromDataset: false,
};

const screenWidth = Dimensions.get('window').width;

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

  const greeting = useCallback(() => {
    const nowHour = new Date().getHours();

    if (nowHour > 18 || nowHour < 5) return 'Good night';
    if (nowHour > 12) return 'Good afternoon';
    return 'Good morning';
  }, []);

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
      .map((type: string, index: number) => ({
        name: type,
        value: types[type],
        color: ChartColors[index],
        legendFontColor: '#7F7F7F',
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

      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        chartConfig={{ ...chartConfig, barRadius: 10, stackedBar: true }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="16"
        fromZero
        hasLegend
        xLabelsOffset={10}
        center={[0.3, 1, 3, 2]}
      />

      {/* {pieData.length !== 0 && (
        <PieChart style={{ height: 200 }} data={pieData} padAngle={0.02}>
          <PieChartLabels />
        </PieChart>
      )} */}
    </Container>
  );
};

export default Dashboard;
