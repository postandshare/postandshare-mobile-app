import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const auth_route = `${baseURL}/auth`;

export const SignInWithOTP = body => {
  return authAxiosInstance.post(`${baseURL}/auth/SignInWithOTP`, body);
};
export const SendOTPonMobile = body => {
  return authAxiosInstance.post(`${baseURL}/auth/SendOTPonMobile`, body);
};

//getUserProfile
export const getUserProfile = params => {
  return authAxiosInstance.get(`${auth_route}/getUserProfile`, {
    params,
  });
};
