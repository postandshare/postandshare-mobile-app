import axios from 'axios';
import {store} from './store';
import {setLoginState, setLogout} from './reducer/AuthSlice';
const baseURL = 'https://postandshare-content-service-zm5xloquaa-em.a.run.app';
const authAxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
authAxiosInstance.interceptors.request.use(async req => {
  const {
    authStore: {login_Data},
  } = store.getState();
  try {
    const currentTime = new Date().getTime();
    if (currentTime > login_Data?.exp) {
      const body = {
        refreshToken: login_Data?.refreshToken,
      };
      const {data} = await axios.post(`${baseURL}/auth/refreshToken`, body);
      const newData = {
        ...data,
        token: data?.accessToken,
      };
      const {dispatch} = store;
      dispatch(setLoginState(newData));
      req.headers['Authorization'] = `Bearer ${data?.accessToken?.token}`;
      return req;
    }
  } catch (error) {
    const {dispatch} = store;
    dispatch(setLogout());
  }

  req.headers['Authorization'] = `Bearer ${login_Data?.token}`;

  return req;
});
