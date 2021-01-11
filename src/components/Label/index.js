/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../assets';
import { normalize } from '../../helpers/pixelSizeHelper';

const Label = (props) => {
  const { theme } = useTheme();
  const { style, children } = props;

  const _styles = {
    text: {
      color: theme.primaryTextColor,
    },
  };

  return <Text style={[styles.text, _styles.text, style]}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(15),
    fontFamily: fonts.Montserrat.Bold,
  },
});

Label.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
