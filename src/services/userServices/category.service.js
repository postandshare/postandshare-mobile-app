import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const category_route = `${baseURL}/category`;

// getCategory
export const getCategory = params => {
  return authAxiosInstance.get(`${category_route}/getCategory`, {
    params,
  });
};

//getDistinctCategoryGroup
export const getDistinctCategoryGroup = params => {
  return authAxiosInstance.get(`${category_route}/getDistinctCategoryGroup`, {
    params,
  });
};

// getDistinctCategory
export const getDistinctCategory = params => {
  return authAxiosInstance.get(`${category_route}/getDistinctCategory`, {
    params,
  });
};
