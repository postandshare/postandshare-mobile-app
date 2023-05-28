import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/drawer/home/Home';
import Custom from '../screens/drawer/custom/Custom';
import Video from '../screens/drawer/video/Video';
import Profile from '../screens/drawer/profile/Profile';
import ScreenName from '../constants/ScreenName';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen component={Home} name={ScreenName.Home} />
      <Drawer.Screen component={Video} name={ScreenName.Video} />
      <Drawer.Screen component={Custom} name={ScreenName.Custom} />
      <Drawer.Screen component={Profile} name={ScreenName.Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
