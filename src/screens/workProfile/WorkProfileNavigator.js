import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewBussiness from './ViewBussiness';
import SelectPartyLeader from './components/PoliticalComponents/SelectPartyLeader';
import PoliticalVolunteer from './components/PoliticalComponents/PoliticalVolunteer';
import ChangeLeader from './components/PoliticalComponents/ChangeLeader';
import ViewPoliticalBussiness from './ViewPoliticalBussiness';
import {
  AddEditBusinessScreen,
  AddEditBusinessStep1Screen,
  AddEditBusinessStep2Screen,
  SelectWorkProfileScreen,
  WorkProfileListScreen,
} from './Index';
import NavigationScreenName from '../../constants/NavigationScreenName';

const Stack = createStackNavigator();
const WorkProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationScreenName.WORK_PROFILE_LIST}
        component={WorkProfileListScreen}
      />
      <Stack.Screen
        name={NavigationScreenName.SELECT_WORK_PROFILE}
        component={SelectWorkProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Business Step 1',
        }}
        name={NavigationScreenName.ADD_EDIT_BUSINESS_STEP1}
        component={AddEditBusinessStep1Screen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Business Final Step',
        }}
        name={NavigationScreenName.ADD_EDIT_BUSINESS_STEP2}
        component={AddEditBusinessStep2Screen}
      />
      <Stack.Screen name="View Bussiness" component={ViewBussiness} />
      <Stack.Screen name="View Political" component={ViewPoliticalBussiness} />
      <Stack.Screen name={'Political Leader'} component={SelectPartyLeader} />
      <Stack.Screen name={'Change Leader'} component={ChangeLeader} />
      <Stack.Screen name="PoliticalVolunteer" component={PoliticalVolunteer} />
    </Stack.Navigator>
  );
};

export default WorkProfileNavigator;
