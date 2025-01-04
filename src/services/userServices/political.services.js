import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const political_route = `${baseURL}/political`;

//getAllPartyDetails
export const getAllPartyDetails = params => {
  return authAxiosInstance.get(`${political_route}/getAllPartyDetails`, {
    params,
  });
};

//getLeaderDetail
export const getLeaderDetail = params => {
  return authAxiosInstance.get(`${political_route}/getLeaderDetail`, {
    params,
  });
};

//addPoliticalLeader
export const addPoliticalLeader = body => {
  return authAxiosInstance.post(`${political_route}/addPoliticalLeader`, body);
};

//deletePoliticalBusiness
export const deletePoliticalBusiness = body => {
  return authAxiosInstance.delete(
    `${political_route}/deletePoliticalBusiness/${body?.businessDocId}`,
  );
};

//getPoliticalPartyDetails
export const getPoliticalPartyDetails = params => {
  return authAxiosInstance.get(`${political_route}/getPoliticalPartyDetails`, {
    params,
  });
};

//addPoliticalBusiness
export const addPoliticalBusiness = body => {
  return authAxiosInstance.post(
    `${political_route}/addPoliticalBusiness`,
    body,
  );
};

//updatePoliticalBusiness
export const updatePoliticalBusiness = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusiness`,
    body,
  );
};

//updatePoliticalBusinessLogo
export const updatePoliticalBusinessLogo = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusinessLogo`,
    body,
  );
};

//updatePoliticalVolunteerPhoto
export const updatePoliticalVolunteerPhoto = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalVolunteerPhoto`,
    body,
  );
};

//updatePoliticalBusinessLeader
export const updatePoliticalBusinessLeader = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusinessLeader`,
    body,
  );
};
