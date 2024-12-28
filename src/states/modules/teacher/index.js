import { createSlice } from '@reduxjs/toolkit';
import { initErrInfoTeacher, initInfoTeacher, paginationListTeachers, teacherInitialData } from './initialState';

const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    allTeacher: [],

    isLoadingBtnDelete: false,
    isLoadingDetailTeacher: false,
    isLoadingTableTeachers: false,
    visibleModalDeleteTeacher: false,
    isLoadingBtnResetPassword: false,
    visibleModalResetPassword: false,
    visibleModalChangeStatus: false,
    visibleModalCreateOrUpdate: false,
    visibleModalCourseAndClassOfTeacher: false,
    visiblePopoverSelect: false,
    isLoadingBtnChangeStatusTeacher: false,
    isLoadingBtnCreateOrUpdateTeacher: false,

    inForTeacher: initInfoTeacher,
    errorCreateOrUpdate: initErrInfoTeacher,
    dataFilter: teacherInitialData,
    paginationListTeachers: paginationListTeachers,

    errorResetPassword: {
      password: '',
      confirmPassword: '',
    },
    teachers: [],
    idTeacher: '',
    configModalTeacher: {
      title: '',
      type: '',
    },
  },
  reducers: {
    // Lấy tất cả
    getAllTeacher: (state) => ({
      ...state,
      allTeacher: [],
    }),
    getAllTeacherSuccess: (state, action) => ({
      ...state,
      allTeacher: action.payload.data,
    }),
    getAllTeacherFailure: (state) => ({
      ...state,
      allTeacher: [],
    }),

    // Lấy danh sách
    requestGetListTeachers: (state) => ({
      ...state,
      isLoadingTableTeachers: true,
    }),
    requestGetTeachersSuccess: (state, action) => ({
      ...state,
      isLoadingTableTeachers: false,
      teachers: action.payload.data.admins,
      paginationListTeachers: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    requestGetTeachersFail: (state) => ({
      ...state,
      isLoadingTableTeachers: false,
      teachers: [],
    }),

    // Tạo mới
    requestCreateTeacher: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: true,
    }),
    requestCreateTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: false,
      visibleModalCreateOrUpdate: false,
    }),
    requestCreateTeacherFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: false,
    }),

    // Cập nhật
    requestUpdateTeacher: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: true,
    }),
    requestUpdateTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: false,
      visibleModalCreateOrUpdate: false,
    }),
    requestUpdateTeacherFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTeacher: false,
    }),

    // set Id giáo viên
    setIdTeacher: (state, action) => ({
      ...state,
      idTeacher: action.payload,
    }),

    // Lõi gv
    setErrorCreateOrUpdateTeacher: (state, action) => ({
      ...state,
      errorCreateOrUpdate: action.payload,
    }),

    // Modal Tạo/Cập nhật
    setVisibleModalCreateOrUpdateTeacher: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdate: action.payload,
    }),
    
    //Data filter gv
    setDataFilterTeacher: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),

    setVisibleModalDeleteTeacher: (state, action) => ({
      ...state,
      visibleModalDeleteTeacher: action.payload,
    }),
    requestTeacherDelete: (state) => ({
      ...state,
      isLoadingBtnDelete: true,
    }),
    requestDeleteTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
      visibleModalDeleteTeacher: false,
    }),
    requestDeleteTeacherFail: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
    }),

    setErrorResetPasswordTeacher: (state, action) => ({
      ...state,
      errorResetPassword: action.payload,
    }),
    setVisibleModalResetPasswordTeacher: (state, action) => ({
      ...state,
      visibleModalResetPassword: action.payload,
    }),
    requestResetPasswordTeacher: (state) => ({
      ...state,
      isLoadingBtnResetPassword: true,
    }),
    requestResetPasswordSuccessTeacher: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false,
      visibleModalResetPassword: false,
    }),
    requestResetPasswordFailTeacher: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false,
    }),

    setVisibleModalChangeStatusTeacher: (state, action) => ({
      ...state,
      visibleModalChangeStatus: action.payload,
    }),
    requestChangeStatusTeacher: (state) => ({
      ...state,
      isLoadingBtnChangeStatusTeacher: true,
    }),
    requestChangeStatusSuccessTeacher: (state) => ({
      ...state,
      isLoadingBtnChangeStatusTeacher: false,
      visibleModalChangeStatus: false,
    }),
    requestChangeStatusFailTeacher: (state) => ({
      ...state,
      isLoadingBtnChangeStatusTeacher: false,
    }),

    setInForTeacher: (state, action) => ({
      ...state,
      inForTeacher: action.payload,
    }),

    setConfigModalTeacher: (state, action) => ({
      ...state,
      configModalTeacher: action.payload,
    }),

    setVisibleModalCourseAndClassOfTeacher: (state, action) => ({
      ...state,
      visibleModalCourseAndClassOfTeacher: action.payload,
    }),
    setVisiblePopoverSelect: (state, action) => ({
      ...state,
      visiblePopoverSelect: action.payload,
    }),
  },
});

export const {

  setErrorCreateOrUpdateTeacher,
  setVisibleModalCreateOrUpdateTeacher,
  setVisibleModalDeleteTeacher,
  setVisibleModalResetPasswordTeacher,
  setVisibleModalChangeStatusTeacher,
  
  setIdTeacher,
  setInForTeacher,
  setErrorResetPasswordTeacher,
  setDataFilterTeacher,
  setConfigModalTeacher,
  
  getAllTeacher,
  getAllTeacherSuccess,
  getAllTeacherFailure,

  requestGetListTeachers,
  requestGetTeachersSuccess,
  requestGetTeachersFail,

  requestCreateTeacher,
  requestCreateTeacherSuccess,
  requestCreateTeacherFail,

  requestUpdateTeacher,
  requestUpdateTeacherSuccess,
  requestUpdateTeacherFail,

  requestTeacherDelete,
  requestDeleteTeacherSuccess,
  requestDeleteTeacherFail,

  requestResetPasswordTeacher,
  requestResetPasswordSuccessTeacher,
  requestResetPasswordFailTeacher,
  
  requestChangeStatusTeacher,
  requestChangeStatusSuccessTeacher,
  requestChangeStatusFailTeacher,
  
  setVisibleModalCourseAndClassOfTeacher,
  setVisiblePopoverSelect,
} = teacherSlice.actions;

export default teacherSlice.reducer;
