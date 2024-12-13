import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomDrawerLeft from '../components/CustomDrawerLeft';
import BottomTab from './BottomTab';
const LeftDrawer = createDrawerNavigator();
export const MainDrawer = () => {
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
