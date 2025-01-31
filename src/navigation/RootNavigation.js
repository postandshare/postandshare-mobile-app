import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationScreenName from '../constants/NavigationScreenName';
import LocalStorageKey from '../constants/LocalStorageKey';
import Splash from '../screens/onBoarding/Splash';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {setOnBoarding} from '../services/reducer/AuthSlice';
import OnBoarding from '../screens/onBoarding';
import OneSignal from 'react-native-onesignal';
import Deeplinking from '../utils/linking';
import {MainDrawer} from './DrawerStack';
import {EditProfileScreen, ProfileViewScreen} from '../screens/profile/index';
import TermAndCondtion from '../screens/term&condition';
import MyPost from '../screens/mypost';
import Tutorial from '../screens/tutorials';
import Privacy from '../screens/privacy';
import LanguageSelection from '../screens/auth/languageSelect';
import FeedBack from '../screens/FeedBack';
import CustomSDK from '../screens/customSDK';
import ShareSave from '../screens/customSDK/ShareSave';
import HelpSupport from '../screens/helpSupport';
import Notification from '../screens/notification';
import BirthdayRemainderNavigator from '../screens/birthday';
import AddNavigatior from '../screens/add/index';
import PhotoPost from '../screens/mypost/components/PhotoPost';
import CreateAIImage from '../screens/aiImage/CreateAIImage';
import SeeMore from '../screens/seeMore/SeeMore';
import ViewCategoryImages from '../screens/category/ViewCategoryImages';
import WorkProfileList from '../screens/workProfile/WorkProfileList';
import SelectWorkProfile from '../screens/workProfile/SelectWorkProfile';
import AddEditBusinessStep1 from '../screens/workProfile/business/AddEditBusinessStep1';
import AddEditBusinessStep2 from '../screens/workProfile/business/AddEditBusinessStep2';
import AddPoliticalProfile from '../screens/workProfile/political/AddPoliticalProfile';
import AddLeaderInProfile from '../screens/workProfile/political/AddLeaderInProfile';
import EditPoliticalProfile from '../screens/workProfile/political/EditPoliticalProfile';
import ViewBussiness from '../screens/workProfile/ViewBussiness';
import ViewPoliticalBussiness from '../screens/workProfile/ViewPoliticalBussiness';
import SelectPartyLeader from '../screens/workProfile/components/PoliticalComponents/SelectPartyLeader';
import ChangeLeader from '../screens/workProfile/components/PoliticalComponents/ChangeLeader';
import PoliticalVolunteer from '../screens/workProfile/components/PoliticalComponents/PoliticalVolunteer';

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
            <>
              {/* drawer */}
              <Stack.Screen
                name={NavigationScreenName.MAIN_NAVIGATOR}
                component={MainDrawer}
              />

              {/* profile related screens  */}
              <Stack.Screen
                name={NavigationScreenName.PROFILE}
                component={ProfileViewScreen}
              />
              <Stack.Screen
                name={NavigationScreenName.EDIT_PROFILE}
                component={EditProfileScreen}
              />

              <Stack.Screen
                name={NavigationScreenName.WORK_PROFILE_LIST}
                component={WorkProfileList}
              />
              <Stack.Screen
                name={NavigationScreenName.SELECT_WORK_PROFILE}
                component={SelectWorkProfile}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Add Business Step 1',
                }}
                name={NavigationScreenName.ADD_EDIT_BUSINESS_STEP1}
                component={AddEditBusinessStep1}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Add Business Final Step',
                }}
                name={NavigationScreenName.ADD_EDIT_BUSINESS_STEP2}
                component={AddEditBusinessStep2}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Add Political Profile',
                }}
                name={NavigationScreenName.ADD_POLITICAL_PROFILE}
                component={AddPoliticalProfile}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Add Leader In Profile',
                }}
                name={NavigationScreenName.ADD_LEADER_IN_POLITICAL_PROFILE}
                component={AddLeaderInProfile}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Edit Political Profile',
                }}
                name={NavigationScreenName.EDIT_POLITICAL_PROFILE}
                component={EditPoliticalProfile}
              />
              <Stack.Screen name="View Bussiness" component={ViewBussiness} />
              <Stack.Screen
                name="View Political"
                component={ViewPoliticalBussiness}
              />
              <Stack.Screen
                name={'Political Leader'}
                component={SelectPartyLeader}
              />
              <Stack.Screen name={'Change Leader'} component={ChangeLeader} />
              <Stack.Screen
                name="PoliticalVolunteer"
                component={PoliticalVolunteer}
              />
              {/* post related screens */}
              <Stack.Screen
                name={NavigationScreenName.VIEW_CATEGORY_IMAGES}
                component={ViewCategoryImages}
              />
              <Stack.Screen
                name={NavigationScreenName.SEE_MORE}
                component={SeeMore}
              />
              <Stack.Screen
                name={NavigationScreenName.MY_POST}
                component={MyPost}
              />
              <Stack.Screen name={'PhotoPost'} component={PhotoPost} />

              <Stack.Screen
                name={NavigationScreenName.TERM_AND_CONDITION}
                component={TermAndCondtion}
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
                name={NavigationScreenName.SDK_SCREEN}
                component={CustomSDK}
              />
              <Stack.Screen name="ShareSave" component={ShareSave} />
              <Stack.Screen
                name={NavigationScreenName.HELPSUPPORT}
                component={HelpSupport}
              />
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
