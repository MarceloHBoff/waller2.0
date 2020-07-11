import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <TouchableOpacity onPress={signOut}>
        <Text>Siar</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
