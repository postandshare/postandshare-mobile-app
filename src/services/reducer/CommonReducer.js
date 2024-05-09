import {createSlice} from '@reduxjs/toolkit';

const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: {
    isProfileUpdated: false,
    userDetails: {},
  },
  reducers: {
    setProfileUpdated: (state, action) => {
      state.isProfileUpdated = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export default CommonSlice.reducer;

export const {setProfileUpdated, setUserDetails} = CommonSlice.actions;
