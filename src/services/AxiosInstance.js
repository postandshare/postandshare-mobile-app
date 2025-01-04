import axios from 'axios';
import {store} from './store';
import {setLoginState, setLogout} from './reducer/AuthSlice';
import Config from 'react-native-config';

const baseURL = Config.AUTH_URL;
const authAxiosInstance = axios.create({
  // baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const imageGeneratorInstance = axios.create({
  baseURL: 'https://chatgpt-42.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '4eb11934dbmsh336c17955cb9994p197298jsnb9fcbe87daf4',
    'Content-Type': 'application/json',
  },
});

authAxiosInstance.interceptors.request.use(async req => {
  const {
    auth: {login_Data},
  } = store.getState();

  console.log('in auth url', req?.url, req?.params, req?.data);
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
      req.headers['Authorization'] = `Bearer ${data?.accessToken}`;
      return req;
    }
  } catch (error) {
    const {dispatch} = store;
    dispatch(setLogout());
  }

  req.headers['Authorization'] = `Bearer ${login_Data?.token}`;
  return req;
});

authAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    let errorResponse = error?.response?.data?.message
      ? error
      : {
          response: {
            data: {
              message: 'Something went wrong',
            },
          },
        };

    return Promise.reject(errorResponse);
  },
);

export {authAxiosInstance, imageGeneratorInstance};
