import Config from 'react-native-config';
import {authAxiosInstance} from '../AxiosInstance';

const baseURL = Config.AUTH_URL;
const user_route = `${baseURL}/userSelf`;

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

//updateSelfProfile
export const updateUserProfile = body => {
  return authAxiosInstance.put(`${user_route}/updateSelfProfile`, body);
};

//updateSelfPhoto
export const updateSelfPhoto = body => {
  return authAxiosInstance.put(`${user_route}/updateSelfPhoto`, body);
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

//saveAppNotificationToken
export const saveAppNotificationToken = body => {
  return authAxiosInstance.put(`${user_route}/saveAppNotificationToken`, body);
};
