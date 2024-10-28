import { createSlice } from "@reduxjs/toolkit";
import { errInfoProfile, initInfoProfile } from "./initState";

const authSlice = createSlice({
  name: 'profile',
  initialState: {
    infoProfile: initInfoProfile,
    errorInformation: errInfoProfile,
    isLoadingBtnInformation: false,
    dataChangePassword: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    errorChangePassword: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    isLoadingBtnChangePassword: false,
  },
  reducers: {
    setInfoProfile: (state, action) => ({
      ...state,
      infoProfile: action.payload
    }),
    setErrorInformation: (state, action) => ({
      ...state,
      errorInformation: action.payload
    }),
    startRequestUpdateInformation: state => ({
      ...state,
      isLoadingBtnInformation: true
    }),
    startRequestUpdateInformationSuccess: state => ({
      ...state,
      isLoadingBtnInformation: false
    }),
    startRequestUpdateInformationFail: state => ({
      ...state,
      isLoadingBtnInformation: false
    }),
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload
    }),
    setDataChangePassword: (state, action) => ({
      ...state,
      dataChangePassword: action.payload
    }),
    startRequestChangePassword: state => ({
      ...state,
      isLoadingBtnChangePassword: true
    }),
    requestChangePasswordSuccess: state => ({
      ...state,
      isLoadingBtnChangePassword: false
    }),
    requestChangePasswordFail: state => ({
      ...state,
      isLoadingBtnChangePassword: false
    }),
  }
})

export const {
  setInfoProfile,
  setErrorInformation, setErrorChangePassword, setDataChangePassword,
  startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail,
  startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail
} = authSlice.actions

export default authSlice.reducer;
