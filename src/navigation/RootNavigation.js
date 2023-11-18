import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreenName from '../constants/NavigationScreenName';
import Splash from '../screens/onBoarding/Splash';
import DrawerStack from './DrawerStack';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../services/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageKey from '../constants/LocalStorageKey';
import {setOnBoarding} from '../services/reducer/AuthSlice';
import OnBoarding from '../screens/onBoarding';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();
const Routes = () => {
  const [state, setState] = useState(true);
  const {login_Data, onBoarding} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const getOnboarding = async () => {
    try {
      const onboardingKey = await AsyncStorage.getItem(
        LocalStorageKey.ONBOARDING,
      );
      if (onboardingKey !== null && onboardingKey !== undefined) {
        dispatch(setOnBoarding(true));
      }
    } catch (error) {
      console.log('in onboarding console.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 3000);
    getOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          ) : !onBoarding ? (
            <Stack.Screen
              name={NavigationScreenName.ONBOARDING}
              component={OnBoarding}
            />
          ) : login_Data ? (
            <Stack.Screen name={NavigationScreenName.DRWAER_NAVIGATOR} component={DrawerStack} />
          ) : (
            <>
              <Stack.Screen
                name={NavigationScreenName.ATUH_NAVIGATOR}
                component={AuthStack}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;

const styles = StyleSheet.create({});
