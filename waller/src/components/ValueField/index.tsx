import React from 'react';

import { useConfig } from '#hooks/config';

import { Container, ValueText } from './styles';

interface IValueFieldProps {
  color?: string;
  align?: string;
  size?: number;
}

const ValueField: React.FC<IValueFieldProps> = ({
  children,
  color = '#fff',
  align = 'center',
  size = 18,
}) => {
  const { seeValues } = useConfig();

  return (
    <Container>
      <ValueText color={color} size={size} blinded={!seeValues} align={align}>
        {children}
      </ValueText>
    </Container>
  );
};

export default ValueField;
