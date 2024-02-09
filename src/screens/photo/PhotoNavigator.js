import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoStatus from '.';
import SelectBussiness from './SelectBussiness';


const Stack = createStackNavigator();
const PhotoNavigator = ({navigation , route}) => {
  const {initialRouteName} = route.params;
  console.log(initialRouteName , "photonavigator");

  return (
    <Stack.Navigator
      initialRouteName="SelectBussiness"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhotoStatus" component={PhotoStatus} 
      initialParams={{picData: initialRouteName}}
      />
      <Stack.Screen name="SelectBussiness" component={SelectBussiness} 
      initialParams={{picData: initialRouteName}}
      />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
