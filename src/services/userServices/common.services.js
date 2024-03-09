import {authAxiosInstance} from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const common_route = `${baseURL}/common`;

export const getBusinessCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessCategory`, {
    params,
  });
};
export const getBusinessSubCategory = params => {
  return authAxiosInstance.get(`${common_route}/getBusinessSubCategory`, {
    params,
  });
};
