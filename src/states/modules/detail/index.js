import { createSlice } from '@reduxjs/toolkit';

const initialStateDetail = {
  isLoadingGetListSearchHistory: false,
  isLoadingGetListPointDepositHistory: false,

  dataListSearchHistory: [],
  dataListPointDepositHistory: [],

  dataFilter: {
    q: null,
    perPage: 20,
    page: 1,
    field: null,
    sort_order: null,
    column: null,
    service_name: null,
  },

  dataFilterPoint: {
    q: null,
    perPage: 20,
    page: 1,
    field: null,
    sort_order: null,
    column: null,
  },

  paginationListSearchHistory: {
    currentPage: 1,
    perPage: 20,
    totalRecord: 0,
    totalPage: 1,
  },

  paginationListPointDepositHistory: {
    currentPage: 1,
    perPage: 20,
    totalRecord: 0,
    totalPage: 1,
  },

  infoCustomer: null,
  isLoadingGetInfoCustomer: false,
  
  isLoadingGetListServiceOption: false,
  listServiceOption: [],
};

const detailSlice = createSlice({
  name: 'detail',
  initialState: initialStateDetail,
  reducers: {
    getDetailCustomer: (state) => ({
      ...state,
      isLoadingGetInfoCustomer: true,
    }),
    getDetailCustomerSuccess: (state, action) => ({
      ...state,
      isLoadingGetInfoCustomer: false,
      infoCustomer: action.payload.data,
    }),
    getDetailCustomerFail: (state) => ({
      ...state,
      isLoadingGetInfoCustomer: false,
    }),

    getListSearchHistory: (state) => ({
      ...state,
      isLoadingGetListSearchHistory: true,
    }),
    getListSearchHistorySuccess: (state, action) => ({
      ...state,
      dataListSearchHistory: action.payload.data.transactions,
      paginationListSearchHistory: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
      isLoadingGetListSearchHistory: false,
    }),
    getListSearchHistoryFail: (state) => ({
      ...state,
      isLoadingGetListSearchHistory: false,
    }),

    getListPointDepositHistory: (state) => ({
      ...state,
      isLoadingGetListPointDepositHistory: true,
    }),
    getListPointDepositHistorySuccess: (state, action) => ({
      ...state,
      dataListPointDepositHistory: action.payload.data.histories,
      paginationListPointDepositHistory: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
      isLoadingGetListPointDepositHistory: false,
    }),
    getListPointDepositHistoryFail: (state) => ({
      ...state,
      isLoadingGetListPointDepositHistory: false,
    }),

    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: { ...state.dataFilter,  ...action.payload },
    }),
    setDataFilterPoint: (state, action) => ({
      ...state,
      dataFilterPoint: { ...action.payload },
    }),

    requestDetailGetListServiceOption: (state) => ({
      ...state,
      isLoadingGetListServiceOption: true,
    }),
    requestDetailGetListServiceOptionSuccess: (state, action) => ({
      ...state,
      isLoadingGetListServiceOption: false,
      listServiceOption: action.payload.data,
    }),
    requestDetailGetListServiceOptionFail: (state) => ({
      ...state,
      isLoadingGetListServiceOption: false,
    }),

    startRequestChangeStatusOrder: (state) => ({
      ...state,
      isLoadingBtnChangeStatus: true
    }),
    requestChangeStatusOrderSuccess: (state) => ({
      ...state,
      isLoadingBtnChangeStatus: false,
      visibleModalChangeStatusOrder: false
    }),
    requestChangeStatusOrderFail: (state) => ({
      ...state,
      isLoadingBtnChangeStatus: false,
    }),

    startRequestDeleteOrder: state => ({
      ...state,
      isLoadingBtnDelete: true
    }),
    requestDeleteOrderSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
      visibleModalDeleteOrder: false
    }),
    requestDeleteOrderFail: (state) => ({
      ...state,
      isLoadingBtnDelete: false
    }),
  },
});

export const {
  getDetailCustomer,
  getDetailCustomerSuccess,
  getDetailCustomerFail,
  setDataFilter,
  setDataFilterPoint,
  getListSearchHistory,
  getListSearchHistorySuccess,
  getListSearchHistoryFail,
  getListPointDepositHistory,
  getListPointDepositHistorySuccess,
  getListPointDepositHistoryFail,
  requestDetailGetListServiceOption,
  requestDetailGetListServiceOptionSuccess,
  requestDetailGetListServiceOptionFail,
  startRequestChangeStatusOrder,
  requestChangeStatusOrderSuccess,
  requestChangeStatusOrderFail,
  startRequestDeleteOrder,
  requestDeleteOrderSuccess,
  requestDeleteOrderFail
} = detailSlice.actions;

export default detailSlice.reducer;
