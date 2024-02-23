import {authAxiosInstance} from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const bussiness_route = `${baseURL}/business`;

export const getAllBusinessList = params => {
  return authAxiosInstance.get(`${bussiness_route}/getAllBusinessList`, {
    params,
  });
};
export const updateBusinessPartner = body => {
  return authAxiosInstance.put(
    `${bussiness_route}/updateBusinessPartner`,
    body,
  );
};
export const addBusiness = body => {
  return authAxiosInstance.post(`${bussiness_route}/addBusiness`, body);
};
export const updateBusinessActiveness = body => {
  return authAxiosInstance.put(
    `${bussiness_route}/updateBusinessActiveness`,
    body,
  );
};
export const deleteBusiness = body => {
  return authAxiosInstance.delete(
    `${bussiness_route}/deleteBusiness/${body?.bussinessDocId}`,
  );
};
export const changeBusinessLogo = body => {
  return authAxiosInstance.put(`${bussiness_route}/changeBusinessLogo`, body);
};

export const addBusinessPartner = body => {
  return authAxiosInstance.post(`${bussiness_route}/addBusinessPartner`, body);
};
