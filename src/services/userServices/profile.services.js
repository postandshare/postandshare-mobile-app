import Config from 'react-native-config';
import { authAxiosInstance } from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const user_route = `${baseURL}/auth`;


export const getUserProfile = params => {
    return authAxiosInstance.get(
      `${user_route}/getUserProfile`,
      {
        params,
      },
    );
  };

  export const updateUserProfile = body => {
    return authAxiosInstance.put(
      `${user_route}/updateUserProfile`,
      body,
    );
  };