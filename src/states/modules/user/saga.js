import {
  all, fork, put, takeLatest, call, select
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";
import {
  requestChangeStatusFail,
  requestChangeStatusSuccess,
  requestCreateFail,
  requestCreateSuccess, requestDeleteFail, requestDeleteSuccess,
  requestResetPasswordFail, requestResetPasswordSuccess,
  requestUpdateFail,
  requestUpdateSuccess, setDataFilter,
  setErrorCreateOrUpdate, setErrorResetPassword
} from "./index.js";
import _ from "lodash";
import {getListUsers} from "../../../api/user/index.js";
import {userInitialData} from "./initialState.js";

function* loadRouteData () {
  yield put(setTitlePage('Quản lý quản trị viên'));
  yield put(setBreadcrumb([
    {
      path: '/',
      name: 'Trang chủ'
    },
    {
      path: '/account-management',
      name: 'Danh sách quản trị viên'
    },
  ]))
  yield put(setDataFilter(userInitialData.dataFilter));
  yield put(getListUsers(userInitialData.dataFilter));
}

function* handleActions () {
  yield takeLatest(requestCreateSuccess, function* () {
    getNotification('success', 'Tạo mới quản trị viên thành công.');
    yield put(setDataFilter(userInitialData.dataFilter));
    yield put(getListUsers());
  });

  yield takeLatest(requestCreateFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorCreateOrUpdate({
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

  yield takeLatest(requestUpdateSuccess, function* () {
    getNotification('success', 'Cập nhật quản trị viên thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListUsers(dataFilter));
  });

  yield takeLatest(requestUpdateFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorCreateOrUpdate({
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

  yield takeLatest(requestResetPasswordSuccess, function* () {
    yield call(getNotification, 'success', 'Cập nhật mật khẩu thành công.');
  });

  yield takeLatest(requestResetPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.errors
      yield put(setErrorResetPassword({
        password: _.get(errors,'password[0]',''),
        confirmPassword: _.get(errors,'confirm_password[0]',''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestDeleteSuccess, function* () {
    getNotification('success', 'Xóa quản trị viên thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListUsers(dataFilter));
  });

  yield takeLatest(requestDeleteFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestChangeStatusSuccess, function* () {
    getNotification('success', 'Thay đổi trạng thái thành công.');
    const {user} = yield select();
    const dataFilter = user.dataFilter
    yield put(getListUsers(dataFilter));
  });

  yield takeLatest(requestChangeStatusFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadUserSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
