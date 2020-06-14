import React, {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  useEffect,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Colors } from '../../styles';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRefence {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueRefence>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current?.value);
  }, []);

  // useImperativeHandle(ref, () => ({
  //   focus() {
  //     inputElementRef.current.focus();
  //   },
  // }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? Colors.primary : Colors.grayLight}
      />

      <TextInput
        ref={inputElementRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        keyboardAppearance="dark"
        placeholderTextColor={Colors.grayLight}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
