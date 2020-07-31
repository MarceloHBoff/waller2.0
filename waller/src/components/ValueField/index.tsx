import React from 'react';

import { useConfig } from '#hooks/config';

import { Container, ValueText } from './styles';

interface IValueFieldProps {
  color?: string;
  size?: number;
}

const ValueField: React.FC<IValueFieldProps> = ({
  children,
  color = '#fff',
  size = 18,
}) => {
  const { seeValues } = useConfig();

  return (
    <Container>
      <ValueText color={color} size={size} blinded={!seeValues}>
        {children}
      </ValueText>
    </Container>
  );
};

export default ValueField;
