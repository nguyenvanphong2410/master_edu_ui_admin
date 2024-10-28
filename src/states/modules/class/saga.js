import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {
  createClassFail,
  createClassSuccess,
  deleteClassFail,
  deleteClassSuccess,
  setDataFilter,
  setErrorInfoClass,
  updateClassFail,
  updateClassSuccess,
  setVisibleModalCreateOrUpdateClass,
  changeStatusClassSuccess,
  changeStatusClassFail,
  setShowModalDeleteClass,

} from './index';
import {getNotification} from '@/utils/helper';
import {
  getListClasses
} from '@/api/class';
import { setBreadcrumb, setTitlePage } from '../app';
import { getAllCourses } from '@/api/package';
import { requestGetAllTeachers } from '@/api/teacher';
import { requestGetAllCustomers } from '@/api/customer';

function* loadRouteData() {
  yield put(setTitlePage('Quản lý lớp học'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/class',
        name: 'Quản lý lớp học',
      },
    ])
  ),
  yield put(
    setDataFilter({
      keySearch: '',
      perPage: 20,
      page: 1,
      sort_order: null,
      column: null,
    })
  );
  yield put(getListClasses());
  yield put(getAllCourses());
  yield put(requestGetAllTeachers());
  yield put(requestGetAllCustomers());
}

function* handleActions() {
  yield takeLatest(createClassSuccess, function* () {
    const selectCourseId = yield select((state) => state.class.selectCourseId);
    if (selectCourseId === 'default') {
      yield put(getListClasses());
    } else {
      // yield put(getListClassByCourseId());
    }
    yield put(setVisibleModalCreateOrUpdateClass(false));
    getNotification('success', 'Tạo mới lớp học thành công.');
  });

  yield takeLatest(createClassFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoClass({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới lớp học thất bại.');
    }
  });

  yield takeLatest(updateClassSuccess, function* () {
    const selectCourseId = yield select((state) => state.class.selectCourseId);
    if (selectCourseId === 'default') {
      yield put(getListClasses());
    } else {
      // yield put(getListClassByCourseId());
    }
    yield put(setVisibleModalCreateOrUpdateClass(false));
    getNotification('success', 'Cập nhật lớp học thành công.');
  });

  yield takeLatest(updateClassFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoClass({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật lớp học thất bại.');
    }
  });

  yield takeLatest(deleteClassSuccess, function* () {
    const classState = yield select((state) => state.class);
    const {currentPage, perPage, totalRecord} = classState.paginationListClass;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilter({...classState.dataFilterTeacher, page: currentPage - 1}));
    }
    getNotification('success', 'Xoá lớp học thành công.');
    yield put(getListClasses());
    yield put(setShowModalDeleteClass(false));
  });

  yield takeLatest(deleteClassFail, function* () {
    yield call(getNotification, 'error', 'Xoá lớp học thất bại.');
  });

  yield takeLatest(changeStatusClassSuccess, function* () {
    yield put(getListClasses());
    getNotification('success', 'Thay đổi trạng thái lớp học thành công.');
  });

  yield takeLatest(changeStatusClassFail, function* () {
    yield put(getListClasses());
    getNotification('error', 'Thay đổi trạng thái lớp học thất bại.');
  });

}

export default function* classSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
