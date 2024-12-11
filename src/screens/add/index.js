import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Add from './pages/Add';
const Stack = createStackNavigator();
const AddNavigatior = ({navigation, route}) => {
  const {pic} = route?.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Add"
        component={Add}
        options={{headerShown: false}}
        initialParams={{pic}}
      />
    </Stack.Navigator>
  );
};

export default AddNavigatior;
