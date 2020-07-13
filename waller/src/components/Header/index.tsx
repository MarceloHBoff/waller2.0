import React from 'react';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  return <Container style={{ elevation: 10 }}>{children}</Container>;
};

export default Header;
