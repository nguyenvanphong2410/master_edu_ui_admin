import {
  all, fork, takeLatest, put
} from "redux-saga/effects";
import {
  requestChangePasswordFail,
  requestChangePasswordSuccess, setDataChangePassword,
  setErrorInformation, setErrorChangePassword,
  startRequestUpdateInformationFail, startRequestUpdateInformationSuccess
} from "./index.js";
import {getNotification} from "../../../utils/helper.js";
import _ from "lodash";
import {getMe} from "../../../api/auth/index.js";

function* loadRouteData () {
  //
}

function* handleActions () {
  yield takeLatest(startRequestUpdateInformationSuccess, function* () {
    getNotification('success', 'Cập nhật thông tin thành công.');
    yield put(getMe());
  })

  yield takeLatest(startRequestUpdateInformationFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorInformation({
        name: _.get(errors,'name',''),
        phone: _.get(errors,'phone',''),
      }));
    } else if (statusError === 401) {
      const message = action.payload.data.message;
      getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestChangePasswordSuccess, function* () {
    getNotification('success', 'Thay đổi mật khẩu thành công.');
    yield put(setDataChangePassword({
      currentPassword: '',
      password: '',
      confirmPassword: '',
    }));
  })

  yield takeLatest(requestChangePasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorChangePassword({
        currentPassword: _.get(errors,'password',''),
        password: _.get(errors,'new_password',''),
      }));
    } else if (statusError === 401) {
      const message = action.payload.data.message;
      const errors = action.payload.data.detail;
      if (errors) {
        yield put(setErrorChangePassword({
          currentPassword: _.get(errors,'password',''),
          password: _.get(errors,'new_password',''),
        }));
      } else {
        getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
      }
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
}

export default function* loadProfileSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
