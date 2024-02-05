import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewDetailedProfile from './ViewDetailedProfile';
import ProfileView from './ProfileView';
import EditProfile from './EditProfile';


const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileView"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ViewDetailedProfile" component={ViewDetailedProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
