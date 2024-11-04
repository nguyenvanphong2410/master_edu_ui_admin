import callApi from '@/api/callApi';
import {
  getListStudentOfClass,
  getListStudentOfClassFailure,
  getListStudentOfClassSuccess,
  getScoreOfStudentOfClass,
  getScoreOfStudentOfClassFailure,
  getScoreOfStudentOfClassSuccess,
} from '@/states/modules/class';

export const requestGetListStudentOfClass = (idClass) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/admin/score/${idClass}`,
    actionTypes: [getListStudentOfClass, getListStudentOfClassSuccess, getListStudentOfClassFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestScoreOfStudentOfClass = (idStudent, idClass) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/admin/score/score-of-student-of-class/${idStudent}/${idClass}`,
    actionTypes: [getScoreOfStudentOfClass, getScoreOfStudentOfClassSuccess, getScoreOfStudentOfClassFailure],
    variables: {},
    dispatch,
    getState,
  });
};
