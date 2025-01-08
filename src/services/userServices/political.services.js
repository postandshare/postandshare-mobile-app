import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const political_route = `${baseURL}/political`;

export const addPoliticalProfile = body =>
  authAxiosInstance.post(`${political_route}/addPoliticalProfile`, body);

export const getAllPartyDetails = params =>
  authAxiosInstance.get(`${political_route}/getAllPartyDetails`, {
    params,
  });
export const getPoliticalProfile = params =>
  authAxiosInstance.get(`${political_route}/getPoliticalProfile`, {
    params,
  });

//getLeaderDetail
export const getLeaderDetail = params =>
  authAxiosInstance.get(`${political_route}/getLeaderDetail`, {
    params,
  });

//addPoliticalLeader
export const addPoliticalLeader = body =>
  authAxiosInstance.post(`${political_route}/addPoliticalLeader`, body);

//deletePoliticalBusiness
export const deletePoliticalBusiness = body =>
  authAxiosInstance.delete(
    `${political_route}/deletePoliticalBusiness/${body?.businessDocId}`,
  );

//getPoliticalPartyDetails
export const getPoliticalPartyDetails = params =>
  authAxiosInstance.get(`${political_route}/getPoliticalPartyDetails`, {
    params,
  });

//addPoliticalBusiness
export const addPoliticalBusiness = body =>
  authAxiosInstance.post(`${political_route}/addPoliticalBusiness`, body);

//updatePoliticalBusiness
export const updatePoliticalBusiness = body =>
  authAxiosInstance.put(`${political_route}/updatePoliticalBusiness`, body);

//updatePoliticalBusinessLogo
export const updatePoliticalBusinessLogo = body =>
  authAxiosInstance.put(`${political_route}/updatePoliticalBusinessLogo`, body);

//updatePoliticalVolunteerPhoto
export const updatePoliticalVolunteerPhoto = body =>
  authAxiosInstance.put(
    `${political_route}/updatePoliticalVolunteerPhoto`,
    body,
  );

//updatePoliticalBusinessLeader
export const updatePoliticalBusinessLeader = body =>
  authAxiosInstance.put(
    `${political_route}/updatePoliticalBusinessLeader`,
    body,
  );
