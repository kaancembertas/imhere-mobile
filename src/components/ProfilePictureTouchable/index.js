/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, { forwardRef, useState } from 'react';
import { StyleSheet, Image, ActivityIndicator, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import { images } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import Touchable from '../Touchable';
import { showImagePicker } from '../../helpers/imageHelper';

const ProfilePictureTouchable = (props, ref) => {
  const { theme } = useTheme();
  const { style } = props;

  //State
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Functions
  const onCameraPress = async () => {
    try {
      setLoading(true);
      const image = await showImagePicker(400);
      setImage(image);
      setLoading(false);
    } catch (err) {
      console.log('[ProfilePictureTouchable]', err);
      setImage(null);
      setLoading(false);
    }
  };

  const getImage = () => image;

  // Export ref
  if (ref != null) {
    ref.current = {
      getImage,
    };
  }

  const _styles = {
    cameraContainer: {
      borderColor: theme.secondaryThemeColor,
      backgroundColor: theme.primaryThemeColor,
    },
  };

  return (
    <Touchable
      disabled={loading}
      onPress={onCameraPress}
      style={[styles.cameraContainer, _styles.cameraContainer, style]}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.secondaryDarkColor} />
      ) : (
        <Image
          width={convert(110)}
          height={convert(110)}
          resizeMethod="scale"
          style={image === null ? styles.cameraIcon : styles.profilePicture}
          source={image === null ? images.camera : image}
        />
      )}
    </Touchable>
  );
};

export default forwardRef(ProfilePictureTouchable);

const styles = StyleSheet.create({
  cameraContainer: {
    width: convert(120),
    height: convert(120),
    borderRadius: convert(60),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: convert(3),
  },
  cameraIcon: {
    width: convert(50),
    height: convert(50),
  },
  profilePicture: {
    width: convert(110),
    height: convert(110),
    borderRadius: convert(55),
  },
});

ProfilePictureTouchable.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
