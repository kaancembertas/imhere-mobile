import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const LoadingModal = (props, ref) => {
  const [isVisible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  if (ref) {
    ref.current = { show, hide };
  }

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      coverScreen={true}
      style={styles.modalContainer}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};

export default forwardRef(LoadingModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LoadingModal.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
