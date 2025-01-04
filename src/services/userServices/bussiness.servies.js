import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const bussiness_route = `${baseURL}/business`;

//getAllBusinessList
export const getAllBusinessList = params => {
  return authAxiosInstance.get(`${bussiness_route}/getAllBusinessList`, {
    params,
  });
};

//updateBusinessPartner
export const updateBusinessPartner = body => {
  return authAxiosInstance.put(
    `${bussiness_route}/updateBusinessPartner`,
    body,
  );
};

//deleteBusinessPartner
export const deleteBusinessPartner = body => {
  return authAxiosInstance.put(
    `${bussiness_route}/deleteBusinessPartner`,
    body,
  );
};

//addBusiness
export const addBusiness = body => {
  return authAxiosInstance.post(`${bussiness_route}/addBusiness`, body);
};

//updateBusinessActiveness
export const updateBusinessActiveness = body => {
  return authAxiosInstance.put(
    `${bussiness_route}/updateBusinessActiveness`,
    body,
  );
};

//deleteBusiness
export const deleteBusiness = body => {
  return authAxiosInstance.delete(
    `${bussiness_route}/deleteBusiness/${body?.bussinessDocId}`,
  );
};

//changeBusinessLogo
export const changeBusinessLogo = body => {
  return authAxiosInstance.put(`${bussiness_route}/changeBusinessLogo`, body);
};

//addBusinessPartner
export const addBusinessPartner = body => {
  return authAxiosInstance.post(`${bussiness_route}/addBusinessPartner`, body);
};

//getBusinessPartner
export const getBusinessPartner = params => {
  return authAxiosInstance.get(`${bussiness_route}/getBusinessPartner`, {
    params,
  });
};

//updateBusiness
export const updateBusiness = body => {
  return authAxiosInstance.put(`${bussiness_route}/updateBusiness`, body);
};
