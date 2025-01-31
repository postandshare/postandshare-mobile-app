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
export const getRelatedTemplate = params => {
  return authAxiosInstance.get(`${dashboard_route}/getRelatedTemplate`, {
    params,
  });
};

//getDashboardContent
export const getDashboardContent = params => {
  return authAxiosInstance.get(`${dashboard_route}/getDashboardContent`, {
    params,
  });
};
