import {StyleSheet} from 'react-native';

import {scale} from 'react-native-size-matters';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';

const authStyle = StyleSheet.create({
  upperImage: {
    height: Sizes.hp('35%'),
    justifyContent: 'flex-end',
    paddingHorizontal: Sizes.wp('5%'),
    paddingVertical: Sizes.hp('3%'),
  },
  topImgSec: {
    height: Sizes.hp('8%'),
    width: Sizes.hp('8%'),
    borderRadius: Sizes.hp('4%'),
    backgroundColor: '#FAFAFA',
    border: 0.8,
    borderStyle: 'solid',
    borderColor: ' rgba(11, 73, 119, 0.17)',
    marginBottom: 10,
    justifyContent: 'center',
  },
  otp_icon_img: {
    height: 36,
    width: 36,
    alignSelf: 'center',
  },
  welcomeText: {
    color: Colors.white,
    letterSpacing: 2,
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 5,
  },
  signin_text: {
    color: Colors.white,
    letterSpacing: 3,
    fontSize: 18,
    fontWeight: '600',
  },
  otp_send_text: {
    color: Colors.white,
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  bottom_content_root: {
    paddingHorizontal: Sizes.wp('5%'),
    paddingVertical: Sizes.hp('3%'),
    backgroundColor: Colors.white,
    flex: 1,
  },
  singup_link: {
    color: 'blue',
    fontSize: scale(14),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.75,
  },
  signup_textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  singup_text: {
    color: Colors.TEXT1,
    fontSize: scale(14),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.75,
  },
  touble_text: {
    textAlign: 'right',
    color: 'rgba(12, 47, 73, 0.67)',
    marginTop: Sizes.hp('-1%'),
    fontSize: scale(13),
    fontWeight: '600',
  },
  middleContainer: {marginVertical: 30, marginHorizontal: 16},
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  otpBoxTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TEXT1,
  },
  otpTxtInput: {
  
  

   
  },
  otpBox: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  topViewContainer: {
    left: 10,
    padding: 10,
    display: 'flex',
    marginBottom: 0,
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBox: {
    marginTop: 8,
  },
  inputTitle: {
    marginLeft: 5,
    color: Colors.TEXT1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  otpInput: {
    width: 1,
    height: 1,
  },

  selectedInput: {
    borderColor: '#03B44D',
    borderWidth: 2,
  },
  btnTxt: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.white,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginVertical: 20,
  },
  resendBtn: {
    backgroundColor: 'transparent',
    color: '#aaa',
    fontSize: 18,
  },

  backImg: {height: 100, width: '100%'},

  backIcon: {marginTop: 0, left: 0, opacity: 0.75},
  topViewTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    left: 10,
  },
  verificationText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#164B92',
  },
  verifiedNumber: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -10,
    color: '#164B92',
  },

  submitBtn: {
    backgroundColor: Colors.SECONDRY,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  submitBtnContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  submitBtnTxt: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  lowerViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default authStyle;
