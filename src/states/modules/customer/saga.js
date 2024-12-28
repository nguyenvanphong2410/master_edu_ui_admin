import {
  all, fork, put, takeLatest, call, select
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {getNotification} from "../../../utils/helper.js";
import {
  requestChangeStatusFail,
  requestChangeStatusSuccess,
  requestConfirmFail,
  requestConfirmSuccess,
  requestCreateFail,
  requestCreateSuccess,
  requestDeleteFail,
  requestDeleteSuccess,
  requestResetPasswordFail,
  requestResetPasswordSuccess,
  requestUpdateFail,
  requestUpdateSuccess,
  setCustomerType,
  setDataFilter,
  setErrorCreateOrUpdate,
  setErrorResetPassword
} from './index.js';
import _ from "lodash";
import {getListCustomers} from "../../../api/customer/index.js";
import {customerInitialData} from "./initialState.js";
import { CUSTOMER_TYPE } from '@/utils/constants.js';
import { getAllCourses } from "@/api/course/index.js";
import { getAllClasses } from "@/api/class/index.js";

function* loadRouteData () {
  yield put(setTitlePage('Quản lý học viên'));
  yield put(setBreadcrumb([
    {
      path: '/',
      name: 'Trang chủ'
    },
    {
      path: '/customer-management',
      name: 'Danh sách học viên'
    },
  ]))
  yield put(setDataFilter(customerInitialData.dataFilter));
  yield put(setCustomerType(CUSTOMER_TYPE.CONFIRMED));
  yield put(getListCustomers(customerInitialData.dataFilter));
  yield put(getAllCourses());
  yield put(getAllClasses());
}

function* handleActions () {
  yield takeLatest(requestCreateSuccess, function* () {
    getNotification('success', 'Tạo mới học viênthành công.');
    yield put(setDataFilter(customerInitialData.dataFilter));
    yield put(setCustomerType(CUSTOMER_TYPE.CONFIRMED));
    yield put(getListCustomers());
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
    getNotification('success', 'Cập nhật học viênthành công.');
    const {customer} = yield select();
    const dataFilter = customer.dataFilter
    yield put(getListCustomers(dataFilter));
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
    getNotification('success', 'Xóa học viênthành công.');
    const {customer} = yield select();
    const dataFilter = customer.dataFilter
    yield put(getListCustomers(dataFilter));
  });

  yield takeLatest(requestDeleteFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestChangeStatusSuccess, function* () {
    getNotification('success', 'Thay đổi trạng thái thành công.');
    const {customer} = yield select();
    const dataFilter = customer.dataFilter
    yield put(getListCustomers(dataFilter));
  });

  yield takeLatest(requestChangeStatusFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestConfirmSuccess, function* () {
    getNotification('success', 'Xác thực thành công.');
    const {customer} = yield select();
    const dataFilter = customer.dataFilter
    yield put(getListCustomers(dataFilter));
  });

  yield takeLatest(requestConfirmFail, function* () {
    yield call(getNotification ,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadCustomerSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
