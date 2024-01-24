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
      initialRouteName="ViewDetailedProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ViewDetailedProfile" component={ViewDetailedProfile} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
