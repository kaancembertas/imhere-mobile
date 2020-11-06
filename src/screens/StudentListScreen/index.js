import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button, StudentListItem } from '../../components';

const StudentListScreen = (props) => {
  //Variables
  const { navigation } = props;
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  //Redux
  const dispatch = useDispatch();

  //Functions

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
  };

  return (
    <View style={[styles.container, _styles.container]}>
      <StudentListItem name="deneme" surname="deneme" no="deneme" />
    </View>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
