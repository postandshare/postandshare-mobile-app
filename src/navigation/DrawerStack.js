import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import CustomDrawerRight from '../components/CustomDrawerRight';
import NavigationScreenName from '../constants/NavigationScreenName';
import BottomTab from './BottomTab';


const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <LeftDrawer.Navigator
      id="leftDrawer"
      screenOptions={{headerShown: false, drawerPosition: 'left'}}
    //   drawerContent={({navigation}) => (
    //     <CustomDrawer navigation={navigation} />
    //   )}
      >
      <LeftDrawer.Screen
        name={NavigationScreenName.BOTOOM_TAB_NAVIGATOR}
        component={BottomTab}
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