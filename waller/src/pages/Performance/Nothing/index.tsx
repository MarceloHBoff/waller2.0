import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '#styles';

import { Container, NothingText } from './styles';

const Nothing: React.FC = () => {
  return (
    <Container testID="nothing">
      <NothingText>Nothing actives for this type</NothingText>
      <Icon name="frown" size={30} color={Colors.white} />
    </Container>
  );
};

export default Nothing;
