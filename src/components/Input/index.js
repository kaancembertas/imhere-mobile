import React, { useState, forwardRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import { TextInput } from 'react-native-gesture-handler';

const Input = (props, ref) => {
  const { theme } = useTheme();
  const { style, autoCapitalize, value, disabled } = props;

  const [inputValue, setInputValue] = useState(value || '');

  const getValue = () => inputValue;

  if (ref) {
    ref.current = {
      getValue,
    };
  }

  const _styles = {
    input: {
      backgroundColor: theme.primaryThemeColor,
      borderColor: hexToRgba(theme.secondaryThemeColor, 0.5),
      opacity: disabled ? 0.6 : 1,
    },
  };

  return (
    <TextInput
      editable={!disabled}
      defaultValue={value}
      onChangeText={setInputValue}
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
};
