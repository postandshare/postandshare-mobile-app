import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoStatus from '.';


const Stack = createStackNavigator();
const PhotoNavigator = ({}) => {


  return (
    <Stack.Navigator
      initialRouteName="PhotoStatus"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhotoStatus" component={PhotoStatus} />
    </Stack.Navigator>
  );
};

export default PhotoNavigator;
