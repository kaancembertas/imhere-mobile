import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationHeader from './components/NavigationHeader';
import BottomTabBar from './components/BottomTabBar';
import { useAuthentication } from './providers/AuthenticationProvider';
import SCREENS from './screens';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: NavigationHeader,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={SCREENS.LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SCREENS.SignUpScreen}
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const isSelectedLecture = useSelector(
    ({ user }) => user.info.isSelectedLecture,
  );

  if (!isSelectedLecture) {
    return (
      <Stack.Navigator
        screenOptions={{
          header: NavigationHeader,
        }}>
        <Stack.Screen
          name="SelectLecturesScreen"
          component={SCREENS.SelectLecturesScreen}
          options={{
            title: 'Select your lectures',
          }}
        />
      </Stack.Navigator>
    );
  }

  const AppTab = () => (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="LecturesScreen">
      <Tab.Screen name="LecturesScreen" component={SCREENS.LecturesScreen} />
      <Tab.Screen name="ProfileScreen" component={SCREENS.ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator
      initialRouteName="AppTab"
      headerMode="screen"
      screenOptions={{
        header: NavigationHeader,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        title: "I'm here!",
      }}>
      <Stack.Screen name="AppTab" component={AppTab} />
      <Stack.Screen
        name="LectureDetailScreen"
        component={SCREENS.LectureDetailScreen}
      />
      <Stack.Screen
        name="StudentListScreen"
        component={SCREENS.StudentListScreen}
        options={{
          title: 'Student List',
        }}
      />
      <Stack.Screen
        name="StudentDetailScreen"
        component={SCREENS.StudentDetailScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuthentication();
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
