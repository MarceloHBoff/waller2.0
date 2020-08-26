import React, { useMemo } from 'react';
import { Modal } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import Header, { HeaderText } from '#components/Header';
import { useFetch } from '#hooks/swr';
import { Colors, Metrics } from '#styles';
import { IDividendsResponse, IDividendsMonthly } from '#types/Dividends';

import Card from './Card';
import ListDividends from './ListDividends';
import { Container } from './styles';

interface Dataset {
  data: number[];
  color: () => string;
  strokeWidth: number;
}

const Dividends: React.FC = () => {
  const { data } = useFetch<IDividendsResponse>('dividends/receivable');
  const { data: monthly } = useFetch<IDividendsMonthly>('dividends/monthly');

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets = [];

    const dataset: Dataset = {
      data: [],
      color: () => Colors.primary,
      strokeWidth: 3,
    };

    monthly?.dividends
      .filter((_, i, a) => i > a.length - 7)
      .forEach(m => {
        labels.push(`${m.month}/${m.year}`);
        dataset.data.push(m.total);
      });

    datasets.push(dataset);

    return { labels, datasets };
  }, [monthly]);

  return (
    <Container>
      <Header>
        <HeaderText>Dividends</HeaderText>
      </Header>

      <Card value={data?.total} />
      <Card value={monthly?.total} />

      <Modal transparent animated animationType="fade" visible>
        <ListDividends dividends={data?.dividends} />
      </Modal>

      {chartData.datasets[0].data.length !== 0 && (
        <LineChart
          data={chartData}
          width={Metrics.width}
          height={250}
          style={{ flex: 1, margin: 16, paddingBottom: 10 }}
          transparent
          withInnerLines={false}
          fromZero
          onDataPointClick={({ value }) => {
            console.log(value);
          }}
          yAxisLabel="R$ "
          verticalLabelRotation={60}
          chartConfig={{
            color: () => Colors.primary,
          }}
          bezier
        />
      )}
    </Container>
  );
};

export default Dividends;
