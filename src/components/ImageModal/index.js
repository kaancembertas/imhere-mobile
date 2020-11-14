import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';
import Modal from 'react-native-modal';
import { fonts, icons, images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { hexToRgba } from '../../helpers/colorHelper';
import Touchable from '../Touchable';

const ImageModal = (props, ref) => {
  const [isVisible, setVisible] = useState(false);
  const [source, setSource] = useState(null);
  const { theme } = useTheme();
  const { style } = props;

  const show = (source) => {
    setSource(source);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  if (ref) {
    ref.current = {
      show,
    };
  }

  const _styles = {
    closeIconContainer: {
      backgroundColor: hexToRgba(theme.secondaryThemeColor, 0.7),
    },
    contentContainer: {
      backgroundColor: hexToRgba('#303030', 1),
    },
  };

  return (
    <Modal
      hasBackdrop={true}
      style={styles.modalContainer}
      coverScreen={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={isVisible}>
      <View style={[styles.contentContainer, _styles.contentContainer, style]}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={source}
          style={styles.image}
        />
        <Touchable
          onPress={close}
          style={[styles.closeIconContainer, _styles.closeIconContainer]}>
          <Image source={icons.close} style={styles.closeIcon} />
        </Touchable>
      </View>
    </Modal>
  );
};

export default forwardRef(ImageModal);

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  contentContainer: {
    width: convert(300),
    height: convert(300),
    borderRadius: convert(10),
    overflow: 'hidden',
  },
  closeIconContainer: {
    width: convert(30),
    height: convert(30),
    borderRadius: convert(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: convert(10),
    marginRight: convert(10),
  },
  closeIcon: {
    width: convert(30),
    height: convert(30),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

ImageModal.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
