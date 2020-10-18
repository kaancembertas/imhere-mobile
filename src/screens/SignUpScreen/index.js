import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button, Touchable } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import imHereApi from '../../api/ImHereApi';

const SignUpScreen = (props) => {
  //Variables
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  //Redux
  const dispatch = useDispatch();

  //Refs
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const schoolNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Functions
  const onSubmitPress = async () => {
    const registerBody = {
      no: schoolNumberRef.current.getValue(),
      email: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      name: nameRef.current.getValue(),
      surname: surnameRef.current.getValue(),
      image_url: 'URL FROM MOBILE',
    };
    const res = await imHereApi.register(registerBody);
    console.log(res);
  };
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
      <Touchable style={[styles.cameraContainer, _styles.cameraContainer]}>
        <Image style={styles.cameraIcon} source={images.camera} />
      </Touchable>
      <Label style={styles.uploadText}>Upload your portrait photograph</Label>
      <View style={styles.formContainer}>
        <Label style={styles.inputLabel}>Name</Label>
        <Input ref={nameRef} style={styles.input} />

        <Label style={styles.inputLabel}>Surname</Label>
        <Input ref={surnameRef} style={styles.input} />

        <Label style={styles.inputLabel}>School Number</Label>
        <Input ref={schoolNumberRef} style={styles.input} />

        <Label style={styles.inputLabel}>E-Mail</Label>
        <Input ref={emailRef} style={styles.input} />

        <Label style={styles.inputLabel}>Password</Label>
        <Input ref={passwordRef} style={styles.input} />
      </View>
      <Button
        onPress={onSubmitPress}
        style={styles.submitButton}
        title="Submit"
        secondary
      />
      <View style={styles.footer} />
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

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
    borderWidth: convert(3),
    marginTop: convert(20),
  },
  cameraIcon: {
    width: convert(50),
    height: convert(50),
  },
  uploadText: {
    marginTop: convert(8),
    alignSelf: 'center',
  },
  inputLabel: {
    marginTop: convert(10),
    marginLeft: convert(43),
  },
  input: {
    marginTop: convert(5),
  },
  formContainer: {
    marginTop: convert(15),
  },
  submitButton: {
    marginTop: convert(20),
  },
  footer: {
    height: convert(40),
  },
});
