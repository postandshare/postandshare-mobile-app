import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const personalEvent_route = `${baseURL}/personalEvent`;

//getEvents
export const getEvents = params => {
  return authAxiosInstance.get(`${personalEvent_route}/getEvents`, {
    params,
  });
};

//getAllEvents
export const getAllEvents = params => {
  return authAxiosInstance.get(`${personalEvent_route}/getAllEvents`, {
    params,
  });
};

//getEvent
export const getEvent = params => {
  return authAxiosInstance.get(
    `${personalEvent_route}/getEvent/${params?.eventDocId}`,
    {
      params,
    },
  );
};

//getReminder
export const getReminder = params => {
  return authAxiosInstance.get(
    `${personalEvent_route}/getReminder/${params?.eventDocId}`,
    {
      params,
    },
  );
};

//addNewEvent
export const addNewEvent = body => {
  return authAxiosInstance.post(`${personalEvent_route}/addNewEvent`, body);
};

//sendSms
export const sendSms = body => {
  return authAxiosInstance.post(`${personalEvent_route}/sendSms`, body);
};

//sendWhatsApp
export const sendWhatsApp = body => {
  return authAxiosInstance.post(`${personalEvent_route}/sendWhatsApp`, body);
};

//updateEvent
export const updateEvent = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/updateEvent`, body);
};

//addReminders
export const addReminders = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/addReminders`, body);
};

// addTemplet
export const addTemplet = body => {
  return authAxiosInstance.patch(`${personalEvent_route}/addTemplet`, body);
};

//deleteEvent
export const deleteEvent = body => {
  return authAxiosInstance.delete(
    `${personalEvent_route}/deleteEvent/${body?.eventDocId}`,
  );
};
