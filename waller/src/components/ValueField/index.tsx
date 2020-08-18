import React from 'react';

import { useConfig } from '#hooks/config';

import { Container, ValueText } from './styles';

interface IValueFieldProps {
  colorBase?: string;
  colorBlinded?: string;
  align?: string;
  size?: number;
}

const ValueField: React.FC<IValueFieldProps> = ({
  children,
  colorBase = '#fff',
  colorBlinded = '',
  align = 'center',
  size = 18,
}) => {
  const { seeValues } = useConfig();

  return (
    <Container>
      <ValueText
        colorBase={colorBase}
        colorBlinded={colorBlinded || colorBase}
        size={size}
        blinded={!seeValues}
        align={align}
      >
        {children}
      </ValueText>
    </Container>
  );
};

export default ValueField;
