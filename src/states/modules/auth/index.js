import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser:{},
    errorLogin: {
      email: '',
      password: ''
    },
    isLoadingBtnLogin: false,
    errorForgotPassword: {
      email: ''
    },
    isLoadingBtnForgotPassword: false,
    errorResetPassword: {
      password: '',
      confirmPassword: ''
    },
    isLoadingBtnResetPassword: false,
  },
  reducers: {
    setErrorLogin: (state, action) => ({
      ...state,
      errorLogin: action.payload
    }),
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => {
      return {
        ...state,
        isAuthSuccess: true,
        authUser: action.payload.data
      };
    },
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    setErrorForgotPassword: (state, action) => ({
      ...state,
      errorForgotPassword: action.payload
    }),
    startRequestForgotPassword: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: true
    }),
    startRequestForgotPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestForgotPasswordFail: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    setErrorResetPassword: (state, action) => ({
      ...state,
      errorResetPassword: action.payload
    }),
    startRequestResetPassword: (state) => ({
      ...state,
      isLoadingBtnResetPassword: true
    }),
    startRequestResetPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false
    }),
    startRequestResetPasswordFail: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false
    }),
    setAuthSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: action.payload
    }),
  }
})

export const {
  setErrorLogin, setErrorForgotPassword, setErrorResetPassword, setAuthSuccess,
  startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
  startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
  startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
  startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail,
} = authSlice.actions

export default authSlice.reducer;
