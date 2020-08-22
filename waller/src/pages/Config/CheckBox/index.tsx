import React, { useState, useCallback, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import { Container, Pointer } from './styles';

interface CheckBoxProps extends TouchableWithoutFeedbackProps {
  selected: boolean;
  onChange: (data: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ selected, onChange, ...rest }) => {
  const [selectedState, setSelectedState] = useState(selected);

  const [position] = useState(new Animated.Value(0));

  const animate = useCallback(() => {
    if (selectedState) {
      Animated.timing(position, {
        toValue: 25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: -6,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [position, selectedState]);

  useEffect(() => animate(), [animate]);

  const onPress = useCallback(() => {
    animate();

    onChange(!selectedState);

    setSelectedState(!selectedState);
  }, [animate, selectedState, onChange]);

  return (
    <TouchableWithoutFeedback onPress={onPress} {...rest}>
      <Container selected={selectedState}>
        <Pointer
          selected={selectedState}
          style={{
            transform: [{ translateX: position }],
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default CheckBox;
