import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { convert } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { register } from '../../redux/actions/userActions';
import { validateEmail } from '../../helpers/validationHelper';
import ProfilePictureTouchable from '../../components/ProfilePictureTouchable';
import { uploadUserPicture } from '../../helpers/firebaseHelper';
import ImHereApi from '../../api/ImHereApi';

const SignUpScreen = (props) => {
  //Props
  const { navigation } = props;

  //Variables
  const { theme } = useTheme();

  //Redux
  const dispatch = useDispatch();
  const registerProgress = useSelector(({ user }) => user.registerProgress);

  //State
  const [isImageUploading, setImageUploading] = useState(false);

  //Refs
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const schoolNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Functions
  const onNameSubmit = () => surnameRef.current.focus();
  const onSurnameSubmit = () => schoolNumberRef.current.focus();
  const onSchoolNumberSubmit = () => emailRef.current.focus();
  const onEmailSubmit = () => passwordRef.current.focus();

  const onRegisterSuccess = () => {
    navigation.goBack();
  };

  const checkEmailExists = async (email) => {
    const response = await ImHereApi.checkEmailExists(email);
    if (!response.success) return true;
    return response.data.isExists;
  };

  const onSubmitPress = async () => {
    const imagePath = imageRef.current.getImage();

    const registerBody = {
      no: schoolNumberRef.current.getValue(),
      email: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      name: nameRef.current.getValue(),
      surname: surnameRef.current.getValue(),
    };

    if (imagePath === null) {
      Alert.alert('', 'Upload your profile picture');
      return;
    }

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

    try {
      setImageUploading(true);
      const isEmailExists = await checkEmailExists(registerBody.email);

      if (isEmailExists) {
        Alert.alert('', 'Already registered with this Email!');
        setImageUploading(false);
        return;
      }
      const image_url = await uploadUserPicture(imagePath, registerBody.email);
      registerBody['image_url'] = image_url;
      console.log(registerBody);
      dispatch(register(registerBody, onRegisterSuccess));
      setImageUploading(false);
    } catch (err) {
      console.log(['[SignUpScreen - onSubmitPress]', err]);
      setImageUploading(false);
    }
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

  //Conditional Style
  const _styles = {
    container: {
      backgroundColor: theme.primaryThemeColor,
    },
  };

  return (
    <KeyboardAwareScrollView
      getTextInputRefs={getTextInputRefs}
      style={[styles.container, _styles.container]}>
      <ProfilePictureTouchable ref={imageRef} style={styles.profilePicture} />
      <Label style={styles.uploadText}>Upload your portrait photograph</Label>
      <View style={styles.formContainer}>
        <Label style={styles.inputLabel}>Name</Label>
        <Input
          maxLength={50}
          onSubmit={onNameSubmit}
          autoCapitalize="words"
          ref={nameRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Surname</Label>
        <Input
          maxLength={50}
          onSubmit={onSurnameSubmit}
          autoCapitalize="words"
          ref={surnameRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>School Number</Label>
        <Input
          maxLength={9}
          onSubmit={onSchoolNumberSubmit}
          keyboardType="number-pad"
          ref={schoolNumberRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Email</Label>
        <Input
          maxLength={50}
          onSubmit={onEmailSubmit}
          keyboardType="email-address"
          ref={emailRef}
          style={styles.input}
        />

        <Label style={styles.inputLabel}>Password</Label>
        <Input
          maxLength={60}
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
        loading={registerProgress || isImageUploading}
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
  profilePicture: {
    marginTop: convert(20),
  },
});
