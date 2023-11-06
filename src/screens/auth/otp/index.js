import {Image, ImageBackground, Pressable, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Images from '../../../constants/Images';
import authStyle from '../authStyle';
import Colors from '../../../constants/Colors';


const VerifyOTP = () => {

    const [otp, setOtp] = useState('');
    const otpRef = useRef(null); 
    const [resendTime, setResendTime] = useState(40);
    const [isOtpSend, setIsOtpSend] = useState(true);
    const focusOtp = () => {
        otpRef.current.blur();
      };
      const [isOtpVerify, setIsOtpVerfiy] = useState(false);

      const handleSubmit = () => {
        if (!otp || otp === '') {
          ToastAndroid.show('Please enter OTP !', ToastAndroid.SHORT);
          return;
        }
    
        // if (studentDocId && medium) {
        //   verifyOtpAddStudentMutate({
        //     otp: otp,
        //     medium: medium,
        //     studentDocId: studentDocId,
        //   });
        // } else if (!login_Data) {
        //   SignInWithOTPMutate({
        //     medium: mobileNumber,
        //     OTP: otp,
        //     request_id: requesId,
        //   });
        // } else {
        //   getChildListByOTPMutate({
        //     medium: mobileNumber,
        //     request_id: requesId,
        //     otp: otp,
        //   })
        // }
      };

      const resendHandler = () => {
        if (resendTime > 0) return;
    
        focusOtp();
        setOtp('');
        setResendTime(40);
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
  return (
    <>

        {/* upper card */}
      <ImageBackground source={Images.loginTop} style={authStyle.upperImage}>
        <View style={authStyle.topImgSec} >
            <Image source={Images.otp_icon} style={authStyle.otp_icon_img} />
        </View>
        <Text style={authStyle.welcomeText}>Enter OTP</Text>
        <Text style={authStyle.otp_send_text}>We have sent OTP to your registered mobile number</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Pressable style={{flex: 1}}>
          <View style={authStyle.middleContainer}>
            
            <View style={authStyle.input}>
              <TextInput
                style={authStyle.otpTxtInput}
                keyboardType="number-pad"
                label="Enter Your Code"
                placeholder="Enter Your Code"
                onChangeText={userData => setOtp(userData)}
                value={otp}
                ref={otpRef}
                textColor={Colors.TEXT1}
              />
              {Array(4)
                .fill()
                .map((_, i) => (
                  <TouchableWithoutFeedback key={i} onPress={focusOtp}>
                    <View
                      style={[
                        authStyle.otpBox,
                        i === otp.length && authStyle.selectedInput,
                        isOtpVerify && {backgroundColor: '#E9ECEF'},
                      ]}>
                      <Text style={authStyle.otpBoxTxt}>
                        {otp && otp.length > 0 ? otp[i] : ''}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
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

          <View style={authStyle.lowerViewContainer}>
            {!isOtpVerify && isOtpSend && (
              <TouchableOpacity onPress={resendHandler}>
                <Text
                  style={[authStyle.btnTxt, resendTime > 0 && authStyle.resendBtn]}>
                  Resend OTP {getTime(resendTime)}
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity>
                <Text style={{ fontSize: 18 }}>
                  Did not recive code?
                  <Text style={{ color: "#164B92" }}> Resend Code</Text>
                </Text>
              </TouchableOpacity> */}
          </View>
        </Pressable>
      </ScrollView>


    </>
  );
};

export default VerifyOTP;
