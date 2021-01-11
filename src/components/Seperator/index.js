/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';

const Seperator = (props) => {
  const { style } = props;

  return <View style={[styles.seperator, style]} />;
};

export default Seperator;

const styles = StyleSheet.create({
  seperator: {
    borderBottomWidth: convert(1),
    borderBottomColor: 'black',
    opacity: 0.12,
  },
});

Seperator.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
