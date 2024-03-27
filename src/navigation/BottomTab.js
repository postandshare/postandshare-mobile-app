/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationScreenName from '../constants/NavigationScreenName';
import Sizes from '../constants/Sizes';
import Home from '../screens/Home';
import Add from '../screens/Add';
import Custom from '../screens/Custom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddNavigatior from '../screens/add/index';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0A85FE',
        tabBarInactiveTintColor: '#0B1F32',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#fff',
          borderTopColor: '#fff',
        },
      }}>
      <Tab.Screen
        name={NavigationScreenName.HOME}
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="home"
              size={focused ? 24 : 24}
              color={focused ? '#0A85FE' : '#0B1F32'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.ADD_NAVIGATOR}
        component={AddNavigatior}
        options={{
          title: 'Add',
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="pluscircleo"
              size={focused ? 24 : 24}
              color={focused ? '#0A85FE' : '#0B1F32'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.CUSTOM}
        component={Custom}
        options={{
          title: 'Custom',
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="appstore-o"
              size={focused ? 24   : 24}
              color={focused ? '#0A85FE' : '#0B1F32'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  ic_img: {
    height: Sizes.hp('4%'),
    resizeMode: 'contain',
  },
});
