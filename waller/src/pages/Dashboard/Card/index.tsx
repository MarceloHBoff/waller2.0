import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '#components/Loading';
import ValueField from '#components/ValueField';
import { Colors } from '#styles';

import { Container, CardWrapper, CardText } from './styles';

interface CardProps {
  icon: string;
  label: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ icon, label, loading, children }) => {
  return (
    <Container>
      <Icon name={icon} size={50} color={Colors.primarySuperDark} />

      {loading ? (
        <Loading size={50} mode="dark" />
      ) : (
        <CardWrapper>
          <CardText>{label}</CardText>
          <ValueField
            align="left"
            colorBase={Colors.white}
            colorBlinded={Colors.primarySuperDark}
          >
            {children}
          </ValueField>
        </CardWrapper>
      )}
    </Container>
  );
};

export default Card;
