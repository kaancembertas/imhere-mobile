import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts, icons } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import Touchable from '../Touchable';
import Label from '../Label';

const ClassListItem = (props) => {
  const { theme } = useTheme();
  const { style, name, code, instructor, onPress } = props;

  const _onPress = () => {
    if (onPress) {
      const param = { name, code, instructor };
      onPress(param);
    }
  };

  const _styles = {
    instructorLabel: {
      color: theme.teriateryColor,
    },
  };

  return (
    <Touchable onPress={_onPress} style={[styles.container, style]}>
      <Label>{name}</Label>
      <Label style={[styles.classCodeLabel]}>{code}</Label>
      <Label style={[styles.instructorLabel, _styles.instructorLabel]}>
        {instructor}
      </Label>
      <Image style={styles.arrowIcon} source={icons.arrowRight} />
    </Touchable>
  );
};

export default ClassListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convert(100),
    justifyContent: 'center',
    paddingHorizontal: convert(20),
  },
  classCodeLabel: {
    marginTop: convert(5),
    fontFamily: fonts.Montserrat.Medium,
    letterSpacing: convert(1),
    fontSize: normalize(13),
  },
  instructorLabel: {
    marginTop: convert(15),
    fontFamily: fonts.Montserrat.Medium,
  },
  arrowIcon: {
    width: convert(35),
    height: convert(35),
    position: 'absolute',
    marginRight: convert(8),
    right: 0,
  },
});

ClassListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  code: PropTypes.string,
  instructor: PropTypes.string,
  onPress: PropTypes.func,
};
