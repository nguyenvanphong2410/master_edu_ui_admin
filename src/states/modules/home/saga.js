import {
  all, fork, put,
  takeLatest
} from "redux-saga/effects";
import { setBreadcrumb, setTitlePage } from "../app/index.js";
import { getListOverview, getListRevenue } from "../../../api/home/index.js";
import { requestGetListOverviewsFail, requestGetListRevenueFail, requestGetListTransactionFail, setRevenueDateFilter, setTypeRevenue } from "./index.js";
import { getNotification, hasPermission } from "@/utils/helper.js";
import { PERMISSIONS } from "@/utils/constants.js";

function* loadRouteData() {
  yield put(setTitlePage('Tổng quan hệ thống'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
    ])
  ),
  yield put(setTypeRevenue('daily'))
  yield put(setRevenueDateFilter({
    start_time: null,
    end_time: null,
  }))
  
  if (hasPermission([PERMISSIONS.LIST.LIST_ADMIN])) {
    yield put(getListOverview())
    yield put(getListRevenue())
  }
}

function* handleActions() {
  yield takeLatest(requestGetListOverviewsFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestGetListRevenueFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestGetListTransactionFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
