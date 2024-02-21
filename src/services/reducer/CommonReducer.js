import { createSlice } from "@reduxjs/toolkit";



const CommonSlice = createSlice({
    name: 'CommonSlice',
    initialState: {
        isProfileUpdated: false,
    },
    reducers: {
        setProfileUpdated: (state, action) => {
            state.isProfileUpdated = action.payload;
        },
    },
});

export default CommonSlice.reducer;

export const { setProfileUpdated} = CommonSlice.actions;
