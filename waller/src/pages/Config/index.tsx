import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header, { HeaderText } from '#components/Header';
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
      <Header>
        <HeaderText>Configurations</HeaderText>
      </Header>

      <Wrapper>
        <CheckBox
          testID="see-values"
          selected={seeValues}
          onChange={setSeeValues}
        />
        {seeValues ? (
          <Icon testID="eye-icon" name="eye" color={Colors.white} size={30} />
        ) : (
          <Icon
            testID="eye-icon"
            name="eye-slash"
            color={Colors.graySuperLight}
            size={30}
          />
        )}
      </Wrapper>
      <Wrapper>
        <CheckBox
          testID="finger-print"
          selected={fingerPrint}
          onChange={setFingerPrint}
        />
        <Icon
          testID="finger-print-icon"
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
