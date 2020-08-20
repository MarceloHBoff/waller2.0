import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ValueField from '#components/ValueField';
import { Colors } from '#styles';

import { Container, CardWrapper, CardText } from './styles';

interface CardProps {
  icon: string;
  label: string;
}

const Card: React.FC<CardProps> = ({ icon, label, children }) => {
  return (
    <Container>
      <Icon name={icon} size={50} color={Colors.primarySuperDark} />

      <CardWrapper>
        <CardText>{label}</CardText>
        <ValueField
          align="left"
          colorBase={Colors.graySuperDark}
          colorBlinded={Colors.primarySuperDark}
        >
          {children}
        </ValueField>
      </CardWrapper>
    </Container>
  );
};

export default Card;
