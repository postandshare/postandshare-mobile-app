import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const user_route = `${baseURL}/frame`;

export const getOrgFrame = params => {
  return authAxiosInstance.get(`${user_route}/getOrgFrame`, {
    params,
  });
};
