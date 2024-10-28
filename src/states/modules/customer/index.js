import { createSlice } from "@reduxjs/toolkit";
import {customerInitialData, initErrInfoCustomer, initInfoCustomer} from "./initialState";
import { CUSTOMER_TYPE } from '@/utils/constants.js';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    inForCustomer: initInfoCustomer,
    errorCreateOrUpdate: initErrInfoCustomer,
    errorResetPassword: {
      password: '',
      confirmPassword: '',
    },
    isLoadingBtnCreateOrUpdate: false,
    visibleModalCreateOrUpdate: false,
    isLoadingTableCustomers: false,
    customers: [],
    allCustomers: [],
    idCustomer: '',
    dataFilter: customerInitialData.dataFilter,
    paginationListCustomers: {
      currentPage: 1,
      perPage:20,
      totalPage: 1,
      totalRecord: 0,
    },
    isLoadingDetailCustomer: false,
    isLoadingBtnDelete: false,
    visibleModalDeleteCustomer: false,
    isLoadingBtnResetPassword: false,
    isLoadingBtnConfirm: false,
    visibleModalResetPassword: false,
    visibleModalChangeStatus: false,
    visibleModalConfirmCustomer: false,
    dataFilterPoint: {
      q: null,
      perPage: 20,
      page: 1,
      field: null,
      sort_order: null,
      column: null,
    },
    customer_type: CUSTOMER_TYPE.CONFIRMED,
    configModal: {
      title: '',
      type: '',
    },
  },
  reducers: {
    setInForCustomer: (state, action) => ({
      ...state,
      inForCustomer: action.payload,
    }),
    setIdCustomer: (state, action) => ({
      ...state,
      idCustomer: action.payload
    }),
    setVisibleModalCreateOrUpdate: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdate: action.payload
    }),
    setErrorCreateOrUpdate: (state, action) => ({
      ...state,
      errorCreateOrUpdate: action.payload
    }),
    startRequestCreate: state => ({
      ...state,
      isLoadingBtnCreateOrUpdate: true
    }),
    requestCreateSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
      visibleModalCreateOrUpdate: false
    }),
    requestCreateFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload
    }),
    startRequestGetListCustomers: (state) => ({
      ...state,
      isLoadingTableCustomers: true,
      customers: [],
    }),
    requestGetCustomersSuccess: (state, action) => ({
      ...state,
      isLoadingTableCustomers: false,
      customers: action.payload.data.users,
      paginationListCustomers: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      }
    }),
    requestGetCustomersFail: (state) => ({
      ...state,
      isLoadingTableCustomers: false,
      customers: [],
      paginationListCustomers: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
      }
    }),

    // Lấy tất cả học viên
    getListAllCustomers: (state) => ({
      ...state,
      isLoadingTableCustomers: true,
      allCustomers: [],
    }),
    getListAllCustomersSuccess: (state, action) => ({
      ...state,
      isLoadingTableCustomers: false,
      allCustomers: action.payload.data.users,
      
    }),
    getListAllCustomersFail: (state) => ({
      ...state,
      isLoadingTableCustomers: false,
      allCustomers: [],
    }),

    startRequestUpdate: state => ({
      ...state,
      isLoadingBtnCreateOrUpdate: true
    }),
    requestUpdateSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
      visibleModalCreateOrUpdate: false
    }),
    requestUpdateFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false
    }),
    setVisibleModalDeleteCustomer: (state, action) => ({
      ...state,
      visibleModalDeleteCustomer: action.payload
    }),
    setVisibleModalConfirmCustomer: (state, action) => ({
      ...state,
      visibleModalConfirmCustomer: action.payload
    }),
    startRequestDelete: state => ({
      ...state,
      isLoadingBtnDelete: true
    }),
    requestDeleteSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
      visibleModalDeleteCustomer: false
    }),
    requestDeleteFail: (state) => ({
      ...state,
      isLoadingBtnDelete: false
    }),

    setErrorResetPassword: (state, action) => ({
      ...state,
      errorResetPassword: action.payload
    }),
    setVisibleModalResetPassword: (state, action) => ({
      ...state,
      visibleModalResetPassword: action.payload
    }),
    startRequestResetPassword: state => ({
      ...state,
      isLoadingBtnResetPassword: true
    }),
    requestResetPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false,
      visibleModalResetPassword: false
    }),
    requestResetPasswordFail: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false
    }),

    setVisibleModalChangeStatus: (state, action) => ({
      ...state,
      visibleModalChangeStatus: action.payload
    }),
    startRequestChangeStatus: state => ({
      ...state,
      isLoadingBtnChangeStatus: true
    }),
    requestChangeStatusSuccess: (state) => ({
      ...state,
      isLoadingBtnChangeStatus: false,
      visibleModalChangeStatus: false
    }),
    requestChangeStatusFail: (state) => ({
      ...state,
      isLoadingBtnChangeStatus: false
    }),
    startRequestConfirm: state => ({
      ...state,
      isLoadingBtnConfirm: true
    }),
    requestConfirmSuccess: (state) => ({
      ...state,
      isLoadingBtnConfirm: false,
      visibleModalConfirmCustomer: false
    }),
    requestConfirmFail: (state) => ({
      ...state,
      isLoadingBtnConfirm: false
    }),
    setCustomerType: (state, action) => ({
      ...state,
      customer_type: action.payload
    }),

    setConfigModal: (state, action) => ({
      ...state,
      configModal: action.payload,
    }),
  }
})

export const {
  setInForCustomer,
  setErrorCreateOrUpdate,
  setVisibleModalCreateOrUpdate,
  setVisibleModalDeleteCustomer,
  setDataFilter,
  setVisibleModalResetPassword,
  setVisibleModalConfirmCustomer,
  setErrorResetPassword, setIdCustomer,
  startRequestGetListCustomers,
  requestGetCustomersSuccess,
  requestGetCustomersFail,
  getListAllCustomers,
  getListAllCustomersSuccess,
  getListAllCustomersFail,
  startRequestCreate,
  requestCreateSuccess,
  requestCreateFail,
  startRequestUpdate,
  requestUpdateSuccess,
  requestUpdateFail,
  startRequestDelete,
  requestDeleteSuccess,
  requestDeleteFail,
  startRequestResetPassword,
  requestResetPasswordSuccess,
  requestResetPasswordFail,
  setVisibleModalChangeStatus,
  startRequestChangeStatus,
  requestChangeStatusSuccess,
  requestChangeStatusFail,
  startRequestConfirm,
  requestConfirmSuccess,
  requestConfirmFail,
  setCustomerType,

  setConfigModal
} = customerSlice.actions

export default customerSlice.reducer;
