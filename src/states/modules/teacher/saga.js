import {
  all, fork, put, takeLatest, call, select
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";

import _ from "lodash";
import {getListTeachers} from "../../../api/teacher/index.js";
import {teacherInitialData} from "./initialState.js";
import { requestChangeStatusFailTeacher, requestChangeStatusSuccessTeacher, requestCreateTeacherFail, requestCreateTeacherSuccess, requestDeleteTeacherFail, requestDeleteTeacherSuccess, requestResetPasswordFailTeacher, requestResetPasswordSuccessTeacher, requestUpdateTeacherFail, requestUpdateTeacherSuccess, setDataFilterTeacher, setErrorCreateOrUpdateTeacher, setErrorResetPasswordTeacher } from "./index.js";
import { getAllCourses } from "@/api/course/index.js";
import { getAllClasses } from "@/api/class/index.js";

function* loadRouteData () {
  yield put(setTitlePage('Quản lý giáo viên'));
  yield put(setBreadcrumb([
    {
      path: '/',
      name: 'Trang chủ'
    },
    {
      path: '/account-management',
      name: 'Danh sách giáo viên'
    },
  ]))
  yield put(setDataFilterTeacher(teacherInitialData));
  yield put(getListTeachers(teacherInitialData));
  yield put(getAllCourses());
  yield put(getAllClasses());
}

function* handleActions () {
  yield takeLatest(requestCreateTeacherSuccess, function* () {
    getNotification('success', 'Tạo mới giáo viên thành công.');
    yield put(setDataFilterTeacher(teacherInitialData));
    yield put(getListTeachers());
  });

  yield takeLatest(requestCreateTeacherFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorCreateOrUpdateTeacher({
        name: _.get(errors,'name',''),
        email: _.get(errors,'email',''),
        password: _.get(errors,'password',''),
        phone: _.get(errors,'phone',''),
        status: _.get(errors,'status',''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestUpdateTeacherSuccess, function* () {
    getNotification('success', 'Cập nhật giáo viên thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListTeachers(dataFilter));
  });

  yield takeLatest(requestUpdateTeacherFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorCreateOrUpdateTeacher({
        name: _.get(errors,'name',''),
        email: _.get(errors,'email',''),
        phone: _.get(errors,'phone',''),
        status: _.get(errors,'status',''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestResetPasswordSuccessTeacher, function* () {
    yield call(getNotification, 'success', 'Cập nhật mật khẩu thành công.');
  });

  yield takeLatest(requestResetPasswordFailTeacher, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.errors
      yield put(setErrorResetPasswordTeacher({
        password: _.get(errors,'password[0]',''),
        confirmPassword: _.get(errors,'confirm_password[0]',''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestDeleteTeacherSuccess, function* () {
    getNotification('success', 'Xóa giáo viên thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListTeachers(dataFilter));
  });

  yield takeLatest(requestDeleteTeacherFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestChangeStatusSuccessTeacher, function* () {
    getNotification('success', 'Thay đổi trạng thái thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListTeachers(dataFilter));
  });

  yield takeLatest(requestChangeStatusFailTeacher, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadUserSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
