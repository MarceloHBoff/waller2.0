import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Config: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <TouchableOpacity onPress={signOut}>
      <Container>dale</Container>
    </TouchableOpacity>
  );
};

export default Config;
