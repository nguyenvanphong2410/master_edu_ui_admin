import { createSlice } from '@reduxjs/toolkit';

const configContactSlice = createSlice({
  name: 'configContact',
  initialState: {
    isLoadingConfigContact: false,
    isLoadingUpdateConfigContact: false,
    listContact: {},
    errorContact: {},
  },
  reducers: {
    getListConfigContact: (state) => ({
      ...state,
      isLoadingConfigContact: true,
    }),
    getListConfigContactSuccess: (state, action) => ({
      ...state,
      isLoadingConfigContact: false,
      listContact: {
        ...action.payload.data,
        socials: action.payload.data.socials || []
      }
    }),
    getListConfigContactFailure: (state) => ({
      ...state,
      isLoadingConfigContact: false,
    }),
    setConfigContact: (state, action) => ({
      ...state,
      listContact: action.payload,
    }),
    setErrorConfigContact: (state, action) => ({
      ...state,
      errorContact: action.payload,
    }),
    updateConfigContact: (state) => ({
      ...state,
      isLoadingUpdateConfigContact: true,
    }),
    updateConfigContactSuccess: (state) => ({
      ...state,
      isLoadingUpdateConfigContact: false,
    }),
    updateConfigContactFailure: (state) => ({
      ...state,
      isLoadingUpdateConfigContact: false,
    }),
  },
});

export const {
  getListConfigContact,
  getListConfigContactSuccess,
  getListConfigContactFailure,
  setConfigContact,
  setErrorConfigContact,
  updateConfigContact,
  updateConfigContactFailure,
  updateConfigContactSuccess,
} = configContactSlice.actions;

export default configContactSlice.reducer;
