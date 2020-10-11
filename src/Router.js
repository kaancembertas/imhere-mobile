import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationHeader from './components/NavigationHeader';
import BottomTabBar from './components/BottomTabBar';
import { useSelector } from 'react-redux';
import SCREENS from './screens';

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

const StudentStack = () => {
  const StudentTab = () => (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="ClassesScreen">
      <Tab.Screen name="ClassesScreen" component={SCREENS.ClassesScreen} />
      <Tab.Screen name="ProfileScreen" component={SCREENS.ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator
      initialRouteName="StudentTab"
      headerMode="screen"
      screenOptions={{
        header: NavigationHeader,
        title: "I'm here!",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="StudentTab" component={StudentTab} />
      <Stack.Screen
        name="ClassDetailScreen"
        component={SCREENS.ClassDetailScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? <StudentStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
