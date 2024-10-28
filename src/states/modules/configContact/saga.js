import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app';
import { getNotification } from '@/utils/helper';
import {
  setErrorConfigContact,
  updateConfigContactFailure,
  updateConfigContactSuccess,
} from '.';
import { handleGetConfigContact } from '@/api/configContact';

function* loadRouteData() {
  yield put(setTitlePage('Cấu hình liên hệ'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/config-management',
        name: 'Cấu hình',
      },
      {
        path: '/config-management/contact',
        name: 'Cấu hình liên hệ',
      },
    ])
  );
  yield put(handleGetConfigContact())
  yield put(setErrorConfigContact({}))
}

function* handleActions() {
  yield takeLatest(updateConfigContactSuccess, function () {
    getNotification('success', 'Cập nhật thành công.');
  
  });

  yield takeLatest(updateConfigContactFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;
      yield put(setErrorConfigContact(errors)
      );
    } else {
      getNotification('error', 'Cập nhật thất bại.');
    }
  });
}

export default function* loadConfigContactSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
