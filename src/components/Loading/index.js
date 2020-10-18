import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../../providers/ThemeProvider';

const Loading = (props) => {
  const { theme } = useTheme();
  const { style } = props;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={theme.secondaryThemeColor} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Loading.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
