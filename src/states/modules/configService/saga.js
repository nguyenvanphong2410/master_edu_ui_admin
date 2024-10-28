import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app';
import { handleGetInfoConfigServices } from '@/api/configService';
import { getNotification } from '@/utils/helper';
import { setErrorInfoConfigServices, updateConfigServiceFailure, updateConfigServiceSuccess } from '.';

function* loadRouteData() {
  yield put(setTitlePage('Cấu hình dịch vụ'));
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
        path: '/config-management/service',
        name: 'Danh sách dịch vụ',
      },
    ])
  );
  yield put(handleGetInfoConfigServices());
  yield put(
    setErrorInfoConfigServices({
      config_services: '',
    })
  );
}

function* handleActions() {
  yield takeLatest(updateConfigServiceSuccess, function* () {
    getNotification('success', 'Cập nhật thành công.');
    yield put(handleGetInfoConfigServices());
  });

  yield takeLatest(updateConfigServiceFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(setErrorInfoConfigServices({ ...errors }));
    } else {
      getNotification('error', 'Cập nhật thất bại.');
    }
  });
}

export default function* loadConfigServiceSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
