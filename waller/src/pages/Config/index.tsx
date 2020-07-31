import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useAuth } from '#hooks/auth';
import { useConfig } from '#hooks/config';
import { Colors } from '#styles';

import CheckBox from './CheckBox';
import { Container, Wrapper, SignOut, SignOutText } from './styles';

const Config: React.FC = () => {
  const { signOut } = useAuth();
  const { seeValues, fingerPrint, setSeeValues, setFingerPrint } = useConfig();

  return (
    <Container>
      <Wrapper>
        <CheckBox selected={seeValues} onChange={setSeeValues} />
        {seeValues ? (
          <Icon name="eye" color={Colors.white} size={30} />
        ) : (
          <Icon name="eye-slash" color={Colors.graySuperLight} size={30} />
        )}
      </Wrapper>
      <Wrapper>
        <CheckBox selected={fingerPrint} onChange={setFingerPrint} />
        <Icon
          name="fingerprint"
          color={fingerPrint ? Colors.white : Colors.graySuperLight}
          size={30}
        />
      </Wrapper>

      <SignOut onPress={signOut}>
        <SignOutText>Sign Out</SignOutText>
      </SignOut>
    </Container>
  );
};

export default Config;
