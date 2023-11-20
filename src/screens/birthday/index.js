import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BirthdayRemainder from './BirthdayRemainder';
import BirthdayRemainderDetail from './BirthdayRemainderDetail';
import AddRemainder from './AddRemainder';
import RemainderSetting from './RemainderSetting';

const Stack = createStackNavigator();
const BirthdayRemainderNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BirthdayRemainder"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BirthdayRemainder" component={BirthdayRemainder} />

      <Stack.Screen name="BirthdayRemainderDetail" component={BirthdayRemainderDetail} />
      <Stack.Screen name="RemainderSetting" component={RemainderSetting} />
      <Stack.Screen name="AddRemainder" component={AddRemainder} />
    </Stack.Navigator>
  );
};

export default BirthdayRemainderNavigator;
