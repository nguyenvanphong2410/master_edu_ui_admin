import {
  all, fork, put, takeLatest, call, select
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {
  requestChangeStatusOrderFail,
  requestChangeStatusOrderSuccess,
  setDataFilter
} from "./index.js";
import { orderInitialData } from "./initialState.js";
import {requestDeleteOrderFail, requestDeleteOrderSuccess} from "./index.js";
import {getNotification} from "../../../utils/helper.js";
import {getListOrders, getListPackage} from "../../../api/order/index.js";
import {ORDER_STATUS} from "../../../utils/constants.js";

function* loadRouteData () {
  yield put(setTitlePage('Quản lý đơn mua'));
  yield put(setBreadcrumb([
    {
      path: '/',
      name: 'Trang chủ'
    },
    {
      path: '/order',
      name: 'Quản lý đơn mua'
    },
  ]))
  yield put(setDataFilter(orderInitialData.dataFilter))
  yield put(getListOrders());
  yield put(getListPackage());
}

function* handleActions () {
  yield takeLatest(requestDeleteOrderSuccess, function* () {
    getNotification('success', 'Xóa yêu cầu thành công.');
    const {order} = yield select();
    const dataFilter = order.dataFilter
    yield put(getListOrders(dataFilter));
  });

  yield takeLatest(requestDeleteOrderFail, function* () {
    yield call(getNotification,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestChangeStatusOrderSuccess, function* () {
    const {order} = yield select();
    const dataFilter = order.dataFilter
    const message = (order.statusOrderType === ORDER_STATUS['COMPLETED'] ? 'Xác nhận' : 'Hủy') + ' yêu cầu mua khóa học thành công.'
    getNotification('success', message);
    yield put(getListOrders(dataFilter));
  });

  yield takeLatest(requestChangeStatusOrderFail, function* () {
    yield call(getNotification,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadOrderSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}