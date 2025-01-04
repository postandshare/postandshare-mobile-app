import {authAxiosInstance} from '../AxiosInstance';

import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const dashboard_route = `${baseURL}/mobileDashboard`;

export const getTemplatesForQuotes = params => {
  return authAxiosInstance.get(`${dashboard_route}/getTemplatesForQuotes`, {
    params,
  });
};
export const getTemplatesByDate = params => {
  return authAxiosInstance.get(`${dashboard_route}/getTemplatesByDate`, {
    params,
  });
};
export const getTemplatesOfGreatLeaders = params => {
  return authAxiosInstance.get(
    `${dashboard_route}/getTemplatesOfGreatLeaders`,
    {
      params,
    },
  );
};
export const getTrendingTemlpates = params => {
  return authAxiosInstance.get(`${dashboard_route}/getTrendingTemlpates`, {
    params,
  });
};
export const getTemplatesByBusiness = params => {
  return authAxiosInstance.get(`${dashboard_route}/getTemplatesByBusiness`, {
    params,
  });
};
export const getRelatedTemplet = params => {
  return authAxiosInstance.get(
    `${dashboard_route}/getRelatedTemplet/${params?.photoEntityId}`,
  );
};
