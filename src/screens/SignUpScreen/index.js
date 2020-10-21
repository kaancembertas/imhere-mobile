import React, { useRef } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { images } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button, Touchable } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { register } from '../../redux/actions/userActions';
import { validateEmail } from '../../helpers/validationHelper';

const SignUpScreen = (props) => {
  //Props
  const { navigation } = props;

  //Variables
  const { theme } = useTheme();

  //Redux
  const dispatch = useDispatch();
  const registerProgress = useSelector(({ user }) => user.registerProgress);

  //Refs
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const schoolNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Functions
  const onRegisterSuccess = () => {
    navigation.goBack();
  };
  const onSubmitPress = () => {
    // TODO: IMAGE URL

    const registerBody = {
      no: schoolNumberRef.current.getValue(),
      email: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      name: nameRef.current.getValue(),
      surname: surnameRef.current.getValue(),
      image_url: 'URL FROM MOBILE',
    };
    if (
      registerBody.no == '' ||
      registerBody.email == '' ||
      registerBody.password == '' ||
      registerBody.name == '' ||
      registerBody.surname == ''
    ) {
      Alert.alert('', 'Fill the all inputs correctly!');
      return;
    }

    if (!validateEmail(registerBody.email)) {
      Alert.alert('', 'Enter a valid Email!');
      return;
    }

    dispatch(register(registerBody, onRegisterSuccess));
  };

  const getTextInputRefs = () => {
    return [
      nameRef.current,
      surnameRef.current,
      schoolNumberRef.current,
      emailRef.current,
      passwordRef.current,
    ];
  };

  const onNameSubmit = () => surnameRef.current.focus();
  const onSurnameSubmit = () => schoolNumberRef.current.focus();
  const onSchoolNumberSubmit = () => emailRef.current.focus();
  const onEmailSubmit = () => passwordRef.current.focus();

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
    <KeyboardAwareScrollView
      getTextInputRefs={getTextInputRefs}
      style={[styles.container, _styles.container]}>
      <Touchable style={[styles.cameraContainer, _styles.cameraContainer]}>
        <Image style={styles.cameraIcon} source={images.camera} />
      </Touchable>
      <Label style={styles.uploadText}>Upload your portrait photograph</Label>
      <View style={styles.formContainer}>
        <Label style={styles.inputLabel}>Name</Label>
        <Input
          onSubmit={onNameSubmit}
          autoCapitalize="words"
          ref={nameRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Surname</Label>
        <Input
          onSubmit={onSurnameSubmit}
          autoCapitalize="words"
          ref={surnameRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>School Number</Label>
        <Input
          onSubmit={onSchoolNumberSubmit}
          keyboardType="number-pad"
          ref={schoolNumberRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Email</Label>
        <Input
          onSubmit={onEmailSubmit}
          keyboardType="email-address"
          ref={emailRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Password</Label>
        <Input
          onSubmit={onSubmitPress}
          password
          ref={passwordRef}
          style={styles.input}
        />
      </View>
      <Button
        onPress={onSubmitPress}
        style={styles.submitButton}
        title="Submit"
        loading={registerProgress}
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
    marginTop: convert(15),
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
