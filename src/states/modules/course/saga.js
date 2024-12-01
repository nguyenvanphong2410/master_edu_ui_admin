import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app/index.js';
import { handleGetListDataCourses } from '../../../api/course/index.js';
import {
  changeHighlightCourseFailure,
  changeHighlightCourseSuccess,
  createCourseFailure,
  createCourseSuccess,
  deleteCourseFailure,
  deleteCourseSuccess,
  setErrorInfoCourses,
  setShowModalCreateOrUpdateCourse,
  setShowModalDeleteCourse,
  updateCourseFailure,
  updateCourseSuccess,
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
        path: 'course',
        name: 'Quản lý khóa học',
      },
    ])
  ),
    yield put(handleGetListDataCourses());
}

function* handleActions() {
  yield takeLatest(createCourseSuccess, function* () {
    yield put(setShowModalCreateOrUpdateCourse(false));
    yield put(handleGetListDataCourses());
    getNotification('success', 'Tại mới khóa học thành công');
  });

  yield takeLatest(createCourseFailure, function* (action) {
    const errorStatus = action.payload.data.status;

    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoCourses({
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

  yield takeLatest(updateCourseSuccess, function* () {
    yield put(setShowModalCreateOrUpdateCourse(false));
    yield put(handleGetListDataCourses());
    getNotification('success', 'Cập nhật khóa học thành công');
  });

  yield takeLatest(updateCourseFailure, function* (action) {
    const errorStatus = action.payload.data.status;

    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoCourses({
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

  yield takeLatest(deleteCourseSuccess, function* () {
    yield put(setShowModalDeleteCourse(false));
    yield put(handleGetListDataCourses());
    getNotification('success', 'Xóa khóa học thành công');
  });

  yield takeLatest(deleteCourseFailure, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(changeHighlightCourseSuccess, function* () {
    yield put(handleGetListDataCourses());
    getNotification('success', 'Cập nhật khóa học phổ biến thành công');
  });

  yield takeLatest(changeHighlightCourseFailure, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadOrderSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
