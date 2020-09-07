import React, { useCallback } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Header, { HeaderText } from '#components/Header';
import { useAuth } from '#hooks/auth';
import { useConfig } from '#hooks/config';
import { Colors } from '#styles';

import CheckBox from './CheckBox';
import {
  Container,
  Wrapper,
  Configuration,
  Configurations,
  SignOut,
  SignOutText,
} from './styles';

const Config: React.FC = () => {
  const { signOut } = useAuth();
  const { seeValues, fingerPrint, setSeeValues, setFingerPrint } = useConfig();
  const { goBack } = useNavigation();

  const opacity = new Animated.Value(0);
  const offsetBottom = new Animated.ValueXY({ x: 0, y: 200 });

  const onScreenFocus = useCallback(() => {
    opacity.setValue(0);
    offsetBottom.setValue({ x: 0, y: 200 });

    Animated.parallel([
      Animated.spring(offsetBottom.y, {
        toValue: 0,
        speed: 0.1,
        bounciness: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line
  }, []);

  useFocusEffect(onScreenFocus);

  return (
    <Container>
      <Header>
        <HeaderText>Configurations</HeaderText>

        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-circle-left" size={30} color={Colors.white} />
        </TouchableOpacity>
      </Header>

      <Wrapper>
        <Configurations style={{ opacity }}>
          <Configuration>
            <CheckBox
              testID="see-values"
              selected={seeValues}
              onChange={setSeeValues}
            />
            {seeValues ? (
              <Icon
                testID="eye-icon"
                name="eye"
                color={Colors.white}
                size={30}
              />
            ) : (
              <Icon
                testID="eye-icon"
                name="eye-slash"
                color={Colors.graySuperLight}
                size={30}
              />
            )}
          </Configuration>
          <Configuration>
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
          </Configuration>
        </Configurations>

        <SignOut
          style={{ opacity, transform: [{ translateY: offsetBottom.y }] }}
        >
          <TouchableOpacity onPress={signOut}>
            <SignOutText>Sign Out</SignOutText>
          </TouchableOpacity>
        </SignOut>
      </Wrapper>
    </Container>
  );
};

export default Config;
