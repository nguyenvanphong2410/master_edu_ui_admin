import callApi from "../callApi.js";
import {
  startRequestGetListUsers,
  requestGetUsersSuccess,
  requestGetUsersFail,
  startRequestCreate,
  requestCreateSuccess,
  requestCreateFail,
  startRequestUpdate,
  requestUpdateSuccess,
  requestUpdateFail,
  startRequestDelete,
  requestDeleteSuccess,
  requestDeleteFail,
  startRequestResetPassword,
  requestResetPasswordSuccess,
  requestResetPasswordFail,
  startRequestChangeStatus,
  requestChangeStatusSuccess,
  requestChangeStatusFail
} from '../../states/modules/user/index.js'
import _ from "lodash";

export const getListUsers = (dataFilter) => async (dispatch, getState) => {
  let path = `admin-management`;
  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
    }
  }
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [startRequestGetListUsers, requestGetUsersSuccess, requestGetUsersFail],
    variables: {},
    dispatch,
    getState
  })
}

export const createUser = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: `admin-management`,
    actionTypes: [startRequestCreate, requestCreateSuccess, requestCreateFail],
    variables: { ...data },
    dispatch,
    getState,
    headers,
  })
}

export const updateUser = (userId, dataAdmin) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataNew = _.cloneDeep(dataAdmin);
  delete dataAdmin?._id;

  if (dataNew.avatar !== 'delete' && typeof dataNew.avatar === 'string') {
    delete dataNew.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin-management/${userId}`,
    actionTypes: [startRequestUpdate, requestUpdateSuccess, requestUpdateFail],
    variables: { ...dataNew },
    dispatch,
    getState,
    headers
  })
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin-management/${userId}`,
    actionTypes: [startRequestDelete, requestDeleteSuccess, requestDeleteFail],
    variables: {},
    dispatch,
    getState
  })
}

export const resetPasswordUser = (userId, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin-management/${userId}/change-password`,
    actionTypes: [startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail],
    variables: {
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    dispatch,
    getState
  })
}

export const changeStatusUser = (userId, userStatus) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin-management/${userId}/change-status`,
    actionTypes: [startRequestChangeStatus, requestChangeStatusSuccess, requestChangeStatusFail],
    variables: {
      status: userStatus
    },
    dispatch,
    getState
  })
}
