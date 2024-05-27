import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const notification_route = `${baseURL}/userSelf`;

export const getNotifications = params => {
  return authAxiosInstance.get(`${notification_route}/getNotifications`, {
    params,
  });
};
export const updateReadStatus = body => {
  return authAxiosInstance.put(`${notification_route}/updateReadStatus`, body);
};

export const deleteNotification = body => {
  return authAxiosInstance.delete(
    `${notification_route}/deleteNotification/${body}`,
  );
};
