import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';



import {useState} from 'react';
import Images from '../../../constants/Images';
import CustomInputField from '../../../components/CustomInputField';
import CustomButton from '../../../components/CustomButton';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import authStyle from '../authStyle';
// import { useMutation } from 'react-query';
// import { SendOTPonMobile } from '../../../services/authServices/auth.services';
const Login = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    phone: '',
    err: {},
  });
  const onChangePhone = text => {
    setState({...state, phone: text, err: {...state.err, phone: ''}});
  };

  // const {mutate, isLoading: SendOTPonMobileLoading} = useMutation(
  //   SendOTPonMobile,
  //   {
  //     onSuccess: success => {
  //       ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);

  //       console.log(success?.data , "in success");
  //       // navigation.navigate(NavigationScreenName.CHECKOTP, {
  //       //   mobileNumber: phone,
  //       //   requesId: success?.data?.request_id,
  //       // });
  //     },
  //     onError: error => {
  //       ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
  //     },
  //   },
  // );




  const handleVerification = () => {
    let err = {};
    if (state.phone === '') {
      err.phone = 'Mobile Number is required';
      ToastAndroid.show('Please Enter Valid Mobile Number', ToastAndroid.SHORT);
    } else {

      navigation.navigate(NavigationScreenName.VERIFY_OTP);
      // console.log('cell', state.phone);
      // mutate({
      //   mobileNumber: state.phone,
      // });
    }
    setState({...state, err});
  };

  const onPressTrouble = () => {
    //navigation.navigate(NavigationScreenName.FORGET_PASSWORD);
  };
  const handleOnPressSignup = () => {
    //navigation.navigate(NavigationScreenName.SIGNUP);
  };
  return (
    <>
      <ImageBackground source={Images.loginTop} style={authStyle.upperImage}>
        <View style={authStyle.topImgSec} />
        <Text style={authStyle.welcomeText}>Welcome !</Text>
        <Text style={authStyle.signin_text}>Sign in to Continue</Text>
      </ImageBackground>
      <View style={authStyle.bottom_content_root}>
        <CustomInputField
          label="Mobile Number"
          keyboardType={'number-pad'}
          placeholder="Enter your mobile number"
          value={state.phone}
          err={state.err?.phone}
          maxLength={10}
          onChange={onChangePhone}
        />
        <TouchableOpacity onPress={onPressTrouble}>
          <Text style={authStyle.touble_text}>Trouble to Sign in ?</Text>
        </TouchableOpacity>
        <CustomButton title={'Send Code'} onPress={handleVerification} />
        <View style={authStyle.signup_textWrapper}>
          <Text style={authStyle.singup_text}>Dont't Have an Account Yet? </Text>
          <TouchableOpacity onPress={handleOnPressSignup}>
            <Text style={authStyle.singup_link}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;
