
import { authAxiosInstance } from "../AxiosInstance";
const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';


export const SignInWithOTP = body => {
    return authAxiosInstance.post(`${baseURL}/auth/SignInWithOTP`, body);
};
export const SendOTPonMobile = body => {
    return authAxiosInstance.post(`${baseURL}/auth/SendOTPonMobile`, body);
};

