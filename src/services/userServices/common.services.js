import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const common_route = `${baseURL}/common`;

//getBusinessCategory
export const getBusinessCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessCategory`, {
    params,
  });
};

//getBusinessSubCategory
export const getBusinessSubCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessSubCategory`, {
    params,
  });
};

//addBusinessSubCategory
export const addBusinessSubCategory = body => {
  return authAxiosInstance.post(`${common_route}/addBusinessSubCategory`, body);
};

//updateBusinessSubCategory
export const updateBusinessSubCategory = body => {
  return authAxiosInstance.put(
    `${common_route}/updateBusinessSubCategory`,
    body,
  );
};

//deleteBusinessSubCategory
export const deleteBusinessSubCategory = body => {
  return authAxiosInstance.delete(
    `${common_route}/deleteBusinessSubCategory/${body?.businessSubCategoryDocId}`,
  );
};

//deleteBusinessCategory
export const deleteBusinessCategory = body => {
  return authAxiosInstance.delete(
    `${common_route}/deleteBusinessCategory/${body?.businessCategoryDocId}`,
  );
};

//addBusinessCategory
export const addBusinessCategory = body => {
  return authAxiosInstance.post(`${common_route}/addBusinessCategory`, body);
};

//updateBusinessCategory
export const updateBusinessCategory = body => {
  return authAxiosInstance.put(`${common_route}/updateBusinessCategory`, body);
};

//addCategory
export const addCategory = body => {
  return authAxiosInstance.post(`${common_route}/addCategory`, body);
};

//updateCategory
export const updateCategory = body => {
  return authAxiosInstance.put(`${common_route}/updateCategory`, body);
};

//getCategory
export const getCategory = params => {
  return authAxiosInstance.get(`${common_route}/getCategory`, {
    params,
  });
};

//deleteBusinessCategory
export const deleteCategory = body => {
  return authAxiosInstance.delete(
    `${common_route}/deleteCategory/${body?.categoryDocId}`,
  );
};
