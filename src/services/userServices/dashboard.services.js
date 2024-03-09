import {authAxiosInstance} from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const dashboard_route = `${baseURL}/dashboard`;

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
  return authAxiosInstance.get(`${dashboard_route}/getTemplatesOfGreatLeaders`, {
    params,
  });
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
