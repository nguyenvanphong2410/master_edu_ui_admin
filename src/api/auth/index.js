import callApi from "../callApi";
import {
  startRequestForgotPassword, startRequestForgotPasswordFail, startRequestForgotPasswordSuccess,
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,
  startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail,
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `admin/auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `admin/auth/me`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `admin/auth/forgot-password`,
    actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
    variables: {
      email: data.email
    },
    dispatch,
    getState
  })
}

export const resetPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/auth/reset-password`,
    actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
    headers: {"Authorization": data.token ? `Bearer ${data.token}` : ""},
    variables: {
      password: data.password,
    },
    dispatch,
    getState
  })
}
