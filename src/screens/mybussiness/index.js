import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBussiness from './MyBussiness';
import AddBussiness from './AddBussiness';
import EditBussiness from './EditBussiness';
import ViewBussiness from './ViewBussiness';
import SelectPartyLeader from './components/PoliticalComponents/SelectPartyLeader';
import PoliticalVolunteer from './components/PoliticalComponents/PoliticalVolunteer';
import ChangeLeader from './components/PoliticalComponents/ChangeLeader';
import ViewPoliticalBussiness from './ViewPoliticalBussiness';

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
        <Stack.Screen name="View Bussiness" component={ViewBussiness} />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'card'}}>
        <Stack.Screen
          name="View Political"
          component={ViewPoliticalBussiness}
        />
        <Stack.Screen name={'Political Leader'} component={SelectPartyLeader} />
        <Stack.Screen name={'Change Leader'} component={ChangeLeader} />
        <Stack.Screen
          name="PoliticalVolunteer"
          component={PoliticalVolunteer}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyBussinessNavigator;
