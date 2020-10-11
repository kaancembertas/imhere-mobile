import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button, Touchable } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const ProfileScreen = (props) => {
  //Variables
  const { navigation } = props;
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  //Redux
  const dispatch = useDispatch();

  //Functions

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
    cameraContainer: {
      borderColor: theme.secondaryThemeColor,
      backgroundColor: theme.primaryThemeColor,
    },
  };

  return (
    <KeyboardAwareScrollView style={[styles.container, _styles.container]}>
      <View style={[styles.cameraContainer, _styles.cameraContainer]}>
        <Image style={styles.profilePicture} source={images.kaan} />
      </View>

      <View style={styles.formContainer}>
        <Label style={styles.inputLabel}>Name</Label>
        <Input style={styles.input} value="Kaan" disabled />

        <Label style={styles.inputLabel}>Surname</Label>
        <Input style={styles.input} value="Çembertaş" disabled />

        <Label style={styles.inputLabel}>School Number</Label>
        <Input style={styles.input} value="200001684" disabled />

        <Label style={styles.inputLabel}>E-Mail</Label>
        <Input style={styles.input} value="kaancembertas@gmail.com" disabled />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    width: convert(120),
    height: convert(120),
    borderRadius: convert(60),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: convert(2),
    marginTop: convert(30),
  },
  profilePicture: {
    width: convert(110),
    height: convert(110),
    borderRadius: convert(60),
  },
  inputLabel: {
    marginTop: convert(15),
    marginLeft: convert(43),
  },
  input: {
    marginTop: convert(5),
  },
  formContainer: {
    marginTop: convert(20),
  },
});
