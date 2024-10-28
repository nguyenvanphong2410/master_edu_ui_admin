import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app/index.js';
import { handleGetListDataPackages } from '../../../api/package/index.js';
import {
  changeHighlightPackageFailure,
  changeHighlightPackageSuccess,
  createPackageFailure,
  createPackageSuccess,
  deletePackageFailure,
  deletePackageSuccess,
  setErrorInfoPackages,
  setShowModalCreateOrUpdatePackage,
  setShowModalDeletePackage,
  updatePackageFailure,
  updatePackageSuccess,
} from './index.js';
import { getNotification } from '../../../utils/helper.js';
import _ from 'lodash';

function* loadRouteData() {
  yield put(setTitlePage('Quản lý khóa học'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: 'package',
        name: 'Quản lý khóa học',
      },
    ])
  ),
    yield put(handleGetListDataPackages());
}

function* handleActions() {
  yield takeLatest(createPackageSuccess, function* () {
    yield put(setShowModalCreateOrUpdatePackage(false));
    yield put(handleGetListDataPackages());
    getNotification('success', 'Tại mới khóa học thành công');
  });

  yield takeLatest(createPackageFailure, function* (action) {
    const errorStatus = action.payload.data.status;

    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoPackages({
          name: _.get(errors, 'name', ''),
          description: _.get(errors, 'description', ''),
          point: _.get(errors, 'point', ''),
          current_price: _.get(errors, 'current_price', ''),
          original_price: _.get(errors, 'original_price', ''),
        })
      );
    } else {
      getNotification('error', 'Tại mới khóa học thất bại');
    }
  });

  yield takeLatest(updatePackageSuccess, function* () {
    yield put(setShowModalCreateOrUpdatePackage(false));
    yield put(handleGetListDataPackages());
    getNotification('success', 'Cập nhật khóa học thành công');
  });

  yield takeLatest(updatePackageFailure, function* (action) {
    const errorStatus = action.payload.data.status;

    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoPackages({
          name: _.get(errors, 'name', ''),
          description: _.get(errors, 'description', ''),
          point: _.get(errors, 'point', ''),
          current_price: _.get(errors, 'current_price', ''),
          original_price: _.get(errors, 'original_price', ''),
        })
      );
    } else {
      getNotification('error', 'Cập nhật khóa học thất bại');
    }
  });

  yield takeLatest(deletePackageSuccess, function* () {
    yield put(setShowModalDeletePackage(false));
    yield put(handleGetListDataPackages());
    getNotification('success', 'Xóa khóa học thành công');
  });

  yield takeLatest(deletePackageFailure, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(changeHighlightPackageSuccess, function* () {
    yield put(handleGetListDataPackages());
    getNotification('success', 'Cập nhật khóa học phổ biến thành công');
  });

  yield takeLatest(changeHighlightPackageFailure, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadOrderSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
