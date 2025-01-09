import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const banner_route = `${baseURL}/banner`;

//getBannerList
export const getBannerList = params => {
  return authAxiosInstance.get(`${banner_route}/getBannerList`, {
    params,
  });
};
