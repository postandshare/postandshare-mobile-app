import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const dashboard_route = `${baseURL}/mobileDashboard`;

//getTrendingContent
export const getTrendingContent = params => {
  return authAxiosInstance.get(`${dashboard_route}/getTrendingContent`, {
    params,
  });
};

//getRelatedTemplet
export const getRelatedTemplet = params => {
  return authAxiosInstance.get(`${dashboard_route}/getRelatedTemplet`, {
    params,
  });
};

//getDashboardContent
export const getDashboardContent = params => {
  return authAxiosInstance.get(`${dashboard_route}/getDashboardContent`, {
    params,
  });
};
