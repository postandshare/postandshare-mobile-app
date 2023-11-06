import {createSlice} from '@reduxjs/toolkit';
import {persistor} from '../store';

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    login_Data: '',
    login_isError: '',
    login_isLoading: false,
    onBoarding: '',
  },
  reducers: {
    setLoginState: (state, action) => {
      state.login_Data = action.payload;
    },
    setOnBoarding: (state, action) => {
      state.onBoarding = action.payload;
    },
  },
  setLogout: (state, action) => {
    state.login_Data = '';
    state.login_isError = '';
    state.login_isLoading = false;
    persistor.purge();
  },
});
export default AuthSlice.reducer;
export const {setOnBoarding, setLoginState, setLogout} = AuthSlice.actions;
