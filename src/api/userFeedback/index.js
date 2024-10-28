import {
  requestCreateOrUpdateFeedback,
  requestCreateOrUpdateFeedbackFail,
  requestCreateOrUpdateFeedbackSuccess,
  requestDeleteFeedback,
  requestDeleteFeedbackFail,
  requestDeleteFeedbackSuccess,
  requestGetUserFeedback,
  requestGetUserFeedbackFail,
  requestGetUserFeedbackSuccess,
} from '@/states/modules/userFeedback';
import callApi from '../callApi';

export const handleCreateFeedback = (data) => (dispatch, getState) => {
  const variables = new FormData()
  variables.append('cover', data.cover.data)
  variables.append('avatar', data.avatar.data)
  variables.append('name', data.name)
  variables.append('content', data.content)
  return callApi({
    method: 'post',
    apiPath: 'admin/user-feedback',
    actionTypes: [
      requestCreateOrUpdateFeedback,
      requestCreateOrUpdateFeedbackSuccess,
      requestCreateOrUpdateFeedbackFail,
    ],
    variables,
    dispatch,
    getState,
  });
};

export const handleUpdateFeedback = (id, data) => (dispatch, getState) => {
  const variables = new FormData()
  variables.append('cover', data.cover.data)
  variables.append('avatar', data.avatar.data)
  variables.append('name', data.name)
  variables.append('content', data.content)
  return callApi({
    method: 'put',
    apiPath: `admin/user-feedback/${id}`,
    actionTypes: [
      requestCreateOrUpdateFeedback,
      requestCreateOrUpdateFeedbackSuccess,
      requestCreateOrUpdateFeedbackFail,
    ],
    variables,
    dispatch,
    getState,
  });
};

export const handleDeleteFeedback = (id) => (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin/user-feedback/${id}`,
    actionTypes: [requestDeleteFeedback, requestDeleteFeedbackSuccess, requestDeleteFeedbackFail],
    dispatch,
    getState,
  });
};

export const handleGetUserFeedback = () => (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'admin/user-feedback',
    actionTypes: [requestGetUserFeedback, requestGetUserFeedbackSuccess, requestGetUserFeedbackFail],
    dispatch,
    getState,
  });
};
