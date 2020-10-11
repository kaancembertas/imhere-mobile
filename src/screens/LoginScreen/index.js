import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button } from '../../components';
import { login } from '../../redux/actions/authActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const LoginScreen = (props) => {
  //Variables
  const { theme, changeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { navigation } = props;

  //Refs
  const emailRef = useRef(null);

  //Redux
  const dispatch = useDispatch();

  //Functions
  const onSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const onLoginPress = () => {
    dispatch(login());
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
        source={images.student}
      />
      <View style={styles.formContainer}>
        <Label style={styles.studentNoLabel}>E-Mail</Label>
        <Input ref={emailRef} style={styles.input} />

        <Label style={styles.passwordLabel}>Password</Label>
        <Input style={styles.input} />

        <Button
          style={styles.loginButton}
          title="Login"
          onPress={onLoginPress}
        />
      </View>

      <Button
        secondary
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
    width: convert(175),
    height: convert(175),
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
