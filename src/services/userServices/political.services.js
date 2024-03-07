import {authAxiosInstance} from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const political_route = `${baseURL}/political`;

export const getAllPartyDetails = params => {
  return authAxiosInstance.get(`${political_route}/getAllPartyDetails`, {
    params,
  });
};

export const getLeaderDetail = params => {
  return authAxiosInstance.get(`${political_route}/getLeaderDetail`, {
    params,
  });
};

export const getPoliticalPartyDetails = params => {
  return authAxiosInstance.get(`${political_route}/getPoliticalPartyDetails`, {
    params,
  });
};

export const addPoliticalBusiness = body => {
  return authAxiosInstance.post(
    `${political_route}/addPoliticalBusiness`,
    body,
  );
};
export const addPoliticalLeader = body => {
  return authAxiosInstance.post(
    `${political_route}/addPoliticalLeader`,
    body,
  );
};

export const updatePoliticalParty = body => {
  return authAxiosInstance.put(`${political_route}/updatePoliticalParty`, body);
};

export const updatePoliticalLeader = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalLeader`,
    body,
  );
};

export const updateStatusOfLeader = body => {
  return authAxiosInstance.put(`${political_route}/updateStatusOfLeader`, body);
};

export const updatePoliticalBusiness = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusiness`,
    body,
  );
};

export const updatePoliticalBusinessLogo = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusinessLogo`,
    body,
  );
};
export const updatePoliticalVolunteerPhoto = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalVolunteerPhoto`,
    body,
  );
};

export const updatePoliticalBusinessLeader = body => {
  return authAxiosInstance.put(
    `${political_route}/updatePoliticalBusinessLeader`,
    body,
  );
};

export const deletePoliticalParty = body => {
  return authAxiosInstance.delete(
    `${political_route}/deletePoliticalParty/${body?.languageDocId}`,
  );
};
export const deletePoliticalBusiness = body => {
  return authAxiosInstance.delete(
    `${political_route}/deletePoliticalBusiness/${body?.businessDocId}`,
  );
};

export const DeletePoliticalLeader = body => {
  return authAxiosInstance.delete(
    `${political_route}/DeletePoliticalLeader/${body?.languageDocId}`,
  );
};

