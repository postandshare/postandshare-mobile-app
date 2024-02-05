import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationScreenName from '../constants/NavigationScreenName';
import Login from '../screens/auth/login';
import VerifyOTP from '../screens/auth/otp';
import LanguageSelection from '../screens/auth/languageSelect';



const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationScreenName.LOGIN} component={Login} />
      {/* <Stack.Screen
        name={NavigationScreenName.FORGET_PASSWORD}
        component={ForgetPassword}
      />
      <Stack.Screen
        name={NavigationScreenName.CHANGE_PASSWORD}
        component={ChangePassword}
      /> */}
      {/* <Stack.Screen name={NavigationScreenName.SIGNUP} component={Signup} /> */}
      <Stack.Screen name={NavigationScreenName.VERIFY_OTP} component={VerifyOTP} />
      <Stack.Screen name={NavigationScreenName.LANGUAGE_SELECTION} component={LanguageSelection}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
