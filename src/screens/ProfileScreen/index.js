import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts, images } from '../../assets';
import { convert, normalize } from '../../helpers/pixelSizeHelper';
import { Label, Input, Button } from '../../components';
import { ENTITY } from '../../config/api';
import { logout } from '../../redux/actions/authActions';

const ProfileScreen = (props) => {
  //Redux
  const dispatch = useDispatch();
  const userInfo = useSelector(({ user }) => user.info);

  //Variables
  const { navigation } = props;
  const { theme, changeTheme } = useTheme();
  const userRoleText =
    userInfo.role === ENTITY.USER.STUDENT ? 'Student' : 'Instructor';

  //Functions
  const onLogoutPress = () => {
    dispatch(logout());
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
    userRoleText: {
      color: theme.teriateryColor,
    },
    logoutButton: {
      backgroundColor: theme.secondaryDarkColor,
    },
  };

  return (
    <KeyboardAwareScrollView style={[styles.container, _styles.container]}>
      <View style={[styles.cameraContainer, _styles.cameraContainer]}>
        <Image style={styles.profilePicture} source={images.kaan} />
      </View>
      <Label style={[styles.userRoleText, _styles.userRoleText]}>
        {userRoleText}
      </Label>

      <View style={styles.formContainer}>
        <Label style={styles.inputLabel}>Name</Label>
        <Input style={styles.input} value={userInfo.name} disabled />

        <Label style={styles.inputLabel}>Surname</Label>
        <Input style={styles.input} value={userInfo.surname} disabled />
        {userInfo.role === ENTITY.USER.STUDENT && (
          <>
            <Label style={styles.inputLabel}>School Number</Label>
            <Input style={styles.input} value={userInfo.no} disabled />
          </>
        )}

        <Label style={styles.inputLabel}>E-Mail</Label>
        <Input style={styles.input} value={userInfo.email} disabled />
      </View>
      <Button
        onPress={onLogoutPress}
        secondary
        style={[styles.logoutButton, _styles.logoutButton]}
        title="Logout"
      />
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
  userRoleText: {
    alignSelf: 'center',
    marginTop: convert(5),
    fontFamily: fonts.Montserrat.Medium,
    fontSize: normalize(20),
  },
  logoutButton: {
    marginTop: convert(30),
  },
});
