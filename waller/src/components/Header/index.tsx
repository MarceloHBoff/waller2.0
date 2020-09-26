import React from 'react';
import { StatusBar } from 'react-native';

import { Colors } from '#styles';

import { Container, HeaderText } from './styles';

export { HeaderText };

const Header: React.FC = ({ children }) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />

      <Container style={{ elevation: 1 }}>{children}</Container>
    </>
  );
};

export default Header;
