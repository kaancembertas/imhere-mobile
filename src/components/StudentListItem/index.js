import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts, icons } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import Touchable from '../Touchable';
import Label from '../Label';

const StudentListItem = (props) => {
  const { theme } = useTheme();
  const {
    style,
    onPress,
    onImagePress,
    id,
    name,
    surname,
    no,
    image_url,
    email,
  } = props;

  const _onPress = () => {
    if (onPress) {
      const params = { id, name, surname, no, image_url, email };
      onPress(params);
    }
  };

  const _onImagePress = () => {
    if (onImagePress) {
      onImagePress(image_url);
    }
  };

  const _styles = {};

  return (
    <Touchable onPress={_onPress} style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        <Touchable onPress={_onImagePress} style={styles.studentImageContainer}>
          <View style={styles.pictureIndicatorContainer}>
            <ActivityIndicator color={theme.primaryTextColor} />
          </View>
          <Image
            resizeMethod="scale"
            source={{ uri: image_url }}
            style={styles.profilePicture}
          />
        </Touchable>
        <View style={styles.studentInfoContainer}>
          <Label>{name + ' ' + surname}</Label>
          <Label style={styles.noLabel}>{no}</Label>
        </View>
      </View>
      <Image style={styles.arrowIcon} source={icons.arrowRight} />
    </Touchable>
  );
};

export default StudentListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convert(100),
    justifyContent: 'center',
    paddingHorizontal: convert(20),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: convert(35),
    height: convert(35),
    position: 'absolute',
    marginRight: convert(8),
    right: 0,
  },
  studentImageContainer: {
    width: convert(60),
    height: convert(60),
    borderRadius: convert(30),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  studentInfoContainer: {
    marginLeft: convert(10),
  },
  noLabel: {
    marginTop: convert(5),
    fontFamily: fonts.Montserrat.Medium,
  },
  pictureIndicatorContainer: {
    position: 'absolute',
  },
  profilePicture: {
    width: convert(60),
    height: convert(60),
    borderRadius: convert(30),
  },
});

StudentListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onImagePress: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string,
  surname: PropTypes.string,
  no: PropTypes.string,
  image_url: PropTypes.string,
  email: PropTypes.string,
};
