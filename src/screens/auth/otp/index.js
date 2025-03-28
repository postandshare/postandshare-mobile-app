import {
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react';
import Images from '../../../constants/images';
import authStyle from '../authStyle';
import {
  SendOTPonMobile,
  SignInWithOTP,
} from '../../../services/authServices/auth.services';
import {useMutation} from '@tanstack/react-query';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginState} from '../../../services/reducer/AuthSlice';
import Loader from '../../../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sizes from '../../../constants/Sizes';

export let newOtps = 0;

const VerifyOTP = ({navigation, route}) => {
  const {mobileNumber, requesId} = route.params;
  const {login_Data} = useSelector(store => store.auth);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  // const [otp, setOtp] = useState('');
  const otpRef = useRef(null);
  const [resendTime, setResendTime] = useState(40);
  const [isOtpSend, setIsOtpSend] = useState(true);
  const [isOtpVerify, setIsOtpVerfiy] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const {mutate: SendOTPonMobileMuatate, isLoading: SendOTPonMobileLoading} =
    useMutation(SendOTPonMobile, {
      onSuccess: success => {
        ToastAndroid.show(success?.data?.message, ToastAndroid.SHORT);
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  const {mutate: SignInWithOTPMuatate, isLoading: SignInWithOTPLoading} =
    useMutation(SignInWithOTP, {
      onSuccess: async success => {
        dispatch(setLoginState(success?.data));
      },
      onError: error => {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      },
    });

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }

      newOtp[index] = '';

      setOtp(newOtp);
    }
  };
  if (otp.length === 4) {
    newOtps = otp.join('');
  }
  const handleSubmit = () => {
    if (!otp || otp === '') {
      ToastAndroid.show('Please enter OTP !', ToastAndroid.SHORT);
      return;
    } else if (!login_Data) {
      SignInWithOTPMuatate({
        mobileNumber: mobileNumber,
        OTP: otp.join(''),
        request_id: requesId,
      });
    }
  };

  const resendHandler = () => {
    if (resendTime > 0) return;

    setResendTime(40);
    SendOTPonMobileMuatate({
      mobileNumber: mobileNumber,
    });
  };
  function getTime(sec) {
    if (sec === 40 || sec === 0) return '';
    return `in ${Math.floor(sec / 60)}:${sec % 60} sec`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTime <= 0) {
        clearInterval(timer);
      } else {
        setResendTime(resendTime - 1);
      }
    }, 1000);

    if (!isOtpSend) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isOtpSend, resendTime]);
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
      <Loader text="Loading..." open={SignInWithOTPLoading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[isKeyboardVisible && {top: -Sizes.hp('25%')}, {flex: 1}]}>
          {/* upper card */}
          <TouchableOpacity
            style={{position: 'absolute', top: 30, left: 10, zIndex: 10}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="keyboard-backspace"
              style={{color: '#fff', fontSize: 40}}
            />
          </TouchableOpacity>
          <ImageBackground
            source={Images.loginTop}
            style={authStyle.upperImage}>
            <View style={authStyle.topImgSec}>
              <MaterialCommunityIcons
                name="cellphone-message"
                size={35}
                style={{alignSelf: 'center'}}
                color="#0C2F49"
              />
              {/* <Image source={Images.otp_icon} style={authStyle.otp_icon_img} /> */}
            </View>
            <Text style={authStyle.welcomeText}>Enter OTP</Text>
            <Text style={authStyle.otp_send_text}>
              Secure your account, one code at a time
            </Text>
          </ImageBackground>
          <Pressable>
            <View style={authStyle.middleContainer}>
              <View style={authStyle.input}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={styles.input}
                    value={value}
                    onChangeText={text => handleChangeText(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                  />
                ))}
              </View>

              <View style={authStyle.submitBtnContainer}>
                <TouchableOpacity
                  style={authStyle.submitBtn}
                  onPress={() => handleSubmit()}>
                  <Text style={authStyle.submitBtnTxt}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {!isOtpVerify && isOtpSend && (
                <TouchableOpacity onPress={resendHandler}>
                  <Text
                    style={[
                      authStyle.btnTxt,
                      resendTime > 0 && authStyle.resendBtn,
                    ]}>
                    Resend OTP {getTime(resendTime)}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    width: 50,
    height: 50,
    margin: 10,
    textAlign: 'center',
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#333',
  },
});
export default VerifyOTP;
