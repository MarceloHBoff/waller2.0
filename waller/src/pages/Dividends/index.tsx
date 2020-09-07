import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';

import Header, { HeaderText } from '#components/Header';
import { useFetch } from '#hooks/swr';
import { Colors, Metrics } from '#styles';
import {
  IDividendsResponse,
  IDividendsMonthly,
  IDividend,
} from '#types/Dividends';

import Card from './Card';
import ListDividends, {
  IDividendList,
  ListDividendsHandles,
} from './ListDividends';
import { Container } from './styles';

const Dividends: React.FC = () => {
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState('');
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [dividendsList, setDividendsList] = useState<IDividendList[]>([]);
  const listDividendsRef = useRef<ListDividendsHandles>(null);

  const { data, isValidating } = useFetch<IDividendsResponse>(
    'dividends/receivable',
  );
  const { data: monthly, isValidating: isValidatingMonthly } = useFetch<
    IDividendsMonthly
  >('dividends/monthly');

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets = [];

    const dataset: Dataset = {
      data: [],
      color: () => Colors.primary,
      strokeWidth: 3,
    };

    monthly?.dividends
      .filter((_, index, array) => index > array.length - 10)
      .forEach(months => {
        labels.push(
          `${months.month.toString().padStart(2, '0')}/${months.year}`,
        );
        dataset.data.push(months.total);
      });

    datasets.push(dataset);

    setChartLabels(labels);

    return { labels, datasets };
  }, [monthly]);

  const unifyDividends = useCallback(
    (dividendsEdited: IDividendList[], dividend: IDividend) => {
      const findIndex = dividendsEdited.findIndex(
        ({ code, pay_date }) =>
          code === dividend.active.code && dividend.pay_date === pay_date,
      );

      if (findIndex >= 0) {
        const numberValue =
          Number(dividendsEdited[findIndex].value) +
          dividend.value * dividend.quantity;

        dividendsEdited[findIndex] = {
          ...dividend,
          code: dividend.active.code,
          value: numberValue,
        };
      } else {
        dividendsEdited.push({
          ...dividend,
          code: dividend.active.code,
          value: dividend.quantity * dividend.value,
        });
      }
    },
    [],
  );

  useEffect(() => {
    const dividendsMonthly = monthly?.dividends.find(
      d => `${d.month.toString().padStart(2, '0')}/${d.year}` === period,
    );

    const dividendsEdited: IDividendList[] = [];

    dividendsMonthly?.dividends.forEach(dividend => {
      unifyDividends(dividendsEdited, dividend);
    });

    setDividendsList(dividendsEdited);
  }, [monthly, period, unifyDividends]);

  const onPressReceivable = useCallback(() => {
    const dividendsEdited: IDividendList[] = [];

    data?.dividends.forEach(dividend => {
      unifyDividends(dividendsEdited, dividend);
    });

    setDividendsList(dividendsEdited);
    setTitle('Dividends receivable');
    listDividendsRef.current?.openModal();
  }, [data, unifyDividends]);

  const onPressReceived = useCallback(() => {
    const dividendsEdited: IDividendList[] = [];

    monthly?.dividends.forEach(months => {
      months.dividends.forEach(dividend => {
        unifyDividends(dividendsEdited, dividend);
      });
    });

    setDividendsList(dividendsEdited);
    setTitle('Dividends received');
    listDividendsRef.current?.openModal();
  }, [monthly, unifyDividends]);

  return (
    <Container>
      <Header>
        <HeaderText>Dividends</HeaderText>
      </Header>

      <Card
        label="Dividends receivable"
        value={data?.total}
        onPress={onPressReceivable}
        loading={isValidating}
      />
      <Card
        label="Dividends received"
        value={monthly?.total}
        onPress={onPressReceived}
        loading={isValidatingMonthly}
      />

      <ListDividends
        ref={listDividendsRef}
        title={title}
        dividends={dividendsList}
      />

      {chartData.datasets[0].data.length !== 0 && (
        <LineChart
          data={chartData}
          width={Metrics.width - 32}
          height={250}
          style={{ flex: 1, marginLeft: 16, marginTop: 16, paddingBottom: 16 }}
          transparent
          withInnerLines={false}
          fromZero
          onDataPointClick={({ index }) => {
            setPeriod(chartLabels[index]);
            setTitle(`Dividends ${chartLabels[index]}`);
            listDividendsRef.current?.openModal();
          }}
          yAxisLabel="R$ "
          verticalLabelRotation={60}
          chartConfig={{
            color: () => Colors.primary,
            propsForDots: {
              r: '4',
              fill: Colors.primaryDarker,
              strokeWidth: '2',
              stroke: Colors.primaryDarker,
            },
          }}
          bezier
        />
      )}
    </Container>
  );
};

export default Dividends;
