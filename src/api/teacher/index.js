import {
  getAllTeacher,
  getAllTeacherFailure,
  getAllTeacherSuccess,
  requestChangeStatusFailTeacher,
  requestChangeStatusSuccessTeacher,
  requestChangeStatusTeacher,
  requestCreateTeacher,
  requestCreateTeacherFail,
  requestCreateTeacherSuccess,
  requestDeleteTeacherFail,
  requestDeleteTeacherSuccess,
  requestGetListTeachers,
  requestGetTeachersFail,
  requestGetTeachersSuccess,
  requestResetPasswordFailTeacher,
  requestResetPasswordSuccessTeacher,
  requestResetPasswordTeacher,
  requestTeacherDelete,
  requestUpdateTeacher,
  requestUpdateTeacherFail,
  requestUpdateTeacherSuccess,
} from '@/states/modules/teacher';
import callApi from '../callApi';
import _ from 'lodash';

export const requestGetAllTeachers = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'user/teacher/all',
    actionTypes: [getAllTeacher, getAllTeacherSuccess, getAllTeacherFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const getListTeachers = (dataFilter) => async (dispatch, getState) => {
  let path = `admin/teacher`;
  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
    }

    if (dataFilter && dataFilter.course_id_of_teacher) {
      path += `&course_id_of_teacher=${dataFilter.course_id_of_teacher}`;
    }

    if (dataFilter && dataFilter.class_id_of_teacher) {
      path += `&class_id_of_teacher=${dataFilter.class_id_of_teacher}`;
    }
  }
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [requestGetListTeachers, requestGetTeachersSuccess, requestGetTeachersFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const createTeacher = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: `admin/teacher`,
    actionTypes: [requestCreateTeacher, requestCreateTeacherSuccess, requestCreateTeacherFail],
    variables: { ...data },
    dispatch,
    getState,
    headers,
  });
};

export const updateTeacher = (userId, dataTeacher) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataNew = _.cloneDeep(dataTeacher);
  delete dataTeacher?._id;

  if (dataNew.avatar !== 'delete' && typeof dataNew.avatar === 'string') {
    delete dataNew.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin/teacher/${userId}`,
    actionTypes: [requestUpdateTeacher, requestUpdateTeacherSuccess, requestUpdateTeacherFail],
    variables: { ...dataNew },
    dispatch,
    getState,
    headers,
  });
};

export const deleteTeacher = (userId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin/teacher/${userId}`,
    actionTypes: [requestTeacherDelete, requestDeleteTeacherSuccess, requestDeleteTeacherFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const resetPasswordTeacher = (userId, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/teacher/${userId}/change-password`,
    actionTypes: [requestResetPasswordTeacher, requestResetPasswordSuccessTeacher, requestResetPasswordFailTeacher],
    variables: {
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    dispatch,
    getState,
  });
};

export const changeStatusTeacher = (userId, userStatus) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/teacher/${userId}/change-status`,
    actionTypes: [requestChangeStatusTeacher, requestChangeStatusSuccessTeacher, requestChangeStatusFailTeacher],
    variables: {
      status: userStatus,
    },
    dispatch,
    getState,
  });
};
