import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const common_route = `${baseURL}/common`;

export const getBusinessCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessCategory`, {
    params,
  });
};
export const getBusinessSubCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessSubCategory`, {
    params,
  });
};
