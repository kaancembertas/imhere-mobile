/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../assets';
import { convert } from '../../helpers/pixelSizeHelper';
import Label from '../Label';
import Touchable from '../Touchable';

const NavigationHeader = (props) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const { scene, previous } = props;
  const { options, navigation } = scene.descriptor;
  const canGoBack = useMemo(() => previous, []);
  const headerRight = options.headerRight;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const onBackPress = () => {
    if (canGoBack) navigation.goBack();
  };

  const _styles = {
    container: {
      height: convert(44) + insets.top,
      paddingTop: insets.top,
      backgroundColor: theme.secondaryThemeColor,
    },
    title: {
      color: theme.secondaryTextColor,
    },
    titleContainer: {
      top: insets.top,
    },
    headerRightContainer: {
      marginTop: insets.top,
    },
  };

  const BackButton = () => {
    if (!canGoBack) return null;
    return (
      <Touchable
        onPress={onBackPress}
        opacity={0.5}
        style={styles.backButtonContainer}>
        <Image source={icons.backWhite} style={styles.backIcon} />
      </Touchable>
    );
  };

  const HeaderRight = () => {
    if (!headerRight) return null;
    return (
      <View style={[styles.headerRightContainer, _styles.headerRightContainer]}>
        {headerRight}
      </View>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.secondaryThemeColor}
        barStyle="light-content"
      />
      <View style={[styles.container, _styles.container]}>
        <View style={[styles.titleContainer, _styles.titleContainer]}>
          <Label style={[styles.title, _styles.title]}>{title}</Label>
        </View>
        <BackButton />
        <HeaderRight />
      </View>
    </>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backButtonContainer: {
    width: convert(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: convert(35),
    height: convert(35),
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: convert(0.1),
  },
  headerRightContainer: {
    position: 'absolute',
    width: convert(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
