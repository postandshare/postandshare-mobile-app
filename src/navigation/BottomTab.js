/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationScreenName from '../constants/NavigationScreenName';
import Sizes from '../constants/Sizes';
import Home from '../screens/Home';
import Images from '../constants/images';
import Video from '../screens/Video';
import Add from '../screens/Add';
import Custom from '../screens/Custom';
import Profile from '../screens/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0A85FE',
        tabBarInactiveTintColor: '#0B1F32',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#fff',
          height: Sizes.hp('8%'),
          paddingBottom: Sizes.hp('1%'),
          borderTopColor: '#fff',
        },
      }}>
      <Tab.Screen
        name={NavigationScreenName.HOME}
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <AntDesign name="home" size={focused ? 26 : 24} color={focused ? '#0A85FE' : '#0B1F32'} />
          ),
        }}
      />
      {/* video screen for the future release */}
      {/* <Tab.Screen
        name={NavigationScreenName.VIDEO}
        component={Video}
        options={{
          title: 'Video',
          tabBarIcon: ({focused}) => (
            <AntDesign name="videocamera" size={focused ? 26 : 24} color={focused ? '#0A85FE' : '#0B1F32'} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={NavigationScreenName.ADD}
        component={Add}
        options={{
          title: 'Add',
          tabBarIcon: ({focused}) => (
           <AntDesign name="pluscircleo" size={focused ? 26 : 24} color={focused ? '#0A85FE' : '#0B1F32'} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.CUSTOM}
        component={Custom}
        options={{
          title: 'Custom',
          tabBarIcon: ({focused}) => (
           <AntDesign name="appstore-o" size={focused ? 26 : 24} color={focused ? '#0A85FE' : '#0B1F32'} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={NavigationScreenName.PROFILE}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? Images.bottomPorfileActive
                  : Images.bottomProfileInactive
              }
              style={styles.ic_img}
            />
          ),
        }}
      /> */}
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
