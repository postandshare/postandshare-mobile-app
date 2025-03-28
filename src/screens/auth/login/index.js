import {
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Images from '../../../constants/images';
import CustomButton from '../../../components/CustomButton';
import NavigationScreenName from '../../../constants/NavigationScreenName';
import authStyle from '../authStyle';
import {SendOTPonMobile} from '../../../services/authServices/auth.services';
import {useMutation} from '@tanstack/react-query';
import Loader from '../../../components/Loader';
import {Checkbox, Text} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';
import Sizes from '../../../constants/Sizes';
const Login = ({navigation}) => {
  const phoneInputRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
          mobileNumber: getValues()?.mobileNumber.slice(-10),
          requesId: success?.data?.request_id,
        });
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });
  const onSubmit = data => {
    SendOTPonMobileMuatate({
      mobileNumber: String(data?.mobileNumber).slice(-10),
    });
  };

  useEffect(() => {
    // Keyboard open hone pr state update karega
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    // Keyboard close hone pr state update karega
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    // Component unmount hone par listeners remove karein
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
      <Loader open={SendOTPonMobileLoading} text="Sending OTP..." />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            authStyle.login_container,
            isKeyboardVisible && {top: -Sizes.hp('25%')},
          ]}>
          <ImageBackground
            source={Images.loginTop}
            style={authStyle.upperImage}>
            <Text style={authStyle.welcomeText}>Enter your phone number</Text>
            <Text style={authStyle.signin_text}>
              Input your mobile number for account verification
            </Text>
          </ImageBackground>
          <View style={[authStyle.bottom_content_root]}>
            <Controller
              rules={{
                required: 'Mobile Number required',

                // minLength: {
                //   value: 10,
                //   message: 'Number should be 10 digits',
                // },
                validate: value =>
                  phoneInputRef.current?.isValidNumber(value) ||
                  'Invalid phone number',
              }}
              name="mobileNumber"
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <>
                  <PhoneInput
                    ref={phoneInputRef}
                    defaultValue={value}
                    defaultCode="IN"
                    layout="first"
                    onChangeFormattedText={text => {
                      console.log(text);
                      onChange(text);
                    }}
                    withShadow
                    autoFocus
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: '#666',
                      borderRadius: 10,
                      width: 'auto',
                      fontSize: 20,
                    }}
                    textContainerStyle={{
                      borderRadius: 10,
                      padding: 0,
                      fontSize: 20,
                    }}
                    textInputStyle={{
                      borderRadius: 10,
                      padding: 0,
                      fontSize: 20,
                    }}
                    codeTextStyle={{
                      fontSize: 20,
                    }}
                  />
                  {!!error && (
                    <Text style={styles.errorText}>{error?.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="checkbox"
              rules={{
                required: 'Please accept term and conditions',
              }}
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
                  {!!error && (
                    <Text style={styles.errorText}>{error?.message}</Text>
                  )}
                </>
              )}
            />

            <CustomButton
              title={'Send Code'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  errorText: {
    marginLeft: Sizes.wp('1%'),
    color: 'red',
    marginTop: 2,
    fontSize: 16,
  },
});
