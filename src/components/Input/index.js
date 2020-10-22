import React, { useState, forwardRef, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import { TextInput } from 'react-native-gesture-handler';

const Input = (props, ref) => {
  const { theme } = useTheme();
  const {
    style,
    autoCapitalize,
    value,
    disabled,
    onChangeValue,
    keyboardType,
    password,
    onSubmit,
    returnKeyType,
  } = props;

  const [inputValue, setInputValue] = useState(value || '');
  const inputRef = useRef(null);

  const _onChangeValue = (text) => {
    setInputValue(text);
    if (onChangeValue) onChangeValue(text);
  };

  const _onSubmit = () => {
    if (onSubmit) onSubmit();
  };

  const focus = () => {
    inputRef.current.focus();
  };

  const isFocused = () => {
    inputRef.current.isFocused();
  };

  const getValue = () => inputValue.trim();

  if (ref) {
    ref.current = {
      getValue,
      focus,
      isFocused,
    };
  }

  const _styles = {
    input: {
      backgroundColor: theme.primaryThemeColor,
      borderColor: hexToRgba(theme.secondaryThemeColor, 0.5),
      color: hexToRgba(theme.primaryTextColor, disabled ? 0.4 : 1),
    },
  };

  return (
    <TextInput
      returnKeyType={returnKeyType || 'next'}
      ref={inputRef}
      onSubmitEditing={_onSubmit}
      secureTextEntry={password}
      keyboardType={keyboardType || 'default'}
      editable={!disabled}
      defaultValue={value}
      onChangeText={_onChangeValue}
      value={inputValue}
      autoCapitalize={autoCapitalize || 'none'}
      style={[styles.input, _styles.input, style]}
    />
  );
};

export default forwardRef(Input);

const styles = StyleSheet.create({
  input: {
    width: convert(290),
    height: convert(40),
    borderRadius: convert(10),
    borderWidth: 1,
    paddingLeft: convert(10),
    alignSelf: 'center',
    borderStyle: 'solid',
    fontFamily: fonts.Montserrat.Medium,
    fontSize: normalize(15),
  },
});

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  autoCapitalize: PropTypes.oneOf(['characters', 'none', 'sentences', 'words']),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeValue: PropTypes.func,
  password: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
};
