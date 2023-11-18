import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBussiness from './MyBussiness';
import AddBussiness from './AddBussiness';
import EditBussiness from './EditBussiness';

const Stack = createStackNavigator();
const MyBussinessNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyBussiness"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyBussiness" component={MyBussiness} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Add Bussiness" component={AddBussiness} />
        <Stack.Screen name="Edit Bussiness" component={EditBussiness} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyBussinessNavigator;
