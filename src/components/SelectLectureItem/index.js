/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts, icons } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import Touchable from '../Touchable';
import Label from '../Label';

const SelectLectureItem = (props) => {
  const { theme } = useTheme();
  const { style, lectureName, lectureCode, lectureInstructor, onPress } = props;
  const [isSelected, setSelected] = useState(false);

  const _onPress = () => {
    if (onPress) onPress(lectureCode, !isSelected);
    setSelected((x) => !x);
  };

  const _styles = {
    instructorLabel: {
      color: theme.secondaryDarkColor,
    },
    container: {
      borderColor: hexToRgba(theme.secondaryThemeColor, 0.9),
    },
    rightContainer: {
      borderColor: theme.secondaryThemeColor,
      backgroundColor: isSelected
        ? theme.secondaryThemeColor
        : theme.primaryThemeColor,
    },
  };

  return (
    <Touchable
      onPress={_onPress}
      style={[styles.container, _styles.container, style]}>
      <Label>{lectureName}</Label>
      <Label style={[styles.classCodeLabel]}>{lectureCode}</Label>
      <Label style={[styles.instructorLabel, _styles.instructorLabel]}>
        {lectureInstructor}
      </Label>
      <View style={[styles.rightContainer, _styles.rightContainer]}>
        {isSelected && (
          <Image source={icons.checkWhite} style={styles.checkIcon} />
        )}
      </View>
    </Touchable>
  );
};

export default SelectLectureItem;

const styles = StyleSheet.create({
  container: {
    width: convert(350),
    height: convert(100),
    justifyContent: 'center',
    paddingHorizontal: convert(20),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: convert(10),
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
  rightContainer: {
    position: 'absolute',
    right: 0,
    marginRight: convert(15),
    width: convert(30),
    height: convert(30),
    borderRadius: convert(20),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: convert(25),
    height: convert(25),
  },
});

SelectLectureItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  lectureName: PropTypes.string,
  lectureCode: PropTypes.string,
  lectureInstructor: PropTypes.string,
  onPress: PropTypes.func,
};
