import { authAxiosInstance } from '../AxiosInstance';

const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const user_route = `${baseURL}/frame`;


export const getOrgFrame = params => {
    return authAxiosInstance.get(
      `${user_route}/getOrgFrame`,
      {
        params,
      },
    );
  };

