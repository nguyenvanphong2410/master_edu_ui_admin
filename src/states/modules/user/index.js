import { createSlice } from "@reduxjs/toolkit";
import {initErrInfoAdmin, initInfoAdmin, userInitialData} from "./initialState";

const studentSlice = createSlice({
  name: 'user',
  initialState: {
    inForAdmin: initInfoAdmin,
    errorCreateOrUpdate: initErrInfoAdmin,
    errorResetPassword: {
      password: '',
      confirmPassword: '',
    },
    isLoadingBtnCreateOrUpdate: false,
    visibleModalCreateOrUpdate: false,
    isLoadingTableUsers: false,
    users: [],
    idUser: '',
    dataFilter: userInitialData.dataFilter,
    paginationListUsers: {
      currentPage: 1,
      perPage: 20,
      totalPage: 1,
      totalRecord: 0,
    },
    isLoadingDetailUser: false,
    isLoadingBtnDelete: false,
    visibleModalDeleteUser: false,
    isLoadingBtnResetPassword: false,
    visibleModalResetPassword: false,
    visibleModalChangeStatus: false,
    configModalAdmin: {
      title: '',
      type: '',
    },
  },
  reducers: {
    setIdUser: (state, action) => ({
      ...state,
      idUser: action.payload
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
    startRequestGetListUsers: (state) => ({
      ...state,
      isLoadingTableUsers: true
    }),
    requestGetUsersSuccess: (state, action) => ({
      ...state,
      isLoadingTableUsers: false,
      users: action.payload.data.admins,
      paginationListUsers: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      }
    }),
    requestGetUsersFail: (state) => ({
      ...state,
      isLoadingTableUsers: false,
      users: [],
      paginationListUsers: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
      }
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
    setVisibleModalDeleteUser: (state, action) => ({
      ...state,
      visibleModalDeleteUser: action.payload
    }),
    startRequestDelete: state => ({
      ...state,
      isLoadingBtnDelete: true
    }),
    requestDeleteSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
      visibleModalDeleteUser: false
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

    setInForAdmin: (state, action) => ({
      ...state,
      inForAdmin: action.payload,
    }),
    
    setConfigModalAdmin: (state, action) => ({
      ...state,
      configModalAdmin: action.payload,
    }),
  }
})

export const {
  setErrorCreateOrUpdate, setVisibleModalCreateOrUpdate, setVisibleModalDeleteUser,
  setDataFilter, setVisibleModalResetPassword, setErrorResetPassword, setIdUser,
  startRequestGetListUsers, requestGetUsersSuccess, requestGetUsersFail,
  startRequestCreate, requestCreateSuccess, requestCreateFail,
  startRequestUpdate, requestUpdateSuccess, requestUpdateFail,
  startRequestDelete, requestDeleteSuccess, requestDeleteFail,
  startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail,
  setVisibleModalChangeStatus, startRequestChangeStatus, requestChangeStatusSuccess, requestChangeStatusFail,
  setInForAdmin,
  setConfigModalAdmin
} = studentSlice.actions

export default studentSlice.reducer;
