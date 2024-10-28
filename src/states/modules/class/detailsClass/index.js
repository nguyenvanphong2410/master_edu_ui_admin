import {createSlice} from '@reduxjs/toolkit';

const detailsDocSlice = createSlice({
  name: 'detailsDoc',
  initialState: {
    classDetails: {},
  },
  reducers: {
    getListDetailsClass: (state) => ({
      ...state,
    }),
    getListDetailsClassSuccess: (state, action) => ({
      ...state,
      isLoadingTableDetailsClass: false,
      classDetails: action.payload.data,
    }),
    getListDetailsClassFailure: (state) => ({
      ...state,
    }),
  },
});

export const {getListDetailsClass, getListDetailsClassSuccess, getListDetailsClassFailure} =
  detailsDocSlice.actions;
export default detailsDocSlice.reducer;
