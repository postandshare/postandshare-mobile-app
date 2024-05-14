import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const userPost_route = `${baseURL}/userPost`;

export const addUserPost = body => {
  return authAxiosInstance.post(`${userPost_route}/addUserPost`, body);
};
export const getUserPost = params => {
  return authAxiosInstance.get(`${userPost_route}/getUserPost`, {
    params,
  });
};

export const deleteUserPost = body => {
  return authAxiosInstance.delete(
    `${userPost_route}/deleteUserPost/${body?.postDocId}`,
  );
};
