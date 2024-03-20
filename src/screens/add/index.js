import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Add from './pages/Add';

const Stack = createStackNavigator();

const AddNavigatior = () => {
  return (
    <Stack.Navigator
      initialRouteName="Add"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  );
};

export default AddNavigatior;
