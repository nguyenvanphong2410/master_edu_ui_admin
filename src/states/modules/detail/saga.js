import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app/index.js';
import { detailGetListServiceOption, getSearchHistory, requestGetDetailCustomer, requestPointDepositHistory } from '../../../api/customer/index.js';
import { setDataFilter } from './index.js';
import {
  requestChangeStatusOrderFail,
  requestChangeStatusOrderSuccess,
  requestDeleteOrderFail,
  requestDeleteOrderSuccess
} from "@/states/modules/detail/index.js";
import {formatPhoneNumber, getNotification} from "@/utils/helper.js";
import {setVisibleModalChangeStatusOrder, setVisibleModalDeleteOrder} from "@/states/modules/order/index.js";
import {ORDER_STATUS} from "@/utils/constants.js";

function* loadRouteData() {
  const result = yield call(requestGetDetailCustomer);

  const { _id, name, phone } = result.data;

  yield put(setTitlePage('Lịch sử hoạt động'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/customer-management',
        name: 'Danh sách học viên',
      },
      {
        path: `/customer-detail/${_id}`,
        name: 'Học viên ' + (name ? `${name} (${formatPhoneNumber(phone)})` : formatPhoneNumber(phone)),
      },
    ])
  );

  yield put(setDataFilter({
    q: null,
    page: 1,
    field: null,
    sort_order: null,
    column: null,
    service_name: null,
  }));
  yield put(getSearchHistory());
  yield put(requestPointDepositHistory());
  yield put(detailGetListServiceOption());
  
}

function* handleActions() {
  yield takeLatest(requestDeleteOrderSuccess, function* () {
    getNotification('success', 'Xóa yêu cầu thành công.');
    yield put(setVisibleModalDeleteOrder(false))
    yield put(requestPointDepositHistory());
  });

  yield takeLatest(requestDeleteOrderFail, function* () {
    yield call(getNotification,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  yield takeLatest(requestChangeStatusOrderSuccess, function* () {
    const {order} = yield select();
    const message = (order.statusOrderType === ORDER_STATUS['COMPLETED'] ? 'Xác nhận' : 'Hủy') + ' yêu cầu mua khóa học thành công.'
    getNotification('success', message);
    yield put(setVisibleModalChangeStatusOrder(false));
    yield put(requestPointDepositHistory());
  });

  yield takeLatest(requestChangeStatusOrderFail, function* () {
    yield call(getNotification,'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadAuthSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
