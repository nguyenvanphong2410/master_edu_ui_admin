import callApi from "../callApi.js";
import {
  requestGetListOrdersFail,
  requestGetListOrdersSuccess,
  startRequestGetListOrders,
  requestDeleteOrderFail,
  requestDeleteOrderSuccess,
  startRequestDeleteOrder,
  startRequestGetListPackage,
  requestGetListPackageSuccess,
  requestGetListPackageFail,
  startRequestChangeStatusOrder,
  requestChangeStatusOrderSuccess,
  requestChangeStatusOrderFail
} from "../../states/modules/order/index.js";

export const getListOrders = (dataFilter) => async (dispatch, getState) => {
  let path = `admin/orders`;
  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.status !== null && dataFilter.status !== undefined) {
      path += `&status=${dataFilter.status}`;
    }

    if (dataFilter.packageName) {
      path += `&package_name=${dataFilter.packageName}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
    }
  }
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      startRequestGetListOrders,
      requestGetListOrdersSuccess,
      requestGetListOrdersFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const getListPackage = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `admin/orders/list-package`,
    actionTypes: [
      startRequestGetListPackage,
      requestGetListPackageSuccess,
      requestGetListPackageFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const changeStatusOrder = (orderId, status) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/orders/${orderId}/change-status`,
    actionTypes: [
      startRequestChangeStatusOrder,
      requestChangeStatusOrderSuccess,
      requestChangeStatusOrderFail
    ],
    variables: {
      status: status
    },
    dispatch,
    getState
  })
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin/orders/${orderId}`,
    actionTypes: [
      startRequestDeleteOrder,
      requestDeleteOrderSuccess,
      requestDeleteOrderFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

