import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const personalEvent_route = `${baseURL}/personalEvent`;

export const getEvents = params => {
  return authAxiosInstance.get(`${personalEvent_route}/getEvents`, {
    params,
  });
};
export const getEvent = params => {
  return authAxiosInstance.get(
    `${personalEvent_route}/getEvent/${params?.eventDocId}`,
    {
      params,
    },
  );
};
export const getReminder = params => {
  return authAxiosInstance.get(
    `${personalEvent_route}/getReminder/${params?.eventDocId}`,
    {
      params,
    },
  );
};
export const addNewEvent = body => {
  return authAxiosInstance.post(`${personalEvent_route}/addNewEvent`, body);
};
export const sendSms = body => {
  return authAxiosInstance.post(`${personalEvent_route}/sendSms`, body);
};
export const sendWhatsApp = body => {
  return authAxiosInstance.post(`${personalEvent_route}/sendWhatsApp`, body);
};
export const updateEvent = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/updateEvent`, body);
};
export const addReminders = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/addReminders`, body);
};
export const addTemplet = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/addTemplet`, body);
};
export const deleteEvent = body => {
  return authAxiosInstance.delete(
    `${personalEvent_route}/deleteEvent/${body?.eventDocId}`,
  );
};
