/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Touchable = (props) => {
  const { style, children, opacity, onPress, disabled } = props;
  const defaultOpacity = opacity || 0.8;

  const _onPress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      onPress={_onPress}
      activeOpacity={defaultOpacity}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;

Touchable.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  opacity: PropTypes.number,
  onPress: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
};
