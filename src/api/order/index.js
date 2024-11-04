import callApi from "../callApi.js";
import {
  requestGetListOrdersFail,
  requestGetListOrdersSuccess,
  startRequestGetListOrders,
  requestDeleteOrderFail,
  requestDeleteOrderSuccess,
  startRequestDeleteOrder,
  startRequestGetListCourse,
  requestGetListCourseSuccess,
  requestGetListCourseFail,
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

    if (dataFilter.courseName) {
      path += `&course_name=${dataFilter.courseName}`;
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

export const getListCourse = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `admin/orders/list-course`,
    actionTypes: [
      startRequestGetListCourse,
      requestGetListCourseSuccess,
      requestGetListCourseFail
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

