import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BirthdayRemainderNavigator from '../screens/birthday';
import PhotoSDK from '../screens/sdk';
import CustomDrawerLeft from '../components/CustomDrawerLeft';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <LeftDrawer.Navigator
      id="leftDrawer"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerContentStyle: {
          backgroundColor: '#f5f5ff',
        },
      }}
      drawerContent={({navigation}) => (
        <CustomDrawerLeft navigation={navigation} />
      )}>
      <LeftDrawer.Screen
        name="DashBoard"
        component={BottomTab}
        options={{
          title: 'Dashboard',
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerInactiveBackgroundColor: 'transparent',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: ({focused}) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? Colors.white : Colors.text1}
            />
          ),
        }}
      />
    </LeftDrawer.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <RightDrawer.Navigator
      id="rightDrawer"
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
        name="Birthday Remainder"
        component={BirthdayRemainderNavigator}
        options={{
          title: 'Birthday Remainder',
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
        name="PhotoSDK"
        component={PhotoSDK}
        options={{
          title: 'PhotoSDK Trails',
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
      {/* <RightDrawer.Screen
        name="CustomSDK"
        component={CustomSDK}
        options={{
          title: 'CustomSDK',
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
      /> */}
    </RightDrawer.Navigator>
  );
};

export default DrawerStack;
