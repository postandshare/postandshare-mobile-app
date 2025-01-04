import {authAxiosInstance} from '../AxiosInstance';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const political_route = `${baseURL}/political`;

//addPoliticalParty
export const addPoliticalParty = body => {
  return authAxiosInstance.post(`${political_route}/addPoliticalParty`, body);
};

//updatePartySymbol
export const updatePartySymbol = body => {
  return authAxiosInstance.put(`${political_route}/updatePartySymbol`, body);
};

//updatePartySymbol
export const updatePartyLogo = body => {
  return authAxiosInstance.put(`${political_route}/updatePartyLogo`, body);
};

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

//updatePoliticalParty
export const updatePoliticalParty = body => {
  return authAxiosInstance.put(`${political_route}/updatePoliticalParty`, body);
};

//updatePoliticalLeader
export const updatePoliticalLeader = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalLeader`,
    body,
  );
};

//updateStatusOfLeader
export const updateStatusOfLeader = body => {
  return authAxiosInstance.put(`${political_route}/updateStatusOfLeader`, body);
};

//deletePoliticalParty
export const deletePoliticalParty = body => {
  return authAxiosInstance.delete(
    `${political_route}/deletePoliticalParty/${body?.languageDocId}`,
  );
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

//DeletePoliticalLeader
export const DeletePoliticalLeader = body => {
  return authAxiosInstance.delete(
    `${political_route}/DeletePoliticalLeader/${body?.languageDocId}`,
  );
};
