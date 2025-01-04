import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const eventTemplate_route = `${baseURL}/eventTemplets`;

export const getTemplets = params => {
  return authAxiosInstance.get(`${eventTemplate_route}/getTemplets`, {
    params,
  });
};

// createTemplet
export const createTemplet = body => {
  return authAxiosInstance.post(`${eventTemplate_route}/createTemplet`, body);
};

//getTemplets
export const getTemplet = params => {
  return authAxiosInstance.get(
    `${eventTemplate_route}/getTemplet/${params?.templetDocId}`,
    {
      params,
    },
  );
};

//deleteTemplet
export const deleteTemplet = body => {
  return authAxiosInstance.delete(
    `${eventTemplate_route}/deleteTemplet/${body?.templetDocId}`,
  );
};

//update
export const update = body => {
  return authAxiosInstance.patch(`${eventTemplate_route}/update`, body);
};
