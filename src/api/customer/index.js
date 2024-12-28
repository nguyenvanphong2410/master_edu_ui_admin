import {
  getDetailCustomer,
  getDetailCustomerFail,
  getDetailCustomerSuccess,
  getListSearchHistory,
  getListSearchHistoryFail,
  getListSearchHistorySuccess,
  requestChangeStatusOrderFail,
  requestChangeStatusOrderSuccess,
  requestDeleteOrderFail,
  requestDeleteOrderSuccess,
  requestDetailGetListServiceOption,
  requestDetailGetListServiceOptionFail,
  requestDetailGetListServiceOptionSuccess,
  startRequestChangeStatusOrder,
  startRequestDeleteOrder,
} from '@/states/modules/detail/index.js';
import {
  getListAllCustomers,
  getListAllCustomersFail,
  getListAllCustomersSuccess,
  requestChangeStatusFail,
  requestChangeStatusSuccess,
  requestConfirmFail,
  requestConfirmSuccess,
  requestCreateFail,
  requestCreateSuccess,
  requestDeleteFail,
  requestDeleteSuccess,
  requestGetCustomersFail,
  requestGetCustomersSuccess,
  requestResetPasswordFail,
  requestResetPasswordSuccess,
  requestUpdateFail,
  requestUpdateSuccess,
  startRequestChangeStatus,
  startRequestConfirm,
  startRequestCreate,
  startRequestDelete,
  startRequestGetListCustomers,
  startRequestResetPassword,
  startRequestUpdate,
} from '../../states/modules/customer/index.js';
import callApi from '../callApi.js';
import {
  getListPointDepositHistory,
  getListPointDepositHistoryFail,
  getListPointDepositHistorySuccess,
} from '../../states/modules/detail/index.js';
import store from '@/states/configureStore.js';
import _ from 'lodash';

export const requestGetDetailCustomer = async () => {
  const getState = store.getState;
  const dispatch = store.dispatch;
  const id = getState().app.location.params.id;
  return callApi({
    method: 'get',
    apiPath: `admin/customer/${id}`,
    actionTypes: [getDetailCustomer, getDetailCustomerSuccess, getDetailCustomerFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetAllCustomers = () => async (dispatch, getState) => {
  let path = `admin/customer/all-customer`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListAllCustomers, getListAllCustomersSuccess, getListAllCustomersFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const getListCustomers = (dataFilter) => async (dispatch, getState) => {
  const customer_type = getState().customer.customer_type;
  let path = `admin/customer/list/${customer_type}`;
  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.q) {
      path += `&q=${dataFilter.q}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
    }

    if (dataFilter && dataFilter.course_id_of_student) {
      path += `&course_id_of_student=${dataFilter.course_id_of_student}`;
    }

    if (dataFilter && dataFilter.class_id_of_student) {
      path += `&class_id_of_student=${dataFilter.class_id_of_student}`;
    }
  }
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [startRequestGetListCustomers, requestGetCustomersSuccess, requestGetCustomersFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const createCustomer = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: `admin/customer`,
    actionTypes: [startRequestCreate, requestCreateSuccess, requestCreateFail],
    variables: { ...data },
    dispatch,
    getState,
    headers,
  });
};

export const updateCustomer = (customerId, dataCustomer) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataNew = _.cloneDeep(dataCustomer);
  delete dataCustomer?._id;

  if (dataNew.avatar !== 'delete' && typeof dataNew.avatar === 'string') {
    delete dataNew.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin/customer/${customerId}`,
    actionTypes: [startRequestUpdate, requestUpdateSuccess, requestUpdateFail],
    variables: { ...dataNew },
    dispatch,
    getState,
    headers,
  });
};

export const deleteCustomer = (customerId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin/customer/${customerId}`,
    actionTypes: [startRequestDelete, requestDeleteSuccess, requestDeleteFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const resetPasswordCustomer = (customerId, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/customer/${customerId}/change-password`,
    actionTypes: [startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail],
    variables: {
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    dispatch,
    getState,
  });
};

export const changeStatusCustomer = (userId, customerStatus) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/customer/${userId}/change-status`,
    actionTypes: [startRequestChangeStatus, requestChangeStatusSuccess, requestChangeStatusFail],
    variables: {
      status: customerStatus,
    },
    dispatch,
    getState,
  });
};

export const getSearchHistory = () => async (dispatch, getState) => {
  const dataFilter = getState().detail.dataFilter;
  const id = getState().app.location.params.id;

  let path = `admin/customer/${id}/transactions`;

  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.order && dataFilter.column) {
      path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
    }
    if (dataFilter.service_name !== null && dataFilter.service_name !== undefined) {
      path += `&service_name=${dataFilter.service_name}`;
    }
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListSearchHistory, getListSearchHistorySuccess, getListSearchHistoryFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestPointDepositHistory = () => async (dispatch, getState) => {
  const dataFilter = getState().detail.dataFilterPoint;
  const id = getState().app.location.params.id;
  let path = `admin/customer/${id}/order-histories`;
  if (dataFilter && dataFilter.perPage && dataFilter.page) {
    path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.q) {
      path += `&q=${dataFilter.q}`;
    }

    if (dataFilter.status !== null && dataFilter.status !== undefined) {
      path += `&status=${dataFilter.status}`;
    }

    if (dataFilter.courseName) {
      path += `&course_name=${dataFilter.courseName}`;
    }

    if (dataFilter.sort_order && dataFilter.field) {
      path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.field}`;
    }
  }
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListPointDepositHistory, getListPointDepositHistorySuccess, getListPointDepositHistoryFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const detailGetListServiceOption = () => (dispatch, getState) => {
  const id = getState().app.location.params.id;
  let path = `admin/transactions/customer/${id}/distinct-service-name`;
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      requestDetailGetListServiceOption,
      requestDetailGetListServiceOptionSuccess,
      requestDetailGetListServiceOptionFail,
    ],
    dispatch,
    getState,
  });
};

export const changeStatusOrderInDetailCustomer = (orderId, status) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/orders/${orderId}/change-status`,
    actionTypes: [startRequestChangeStatusOrder, requestChangeStatusOrderSuccess, requestChangeStatusOrderFail],
    variables: {
      status: status,
    },
    dispatch,
    getState,
  });
};

export const deleteOrderInDetailCustomer = (orderId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `admin/orders/${orderId}`,
    actionTypes: [startRequestDeleteOrder, requestDeleteOrderSuccess, requestDeleteOrderFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const confirmCustomer = (userId) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `admin/customer/${userId}/approved`,
    actionTypes: [startRequestConfirm, requestConfirmSuccess, requestConfirmFail],
    dispatch,
    getState,
  });
};
