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
import ProfileNavigator from '../screens/profile/index';
import TermAndCondtion from '../screens/term&condition';
import MyBussinessNavigator from '../screens/mybussiness';
import MyPost from '../screens/mypost';
import Tutorial from '../screens/tutorials';
import Privacy from '../screens/privacy';
import LanguageSelection from '../screens/auth/languageSelect';
import FeedBack from '../screens/FeedBack';
import PhotoNavigator from '../screens/photo/PhotoNavigator';
import CustomSDK from '../screens/customSDK';
import ShareSave from '../screens/customSDK/ShareSave';

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
            <>
              <Stack.Screen
                name={NavigationScreenName.DRWAER_NAVIGATOR}
                component={DrawerStack}
              />
              <Stack.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
              />
              <Stack.Screen
                name={NavigationScreenName.TERM_AND_CONDITION}
                component={TermAndCondtion}
              />
              <Stack.Screen
                name={NavigationScreenName.MY_BUSSINESS}
                component={MyBussinessNavigator}
              />
              <Stack.Screen
                name={NavigationScreenName.MY_POST}
                component={MyPost}
              />
              <Stack.Screen
                name={NavigationScreenName.TUTORIALS}
                component={Tutorial}
              />
              <Stack.Screen
                name={NavigationScreenName.Privacy_Policy}
                component={Privacy}
              />
              <Stack.Screen
                name={NavigationScreenName.LANGUAGE_SELECTION}
                component={LanguageSelection}
              />
              <Stack.Screen
                name={NavigationScreenName.FEEDBACK}
                component={FeedBack}
              />
              <Stack.Screen
                name={NavigationScreenName.PHOTO_NAVIGATOR}
                component={PhotoNavigator}
              />
              <Stack.Screen name="CustomSDK" component={CustomSDK} />
              <Stack.Screen name='ShareSave' component={ShareSave} />
            </>
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
