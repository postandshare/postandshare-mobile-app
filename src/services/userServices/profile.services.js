import Config from 'react-native-config';
import {authAxiosInstance} from '../AxiosInstance';

const baseURL = Config.AUTH_URL;
const user_route = `${baseURL}/userSelf`;
const auth_route = `${baseURL}/auth`;

//getUserProfile
export const getUserProfile = params => {
  return authAxiosInstance.get(`${auth_route}/getUserProfile`, {
    params,
  });
};

//getNotifications
export const getNotifications = params => {
  return authAxiosInstance.get(`${user_route}/getNotifications`, {
    params,
  });
};

//updateReadStatus
export const updateReadStatus = body => {
  return authAxiosInstance.put(`${user_route}/updateReadStatus`, body);
};

//deleteNotification
export const deleteNotification = body => {
  return authAxiosInstance.delete(
    `${user_route}/deleteNotification/${body?.notificationDocId}`,
  );
};

//updateDefaultAppLanguage
export const updateDefaultAppLanguage = body => {
  return authAxiosInstance.put(`${user_route}/updateDefaultAppLanguage`, body);
};

//getSelectedRegionalLanguages
export const getSelectedRegionalLanguages = params => {
  return authAxiosInstance.get(`${user_route}/getSelectedRegionalLanguages`, {
    params,
  });
};

//getAllRatings
export const getAllRatings = params => {
  return authAxiosInstance.get(`${user_route}/getAllRatings`, {
    params,
  });
};

//getRatingBySelf
export const getRatingBySelf = params => {
  return authAxiosInstance.get(`${user_route}/getRatingBySelf`, {
    params,
  });
};

//upsertRatingBySelf
export const upsertRatingBySelf = body => {
  return authAxiosInstance.put(`${user_route}/upsertRatingBySelf`, body);
};

//updateSelfProfile
export const updateUserProfile = body => {
  return authAxiosInstance.put(`${user_route}/updateSelfProfile`, body);
};

//saveAppNotificationToken
export const saveAppNotificationToken = body => {
  return authAxiosInstance.put(`${user_route}/saveAppNotificationToken`, body);
};

//upsertRegionalLanguage
export const upsertRegionalLanguage = body => {
  return authAxiosInstance.put(`${user_route}/upsertRegionalLanguage`, body);
};

//deleteRegionalLanguage
export const deleteRegionalLanguage = body => {
  return authAxiosInstance.delete(
    `${user_route}/deleteRegionalLanguage/${body?.languageDocId}`,
  );
};

//updateSelfPhoto
export const updateSelfPhoto = body => {
  return authAxiosInstance.put(`${user_route}/updateSelfPhoto`, body);
};
