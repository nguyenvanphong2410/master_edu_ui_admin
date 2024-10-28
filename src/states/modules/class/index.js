import { createSlice } from '@reduxjs/toolkit';
import { initDataFilterClass, initErrInfoClass, initInfoClass, initPaginationListClass } from './initState';

const classSlice = createSlice({
  name: 'class',
  initialState: {
    isUpdateView: false,
    isLoadingTableClass: false,
    isLoadingBtnCreateClass: false,
    isLoadingBtnUpdateClass: false,
    isLoadingBtnDeleteClass: false,
    visibleModalCreateOrUpdateClass: false,
    visibleModalDeleteClass: false,

    classes: [],
    classSelected: {},
    infoClass: initInfoClass,
    errorInfoClass: initErrInfoClass,
    dataFilter: initDataFilterClass,
    paginationListClass: initPaginationListClass,
    configModal: {
      title: '',
      type: '',
    },
    imageList: [],
    selectCourseId: 'default',
  },
  reducers: {
    setSelectCourseId: (state, action) => ({
      ...state,
      selectCourseId: action.payload,
    }),
    setVisibleModalCreateOrUpdateClass: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateClass: action.payload,
    }),
    setInfoClass: (state, action) => ({
      ...state,
      infoClass: action.payload,
    }),
    setErrorInfoClass: (state, action) => ({
      ...state,
      errorInfoClass: action.payload,
    }),
    setImageList: (state, action) => ({
      ...state,
      imageList: action.payload,
    }),
    getListClass: (state) => ({
      ...state,
      isLoadingTableClass: true,
    }),
    getListClassSuccess: (state, action) => ({
      ...state,
      isLoadingTableClass: false,
      classes: action.payload.data.classes,
      paginationListClass: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListClassFailure: (state) => ({
      ...state,
      isLoadingTableClass: false,
    }),

    changeStatusClass: (state) => ({
      ...state,
      status: '',
    }),
    changeStatusClassSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusClassFail: (state) => ({
      ...state,
      status: '',
    }),

    changeDocCheckClass: (state) => ({
      ...state,
      doc_check: '',
    }),
    changeDocCheckClassSuccess: (state, action) => ({
      ...state,
      doc_check: action.payload,
    }),
    changeDocCheckClassFail: (state) => ({
      ...state,
      doc_check: '',
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListClass: (state, action) => ({
      ...state,
      paginationListClass: action.payload,
    }),
    createClass: (state) => ({
      ...state,
      isLoadingBtnCreateClass: true,
    }),
    createClassSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateClass: false,
    }),
    createClassFail: (state) => ({
      ...state,
      isLoadingBtnCreateClass: false,
    }),
    updateClass: (state) => ({
      ...state,
      isLoadingBtnUpdateClass: true,
    }),
    updateClassSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateClass: false,
    }),
    updateClassFail: (state) => ({
      ...state,
      isLoadingBtnUpdateClass: false,
    }),

    setConfigModal: (state, action) => ({
      ...state,
      configModal: action.payload,
    }),
    setClassSelected: (state, action) => ({
      ...state,
      classSelected: action.payload,
    }),

    // Xoa lớp học
    setShowModalDeleteClass: (state, action) => ({
      ...state,
      visibleModalDeleteClass: action.payload,
    }),
    deleteClass: (state) => ({
      ...state,
      isLoadingBtnDeleteClass: true,
    }),
    deleteClassSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteClass: false,
    }),
    deleteClassFail: (state) => ({
      ...state,
      isLoadingBtnDeleteClass: false,
    }),
  },
});

export const {
  setInfoClass,
  setErrorInfoClass,
  setImageList,

  getListClass,
  getListClassSuccess,
  getListClassFailure,

  changeStatusClass,
  changeStatusClassSuccess,
  changeStatusClassFail,

  changeDocCheckClass,
  changeDocCheckClassSuccess,
  changeDocCheckClassFail,

  setDataFilter,
  setPaginationListClass,

  createClass,
  createClassSuccess,
  createClassFail,

  updateClass,
  updateClassSuccess,
  updateClassFail,

  deleteClass,
  deleteClassSuccess,
  deleteClassFail,

  setConfigModal,
  setVisibleModalCreateOrUpdateClass,

  setSelectCourseId,

  setClassSelected,
  setShowModalDeleteClass,
} = classSlice.actions;
export default classSlice.reducer;
