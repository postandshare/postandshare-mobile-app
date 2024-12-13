import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationScreenName from '../constants/NavigationScreenName';
import Sizes from '../constants/Sizes';
import Home from '../screens/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Choose from '../screens/add/pages/Choose';
import BirthdayRemainderNavigator from '../screens/birthday';
import ProfileNavigator from '../screens/profile';
import MyPost from '../screens/mypost';
import {Text} from 'react-native-paper';
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      top: -30,
      width: 60,
    }}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);
const _renderIcon = (focused, routeName, name) => {
  let icon = '';
  switch (routeName) {
    case 'Home':
      icon = 'home-outline';
      break;
    case 'MyPost':
      icon = 'picture';
      break;
    case 'Events':
      icon = 'calendar-outline';
      break;
    case 'Profile':
      icon = 'person-circle-sharp';
      break;
    case 'Choose':
      icon = 'pluscircleo';
      break;
  }

  return (
    <View style={focused ? styles.selectedIcon : null}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {['MyPost', 'Choose'].includes(routeName) ? (
          <AntDesign
            name={icon}
            size={25}
            color={focused ? Colors.PRIMARY : 'gray'}
          />
        ) : (
          <Ionicons
            name={icon}
            size={25}
            color={focused ? Colors.PRIMARY : 'gray'}
          />
        )}
        <Text style={{color: focused ? Colors.PRIMARY : 'gray'}}>{name}</Text>
      </View>
    </View>
  );
};
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: '#0B1F32',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 13,
          right: 13,
          borderRadius: 15,
          backgroundColor: '#fff',
          borderTopColor: '#fff',
          height: 60,
        },
      }}>
      <Tab.Screen
        name={NavigationScreenName.HOME}
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) =>
            _renderIcon(focused, NavigationScreenName.HOME, 'Home'),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.MY_POST}
        component={MyPost}
        options={{
          title: 'My Post',
          tabBarIcon: ({focused}) =>
            _renderIcon(focused, NavigationScreenName.MY_POST, 'My Post'),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.CHOOSE}
        component={Choose}
        options={{
          title: 'Add',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/icons/add_tab_active.png')
                    : require('../assets/icons/add_tab_inactive.png')
                }
                resizeMode="contain"
              />
            </View>
          ),

          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.EVENTS}
        component={BirthdayRemainderNavigator}
        options={{
          title: 'Events',
          tabBarIcon: ({focused}) =>
            _renderIcon(focused, NavigationScreenName.EVENTS, 'Events'),
        }}
      />
      <Tab.Screen
        name={NavigationScreenName.PROFILE}
        component={ProfileNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) =>
            _renderIcon(focused, NavigationScreenName.PROFILE, 'Profile'),
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
