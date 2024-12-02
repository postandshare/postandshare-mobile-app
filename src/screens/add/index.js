import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Add from './pages/Add';
import Choose from './pages/Choose';

const Stack = createStackNavigator();

const AddNavigatior = () => {
  return (
    <Stack.Navigator
      initialRouteName="Choose"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name="Choose" component={Choose} />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  );
};

export default AddNavigatior;
