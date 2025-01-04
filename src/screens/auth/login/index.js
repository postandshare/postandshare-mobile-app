import {
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Images from '../../../constants/images';
import CustomButton from '../../../components/CustomButton';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import authStyle from '../authStyle';
import {SendOTPonMobile} from '../../../services/authServices/auth.services';
import {useMutation} from '@tanstack/react-query';
import Loader from '../../../components/Loader';
import {Checkbox, Text} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import ControllerInput from '../../../components/ControllerInput';
const Login = ({navigation}) => {
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      mobileNumber: '',
      checkbox: false,
    },
  });

  const {mutate: SendOTPonMobileMuatate, isLoading: SendOTPonMobileLoading} =
    useMutation(SendOTPonMobile, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
        navigation.navigate(NavigationScreenName.VERIFY_OTP, {
          mobileNumber: getValues()?.mobileNumber,
          requesId: success?.data?.request_id,
        });
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });
  const onSubmit = data => {
    SendOTPonMobileMuatate({
      mobileNumber: data?.mobileNumber,
    });
  };

  return (
    <>
      <Loader open={SendOTPonMobileLoading} text="Sending OTP..." />
      <ImageBackground source={Images.loginTop} style={authStyle.upperImage}>
        <Text style={authStyle.welcomeText}>Enter your phone number</Text>
        <Text style={authStyle.signin_text}>
          Input your mobile number for account verification
        </Text>
      </ImageBackground>
      <View style={authStyle.bottom_content_root}>
        <ControllerInput
          rules={{
            required: 'Mobile Number required',
            minLength: {
              value: 10,
              message: 'Number should be 10 digits',
            },
          }}
          name="mobileNumber"
          control={control}
          label="Mobile Number"
          keyboardType={'number-pad'}
          placeholder="Enter your mobile number"
          maxLength={10}
        />
        <Controller
          control={control}
          name="checkbox"
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <View style={authStyle.termsandcondition}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                />
                <Text style={authStyle.termsandcondition_text}>
                  By continuing, you agree to our{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={authStyle.termsandcondition_link}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />

        <CustomButton title={'Send Code'} onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};

export default Login;
