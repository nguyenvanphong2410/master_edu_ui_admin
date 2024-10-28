import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app';
import { handleGetUserFeedback } from '@/api/userFeedback';
import {
  requestCreateOrUpdateFeedbackFail,
  requestCreateOrUpdateFeedbackSuccess,
  requestDeleteFeedbackFail,
  requestDeleteFeedbackSuccess,
  setShowModalCreateOrUpdateFeedback,
  setShowModalDeleteFeedback,
} from '.';
import { getNotification } from '@/utils/helper';
import { TYPE_MODAL_FEEDBACK } from '@/utils/constants';

function* loadRouteData() {
  yield put(setTitlePage('Nhận xét từ học viên'));
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
        path: '/config-management/user-feedback-management',
        name: 'Nhận xét từ học viên',
      },
    ])
  );
  yield put(handleGetUserFeedback());
}

function* handleActions() {
  yield takeLatest(requestDeleteFeedbackSuccess, function* () {
    yield call(getNotification, 'success', 'Xoá nhận xét thành công.');
    yield put(setShowModalDeleteFeedback(false));
    yield put(handleGetUserFeedback());
  });
  yield takeLatest(requestDeleteFeedbackFail, function* (action) {
    yield call(getNotification, 'error', action.payload?.data?.message);
  });
  yield takeLatest(requestCreateOrUpdateFeedbackSuccess, function* () {
    const configModalFeedback = yield select((state) => state.userFeedback.configModalFeedback);
    if (configModalFeedback.type === TYPE_MODAL_FEEDBACK.CREATE) {
      yield call(getNotification, 'success', 'Tạo mới nhận xét thành công.');
    } else if (configModalFeedback.type === TYPE_MODAL_FEEDBACK.UPDATE) {
      yield call(getNotification, 'success', 'Cập nhật nhận xét thành công.');
    }
    yield put(setShowModalCreateOrUpdateFeedback(false));
    yield put(handleGetUserFeedback());
  });
  yield takeLatest(requestCreateOrUpdateFeedbackFail, function* (action) {
    yield call(getNotification, 'error', action.payload?.data?.message);
  });
}

export default function* loadUserFeedbackSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
