import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreenName from '../constants/NavigationScreenName';
import Splash from '../screens/onBoarding/Splash';
import DrawerStack from './DrawerStack';
import AuthStack from './AuthStack';


const Stack = createStackNavigator();
const Routes = () => {
  const [state, setState] = useState(true);
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 3000);
    // getOnboarding();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent />
      <NavigationContainer
        theme={{
          colors: {
            background: '#fff',
          },
        }}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state ? (
            <Stack.Screen
              name={NavigationScreenName.SPLASH}
              component={Splash}
            />
          ) : isAuthenticated? (
            <Stack.Screen
              name={'DrawerStack'}
              component={DrawerStack}
            />
          )
          : (
          <>
           <Stack.Screen
              name={NavigationScreenName.ATUH_NAVIGATOR}
              component={AuthStack}
            />
            <Stack.Screen
            name={NavigationScreenName.DRWAER_NAVIGATOR}
            component={DrawerStack}
          />
          </> 
          )
        }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;

const styles = StyleSheet.create({});
