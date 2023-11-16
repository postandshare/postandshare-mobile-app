/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationScreenName from '../constants/NavigationScreenName';
import Sizes from '../constants/Sizes';
import Home from '../screens/Home';
import Images from '../constants/Images';
import Video from '../screens/Video';
import Add from '../screens/Add';
import Custom from '../screens/Custom';
import Profile from '../screens/Profile';
import CustomBottomTab from '../components/BottomTab/CustomBottomTab';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      // screenOptions={{
      //   headerShown: false,
      //   tabBarActiveTintColor: '#0A85FE',
      //   tabBarInactiveTintColor: '#0B1F32',
      //   tabBarStyle: {
      //     display:
      //   //   !schoolDocId ? 'none' :
      //      'flex',
      //     backgroundColor: '#fff',
      //     height: Sizes.hp('8%'),
      //     paddingBottom: Sizes.hp('1%'),
      //     borderTopColor: '#fff',
      //   },
      // }}
      tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name={NavigationScreenName.HOME}
          component={Home}
          options={{
            title: 'Home',
            // tabBarIcon: ({focused}) => (
            //   <Image
            //     source={
            //       focused ? Images.bottomHomeActive : Images.bottomHomeInactive
            //     }
            //     style={styles.ic_img}
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name={NavigationScreenName.VIDEO}
          component={Video}
          options={{
            title: 'Video',
            // tabBarIcon: ({focused}) => (
            //   <Image
            //     source={
            //       focused
            //         ? Images.bottomVideoActive
            //         : Images.bottomVideoInactive
            //     }
            //     style={styles.ic_img}
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name={NavigationScreenName.ADD}
          component={Add}
          options={
            {
              // title: 'Add',
              // tabBarIcon: ({focused}) => (
              //   <Image
              //     source={
              //       focused
              //         ? Images.bottomAdd
              //         : Images.bottomAdd
              //     }
              //     style={styles.ic_img}
              //   />
              // ),
            }
          }
        />
        <Tab.Screen
          name={NavigationScreenName.CUSTOM}
          component={Custom}
          options={{
            title: 'Custom',
            // tabBarIcon: ({focused}) => (
            //   <Image
            //     source={
            //       focused
            //         ? Images.bottomCustomActive
            //         : Images.bottomCustomInactive
            //     }
            //     style={styles.ic_img}
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name={NavigationScreenName.PROFILE}
          component={Profile}
          options={{
            title: 'Profile',
            // tabBarIcon: ({focused}) => (
            //   <Image
            //     source={
            //       focused
            //         ? Images.bottomPorfileActive
            //         : Images.bottomProfileInactive
            //     }
            //     style={styles.ic_img}
            //   />
            // ),
          }}
        />
      </Tab.Group>
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
