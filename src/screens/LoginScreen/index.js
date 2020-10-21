import React, { useRef } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { validateEmail } from '../../helpers/validationHelper';
import { useAuthentication } from '../../providers/AuthenticationProvider';

const LoginScreen = (props) => {
  // Variables
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { navigation } = props;

  // Uses
  const { authProgress, authenticate } = useAuthentication();

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Functions
  const onSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const onLoginPress = () => {
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();

    if (email == '' || password == '') {
      Alert.alert('', 'Please enter Email and Password correctly');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('', 'Enter a valid Email!');
      return;
    }
    authenticate(email, password);
  };

  const onEmailSubmit = () => {
    passwordRef.current.focus();
  };

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
      paddingTop: insets.top,
    },
  };

  return (
    <KeyboardAwareScrollView style={[styles.container, _styles.container]}>
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        style={styles.loginImage}
        source={images.logo}
      />
      <View style={styles.formContainer}>
        <Label style={styles.studentNoLabel}>Email</Label>
        <Input
          onSubmit={onEmailSubmit}
          keyboardType="email-address"
          ref={emailRef}
          style={styles.input}
        />

        <Label style={styles.passwordLabel}>Password</Label>
        <Input
          onSubmit={onLoginPress}
          ref={passwordRef}
          password
          style={styles.input}
        />

        <Button
          style={styles.loginButton}
          title="Login"
          onPress={onLoginPress}
          loading={authProgress}
          secondary
        />
      </View>

      <Button
        style={styles.signUpButton}
        title="Sign Up"
        onPress={onSignUpPress}
      />
      <View style={styles.footer} />
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginImage: {
    width: convert(200),
    height: convert(200),
    alignSelf: 'center',
    marginTop: convert(40),
  },
  formContainer: {
    marginHorizontal: convert(42),
  },
  studentNoLabel: {
    marginTop: convert(50),
  },
  input: {
    marginTop: convert(5),
  },
  passwordLabel: {
    marginTop: convert(20),
  },
  loginButton: {
    marginTop: convert(30),
  },
  signUpButton: {
    marginTop: convert(30),
  },
  footer: {
    height: convert(40),
  },
});
