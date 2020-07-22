import React from 'react';
import { Text } from 'react-native-svg';

import { round10 } from '#utils/format';

interface Slice {
  pieCentroid: [number, number];
  data: {
    value: number;
    key: string;
  };
}

interface IPieChartLabelsProps {
  slices: Slice[];
}

const PieChartLabels: React.FC<IPieChartLabelsProps> = ({ slices }) => {
  return (
    <>
      {slices.map(slice => {
        const { pieCentroid, data } = slice;

        return (
          <Text
            key={data.key}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="hanging"
            fontSize={12}
            stroke="white"
            strokeWidth={0.8}
          >
            {round10(data.value)}
          </Text>
        );
      })}
    </>
  );
};

export default PieChartLabels;
