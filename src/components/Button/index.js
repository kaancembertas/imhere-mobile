import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import Touchable from '../Touchable';
import Label from '../Label';

const Button = (props) => {
  const { theme } = useTheme();
  const { style, title, onPress, secondary, loading, disabled } = props;

  const _styles = {
    container: {
      borderColor: hexToRgba(theme.secondaryThemeColor, 0.5),
      borderWidth: !secondary ? 1 : 0,
      backgroundColor: !secondary
        ? theme.primaryThemeColor
        : theme.secondaryThemeColor,
    },
    title: {
      color: !secondary ? theme.primaryTextColor : theme.secondaryTextColor,
    },
  };

  const loadingColor = secondary
    ? theme.primaryThemeColor
    : theme.secondaryThemeColor;

  return (
    <Touchable
      disabled={loading || disabled}
      opacity={loading || disabled ? 1 : 0.8}
      onPress={onPress}
      style={[styles.container, _styles.container, style]}>
      {loading ? (
        <ActivityIndicator color={loadingColor} />
      ) : (
        <Label style={_styles.title}>{title}</Label>
      )}
    </Touchable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: convert(290),
    height: convert(40),
    borderRadius: convert(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  onPress: PropTypes.func,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
