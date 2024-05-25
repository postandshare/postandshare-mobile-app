import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const eventTemplate_route = `${baseURL}/eventTemplets`;

export const getTemplets = params => {
  return authAxiosInstance.get(`${eventTemplate_route}/getTemplets`, {
    params,
  });
};
