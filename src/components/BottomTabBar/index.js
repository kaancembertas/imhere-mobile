import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { convert } from '../../helpers/pixelSizeHelper';
import { useTheme } from '../../providers/ThemeProvider';
import { icons } from '../../assets';
import Seperator from '../Seperator';
import Touchable from '../Touchable';
import { screen } from '../../config/constants';

const BottomTabBar = ({ state, navigation }) => {
  //Variables
  const tabWidth = screen.width / state.routes.length;

  //Animated
  const animatedTabX = useRef(new Animated.Value(0)).current;

  //Uses
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  //Effects
  useEffect(() => {
    Animated.spring(animatedTabX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  //Functions
  const getIconSource = (routeName, isFocused) => {
    if (isFocused) {
      if (routeName === 'ClassesScreen') return icons.classWhite;
      if (routeName === 'ProfileScreen') return icons.personWhite;
    } else {
      if (routeName === 'ClassesScreen') return icons.classBlack;
      if (routeName === 'ProfileScreen') return icons.personBlack;
    }
    return null;
  };

  //Conditional Style
  const _styles = {
    container: {
      height: insets.bottom + convert(50),
      paddingBottom: insets.bottom,
      backgroundColor: theme.primaryThemeColor,
    },
    tabAnimation: {
      width: tabWidth - convert(40),
      backgroundColor: theme.secondaryThemeColor,
      transform: [{ translateX: animatedTabX }],
    },
  };

  const renderTabButton = useCallback((route, index) => {
    const isFocused = state.index === index;

    const onTabButtonPress = () => {
      if (isFocused) return;
      navigation.navigate(route.name);
    };

    return (
      <Touchable
        onPress={onTabButtonPress}
        key={route.key}
        style={[styles.tabButton, _styles.tabButton]}>
        <Image
          style={styles.tabIcon}
          source={getIconSource(route.name, isFocused)}
        />
      </Touchable>
    );
  });

  return (
    <View style={[styles.container, _styles.container]}>
      <Seperator />
      <View style={styles.tabsContainer}>
        <Animated.View style={[styles.tabAnimation, _styles.tabAnimation]} />
        {state.routes.map(renderTabButton)}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    height: convert(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: convert(30),
    height: convert(30),
  },
  tabAnimation: {
    alignSelf: 'center',
    height: convert(40),
    borderRadius: convert(30),
    marginLeft: convert(20),
    position: 'absolute',
    left: 0,
  },
});
