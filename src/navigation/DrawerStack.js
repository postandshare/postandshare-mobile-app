import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerRight from '../components/CustomDrawerRight';
import NavigationScreenName from '../constants/NavigationScreenName';
import BottomTab from './BottomTab';
import PhotoStatus from '../screens/photo';
import Events from '../screens/evemt';
import Wallpaper from '../screens/wallpaper';


const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <LeftDrawer.Navigator
      id="leftDrawer"
      screenOptions={{headerShown: false, drawerPosition: 'left' , drawerContentStyle: {
        
      }}}
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
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      // drawerContent={({navigation}) => (
      //   <CustomDrawerRight navigation={navigation} />
      // )}
      >
      <RightDrawer.Screen name="mainDrawer" component={MainDrawer} />
    </RightDrawer.Navigator>
  );
};

export default DrawerStack;