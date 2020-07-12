import React from 'react';

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
  return (
    <Container>
      <ValueText color={color} size={size}>
        {children}
      </ValueText>
    </Container>
  );
};

export default ValueField;
