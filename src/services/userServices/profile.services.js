import Config from 'react-native-config';
import { authAxiosInstance } from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const user_route = `${baseURL}/userSelf`;


export const getUserProfile = params => {
    return authAxiosInstance.get(
      `${user_route}/getUserProfile`,
      {
        params,
      },
    );
  };
export const getSelectedRegionalLanguages = params => {
    return authAxiosInstance.get(
      `${user_route}/getSelectedRegionalLanguages`,
      {
        params,
      },
    );
  };

  export const updateUserProfile = body => {
    return authAxiosInstance.put(
      `${user_route}/updateSelfProfile`,
      body,
    );
  };
  export const upsertRegionalLanguage = body => {
    return authAxiosInstance.put(
      `${user_route}/upsertRegionalLanguage`,
      body,
    );
  };

  export const deleteRegionalLanguage = body => {
    return authAxiosInstance.delete(
      `${user_route}/deleteRegionalLanguage/${body?.languageDocId}`,
    );
  };
  
  export const updateSelfPhoto = body => {
    return authAxiosInstance.put(
      `${user_route}/updateSelfPhoto`,
      body,
    );
  };


