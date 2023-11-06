import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import ScreenName from '../constants/ScreenName';
import OnBoarding from '../screens/onBoarding/OnBoarding';
import DrawerNavigation from './DrawerNavigation';
import NavigatorName from '../constants/NavigatorName';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Splash} name={ScreenName.Splash} />
        <Stack.Screen component={OnBoarding} name={ScreenName.OnBoarding} />
        <Stack.Screen
          component={DrawerNavigation}
          name={NavigatorName.DrawerNavigator}
        />
        <Stack.Screen component={Login} name={ScreenName.Login} />
        <Stack.Screen component={Register} name={ScreenName.Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
