import { createSlice } from '@reduxjs/toolkit';
import {
  initDataFilterClass,
  initErrInfoClass,
  initErrScore,
  initInfoClass,
  initInfoScore,
  initPaginationListClass,
} from './initState';

const classSlice = createSlice({
  name: 'class',
  initialState: {
    isUpdateView: false,
    isLoadingTableClass: false,
    isLoadingBtnCreateClass: false,
    isLoadingBtnUpdateClass: false,
    isLoadingBtnDeleteClass: false,
    visibleModalCreateOrUpdateClass: false,
    visibleModalSettingScore: false,
    visibleModalDeleteClass: false,
    visibleModalDSSVOfClass: false,
    isLoadingGetListStudentOfClass: false,
    isLoadingUpdateScore: false,

    classes: [],
    classSelected: {},
    allClass: [],
    studentToSetScoreSelected: '',
    infoScore: initInfoScore,
    listStudentOfClass: [],
    dataListStudentScoreOfClass: [],

    infoClass: initInfoClass,
    errorInfoScore: initErrScore,
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
    setVisibleModalSettingScore: (state, action) => ({
      ...state,
      visibleModalSettingScore: action.payload,
    }),
    setInfoClass: (state, action) => ({
      ...state,
      infoClass: action.payload,
    }),
    setInfoScore: (state, action) => ({
      ...state,
      infoScore: action.payload,
    }),
    setErrorInfoScore: (state, action) => ({
      ...state,
      errorInfoScore: action.payload,
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
    setStudentToSetScoreSelected: (state, action) => ({
      ...state,
      studentToSetScoreSelected: action.payload,
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

    //getListStudentOfClass
    getListStudentOfClass: (state) => ({
      ...state,
      isLoadingGetListStudentOfClass: true,
    }),
    getListStudentOfClassSuccess: (state, action) => ({
      ...state,
      isLoadingGetListStudentOfClass: false,
      listStudentOfClass: action.payload.data.students,
    }),
    getListStudentOfClassFailure: (state) => ({
      ...state,
      isLoadingGetListStudentOfClass: false,
    }),

    //Lấy điểm cuat học viên dựa vào idhv idlop
    getScoreOfStudentOfClass: (state) => ({
      ...state,
      isLoadingGetScoreOfStudentOfClass: true,
    }),
    getScoreOfStudentOfClassSuccess: (state, action) => ({
      ...state,
      isLoadingGetScoreOfStudentOfClass: false,
      infoScore: {
        attendance_score: action.payload.data.scoreOfStudent.attendance_score,
        plus_score: action.payload.data.scoreOfStudent.plus_score,
        midterm_score: action.payload.data.scoreOfStudent.midterm_score,
        final_score: action.payload.data.scoreOfStudent.final_score,
      },
    }),
    getScoreOfStudentOfClassFailure: (state) => ({
      ...state,
      isLoadingGetScoreOfStudentOfClass: false,
    }),

    updateScore: (state) => ({
      ...state,
      isLoadingUpdateScore: true,
    }),
    updateScoreSuccess: (state) => ({
      ...state,
      isLoadingUpdateScore: false,
    }),
    updateScoreFail: (state) => ({
      ...state,
      isLoadingUpdateScore: false,
    }),

    //Danh sách điêmt số của hoc vien theo lop
    getListStudentScoreOfClass: (state) => ({
      ...state,
      isLoadingGetListStudentScoreOfClass: true,
    }),
    getListStudentScoreOfClassSuccess: (state, action) => ({
      ...state,
      isLoadingGetListStudentScoreOfClass: false,
      dataListStudentScoreOfClass: action.payload.data.students,
    }),
    getListStudentScoreOfClassFailure: (state) => ({
      ...state,
      isLoadingGetListStudentScoreOfClass: false,
    }),

    getAllClass: (state) => ({
      ...state,
    }),
    getAllClassSuccess: (state, action) => ({
      ...state,
      allClass: action.payload.data.classes,
    }),
    getAllClassFailure: (state) => ({
      ...state,
      allClass: [],
    }),

    setVisibleModalDSSVOfClass: (state, action) => ({
      ...state,
      visibleModalDSSVOfClass: action.payload,
    }),
  },
});

export const {
  setInfoClass,
  setInfoScore,
  setErrorInfoClass,
  setErrorInfoScore,
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
  setVisibleModalSettingScore,

  setSelectCourseId,

  setClassSelected,
  setShowModalDeleteClass,
  setStudentToSetScoreSelected,

  getListStudentOfClass,
  getListStudentOfClassSuccess,
  getListStudentOfClassFailure,

  getScoreOfStudentOfClass,
  getScoreOfStudentOfClassSuccess,
  getScoreOfStudentOfClassFailure,

  updateScore,
  updateScoreSuccess,
  updateScoreFail,

  getListStudentScoreOfClass,
  getListStudentScoreOfClassSuccess,
  getListStudentScoreOfClassFailure,

  getAllClass,
  getAllClassSuccess,
  getAllClassFailure,

  setVisibleModalDSSVOfClass,

} = classSlice.actions;
export default classSlice.reducer;
