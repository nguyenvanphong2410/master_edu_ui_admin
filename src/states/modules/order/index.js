import { createSlice } from "@reduxjs/toolkit";
import { orderInitialData } from "./initialState.js";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    dataFilter: orderInitialData.dataFilter,
    paginationListOrders: orderInitialData.pagination,
    isLoadingTableOrders: false,
    visibleModalDeleteOrder: false,
    visibleModalChangeStatusOrder: false,
    isLoadingBtnDelete: false,
    isLoadingBtnChangeStatus: false,
    listPackage: [],
    statusOrderType: null,
  },
  reducers: {
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload
    }),
    startRequestGetListOrders: (state) => ({
      ...state,
      isLoadingTableOrders: true
    }),
    requestGetListOrdersSuccess: (state, action) => ({
      ...state,
      isLoadingTableOrders: false,
      orders: action.payload.data.orders,
      paginationListOrders: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      }
    }),
    requestGetListOrdersFail: (state) => ({
      ...state,
      isLoadingTableOrders: false,
      orders: [],
      paginationListOrders: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
      }
    }),

    startRequestGetListPackage: (state) => ({
      ...state,
      listPackage: []
    }),
    requestGetListPackageSuccess: (state, action) => ({
      ...state,
      listPackage: action.payload.data
    }),
    requestGetListPackageFail: (state) => ({
      ...state,
      listPackage: []
    }),

    setVisibleModalDeleteOrder: (state, action) => ({
      ...state,
      visibleModalDeleteOrder: action.payload
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


    setVisibleModalChangeStatusOrder: (state, action) => ({
      ...state,
      visibleModalChangeStatusOrder: action.payload
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

    setStatusOrderType: (state, action) => ({
      ...state,
      statusOrderType: action.payload
    }),
  }
})

export const {
  setDataFilter,
  startRequestGetListOrders, requestGetListOrdersSuccess, requestGetListOrdersFail,
  setVisibleModalDeleteOrder,
  startRequestDeleteOrder, requestDeleteOrderSuccess, requestDeleteOrderFail,
  startRequestGetListPackage, requestGetListPackageSuccess, requestGetListPackageFail,
  setVisibleModalChangeStatusOrder, startRequestChangeStatusOrder, requestChangeStatusOrderSuccess, requestChangeStatusOrderFail,
  setStatusOrderType
} = orderSlice.actions

export default orderSlice.reducer