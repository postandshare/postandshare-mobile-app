import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const misc_route = `${baseURL}/misc`;

export const getRegionalLanguages = params => {
  return authAxiosInstance.get(`${misc_route}/getRegionalLanguages`, {
    params,
  });
};
export const getStateList = () => {
  return authAxiosInstance.get(`${misc_route}/getStateList`);
};
export const getDistrictListByStateName = params => {
  return authAxiosInstance.get(`${misc_route}/getDistrictListByStateName`, {
    params,
  });
};
