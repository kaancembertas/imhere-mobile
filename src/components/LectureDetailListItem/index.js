import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts, icons } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { useSelector } from 'react-redux';
import Label from '../Label';
import Touchable from '../Touchable';
import { ENTITY } from '../../config/api';

const LectureDetailListItem = (props) => {
  const { theme } = useTheme();
  /* 
  Status
  0 - Not Processed
  1 - Joined
  2 - Not Joined
  */
  const { style, status, week, date, onPress, disableCameraIcon } = props;
  const userRole = useSelector(({ user }) => user.info.role);

  const isClickable =
    userRole === ENTITY.USER.INSTRUCTOR &&
    !disableCameraIcon &&
    status === ENTITY.ATTENDENCE.NOT_PROCESSED;

  const _onPress = () => {
    if (userRole === ENTITY.USER.INSTRUCTOR && onPress) {
      onPress(week);
    }
  };

  const StatusBox = () => {
    if (status === 0) {
      if (!disableCameraIcon && userRole === ENTITY.USER.INSTRUCTOR)
        return (
          <Image
            resizeMethod="scale"
            style={styles.cameraIcon}
            source={icons.camera}
          />
        );
      return <Label style={styles.notProcessedLabel}>-</Label>;
    }
    return (
      <Image
        resizeMethod="scale"
        style={styles.icon}
        source={status === 1 ? icons.tick : icons.cross}
      />
    );
  };

  return (
    <Touchable
      onPress={_onPress}
      opacity={isClickable ? 0.8 : 1}
      style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        <Label>Week {week}</Label>
        <Label style={[styles.dateLabel]}>{date}</Label>
      </View>
      <StatusBox />
    </Touchable>
  );
};

export default LectureDetailListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convert(80),
    paddingHorizontal: convert(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateLabel: {
    fontFamily: fonts.Montserrat.Medium,
    marginTop: convert(10),
    fontSize: normalize(13),
  },
  leftContainer: {
    justifyContent: 'center',
  },
  icon: {
    width: convert(30),
    height: convert(30),
  },
  notProcessedLabel: {
    fontFamily: fonts.Montserrat.Medium,
    fontSize: normalize(30),
    marginRight: convert(6),
  },
  cameraIcon: {
    width: convert(30),
    height: convert(30),
  },
});

LectureDetailListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  status: PropTypes.oneOf([0, 1, 2]),
  week: PropTypes.number,
  date: PropTypes.string,
  onPress: PropTypes.func,
  disableCameraIcon: PropTypes.bool,
};
