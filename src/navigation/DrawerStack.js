import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerRight from '../components/CustomDrawerRight';
import NavigationScreenName from '../constants/NavigationScreenName';
import BottomTab from './BottomTab';
import PhotoStatus from '../screens/photo';
import Events from '../screens/evemt';
import Wallpaper from '../screens/wallpaper';
import Colors from '../constants/Colors';
import TermAndCondtion from '../screens/term&condition';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Privacy from '../screens/privacy';
import Tutorial from '../screens/tutorials';
import MyBussinessNavigator from '../screens/mybussiness';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <LeftDrawer.Navigator
      id="leftDrawer"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerContentStyle: {},
      }}
      //   drawerContent={({navigation}) => (
      //     <CustomDrawer navigation={navigation} />
      //   )}
    >
      <LeftDrawer.Screen
        name={NavigationScreenName.BOTOOM_TAB_NAVIGATOR}
        component={BottomTab}
      />
      <LeftDrawer.Screen
        name={NavigationScreenName.PHOTOS_STATUS}
        component={PhotoStatus}
      />
      <LeftDrawer.Screen
        name={NavigationScreenName.EVENTS}
        component={Events}
      />
      <LeftDrawer.Screen
        name={NavigationScreenName.WALLPAPER}
        component={Wallpaper}
      />
    </LeftDrawer.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <RightDrawer.Navigator
      id="rightDrawer"
      s
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerContentStyle: {
          backgroundColor: Colors.Background,
        },
      }}>
      <RightDrawer.Screen
        name="Profile Section"
        component={MainDrawer}
        options={{
          title: 'Dashboard',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
        }}
      />
      <RightDrawer.Screen
        name="Term & Conditions"
        component={TermAndCondtion}
        options={{
          title: 'Term & Conditions',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: ({focused}) => (
            <AntDesign
              name="filetext1"
              size={24}
              color={focused ? Colors.white : Colors.text1}
            />
          ),
        }}
      />
      <RightDrawer.Screen
        name="Privacy Policy"
        component={Privacy}
        options={{
          title: 'Privacy Policy',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: ({focused}) => (
            <AntDesign
              name="filetext1"
              size={24}
              color={focused ? Colors.white : Colors.text1}
            />
          ),
        }}
      />
      <RightDrawer.Screen
        name="Tutorial"
        component={Tutorial}
        options={{
          title: 'Tutorial',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: ({focused}) => (
            <AntDesign
              name="filetext1"
              size={24}
              color={focused ? Colors.white : Colors.text1}
            />
          ),
        }}
      />
      <RightDrawer.Screen
        name="My Bussiness"
        component={MyBussinessNavigator}
        options={{
          title: 'My Bussiness',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: ({focused}) => (
            <AntDesign
              name="filetext1"
              size={24}
              color={focused ? Colors.white : Colors.text1}
            />
          ),
        }}
      />
    </RightDrawer.Navigator>
  );
};

export default DrawerStack;
