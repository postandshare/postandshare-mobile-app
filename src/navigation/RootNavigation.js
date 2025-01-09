import {StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationScreenName from '../constants/NavigationScreenName';
import LocalStorageKey from '../constants/LocalStorageKey';

import Splash from '../screens/onBoarding/Splash';
import {MainDrawer} from './DrawerStack';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setOnBoarding} from '../services/reducer/AuthSlice';
import OnBoarding from '../screens/onBoarding';
import ProfileNavigator from '../screens/profile/index';
import TermAndCondtion from '../screens/term&condition';
import WorkProfileNavigator from '../screens/workProfile/WorkProfileNavigator';
import MyPost from '../screens/mypost';
import Tutorial from '../screens/tutorials';
import Privacy from '../screens/privacy';
import LanguageSelection from '../screens/auth/languageSelect';
import FeedBack from '../screens/FeedBack';
import PhotoNavigator from '../screens/photo/PhotoNavigator';
import CustomSDK from '../screens/customSDK';
import ShareSave from '../screens/customSDK/ShareSave';
import HelpSupport from '../screens/helpSupport';
import MonthPhotos from '../screens/thismonth';
import OneSignal from 'react-native-onesignal';
import Deeplinking from '../utils/linking';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import Notification from '../screens/notification';
import BirthdayRemainderNavigator from '../screens/birthday';
import AddNavigatior from '../screens/add/index';
import PhotoPost from '../screens/mypost/components/PhotoPost';
import CreateAIImage from '../screens/aiImage/CreateAIImage';

const Stack = createStackNavigator();
const Routes = () => {
  const [state, setState] = useState(true);
  const {login_Data, onBoarding} = useSelector(store => store.auth);
  const {isProfileUpdated} = useSelector(store => store.commonStore);
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
    OneSignal.promptForPushNotificationsWithUserResponse();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setState(false);
      OneSignal.setAppId('81677935-54bb-44f5-ade2-2b4ea34c4eba');
    }, 1000);
    getOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <NavigationContainer
        theme={{
          colors: {
            background: '#fff',
          },
        }}
        linking={Deeplinking}>
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
            isProfileUpdated === false ? (
              <>
                <Stack.Screen
                  name={NavigationScreenName.LANGUAGE_SELECTION}
                  component={LanguageSelection}
                />
                <Stack.Screen
                  name="ProfileNavigator"
                  component={ProfileNavigator}
                />
                <Stack.Screen
                  name={NavigationScreenName.MAIN_NAVIGATOR}
                  component={MainDrawer}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name={NavigationScreenName.MAIN_NAVIGATOR}
                  component={MainDrawer}
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
                  name={NavigationScreenName.WORK_PROFILE_NAVIGATOR}
                  component={WorkProfileNavigator}
                />
                <Stack.Screen
                  name={NavigationScreenName.MY_POST}
                  component={MyPost}
                />
                <Stack.Screen name={'PhotoPost'} component={PhotoPost} />
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
                <Stack.Screen name="ShareSave" component={ShareSave} />
                <Stack.Screen
                  name={NavigationScreenName.HELPSUPPORT}
                  component={HelpSupport}
                />
                <Stack.Screen name="MonthPhoto" component={MonthPhotos} />
                <Stack.Screen
                  name={NavigationScreenName.NOTIFICATION}
                  component={Notification}
                />
                <Stack.Screen
                  name={NavigationScreenName.BIRTHDAY_REMAINDER_NAVIGATOR}
                  component={BirthdayRemainderNavigator}
                />
                <Stack.Screen
                  name={NavigationScreenName.ADD_NAVIGATOR}
                  component={AddNavigatior}
                />
                <Stack.Screen
                  name={NavigationScreenName.AI_IMAGE}
                  component={CreateAIImage}
                />
              </>
            )
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
