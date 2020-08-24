import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '#styles';

import { Container, NothingText } from './styles';

interface NothingProps {
  text: string;
}

const Nothing: React.FC<NothingProps> = ({ text }) => {
  return (
    <Container testID="nothing">
      <NothingText>{text}</NothingText>

      <Icon name="frown" size={30} color={Colors.white} />
    </Container>
  );
};

export default Nothing;
