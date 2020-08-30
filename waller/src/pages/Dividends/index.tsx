import React, { useMemo, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

import Header, { HeaderText } from '#components/Header';
import { useFetch } from '#hooks/swr';
import { Colors, Metrics } from '#styles';
import { IDividendsResponse, IDividendsMonthly } from '#types/Dividends';
import { formatPrice } from '#utils/format';

import Card from './Card';
import ListDividends, { IDividendList } from './ListDividends';
import { Container } from './styles';

interface Dataset {
  data: number[];
  color: () => string;
  labels: string[];
  strokeWidth: number;
}

const Dividends: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const { data } = useFetch<IDividendsResponse>('dividends/receivable');
  const { data: monthly } = useFetch<IDividendsMonthly>('dividends/monthly');

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets = [];

    const dataset: Dataset = {
      data: [],
      color: () => Colors.primary,
      labels: [],
      strokeWidth: 3,
    };

    monthly?.dividends
      .filter((_, i, a) => i > a.length - 10)
      .forEach(m => {
        labels.push(`${m.month.toString().padStart(2, '0')}/${m.year}`);
        dataset.data.push(m.total);
      });

    dataset.labels = labels;

    datasets.push(dataset);

    return { labels, datasets };
  }, [monthly]);

  const dividendsList = useMemo(() => {
    if (!openModal) return [];

    const dividendsMonthly = monthly?.dividends.find(
      d => Number(d.year) === Number(year) && Number(d.month) === Number(month),
    );

    const dividendsEdited: IDividendList[] = [];

    dividendsMonthly?.dividends.forEach(d => {
      const findIndex = dividendsEdited.findIndex(
        de => de.code === d.active.code,
      );

      if (findIndex >= 0) {
        dividendsEdited[findIndex].id = d.id;
        dividendsEdited[findIndex].code = d.active.code;
        dividendsEdited[findIndex].type = d.type;
        dividendsEdited[findIndex].pay_date = d.pay_date;
        const numberValue =
          Number(dividendsEdited[findIndex].value) + d.value * d.quantity;
        dividendsEdited[findIndex].value = numberValue;
      } else {
        dividendsEdited.push({
          id: d.id,
          code: d.active.code,
          type: d.type,
          pay_date: d.pay_date,
          value: d.quantity * d.value,
        });
      }
    });

    return dividendsEdited.map(dividend => ({
      ...dividend,
      value: formatPrice(Number(dividend.value)),
    }));
  }, [openModal, monthly, month, year]);

  return (
    <Container>
      <Header>
        <HeaderText>Dividends</HeaderText>
      </Header>

      <Card value={data?.total} />
      <Card value={monthly?.total} />

      <ListDividends
        title={`Dividends ${month.toString().padStart(2, '0')}/${year}`}
        dividends={dividendsList}
        open={openModal}
        setOpen={setOpenModal}
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
          onDataPointClick={({ dataset, index }) => {
            const [m, y] = dataset.labels[index].split('/');
            setMonth(Number(m));
            setYear(Number(y));
            setOpenModal(true);
          }}
          yAxisLabel="R$ "
          verticalLabelRotation={60}
          chartConfig={{ color: () => Colors.primary }}
          bezier
        />
      )}
    </Container>
  );
};

export default Dividends;
