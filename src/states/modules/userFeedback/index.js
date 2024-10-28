import { createSlice } from '@reduxjs/toolkit';

const userFeedbackSlice = createSlice({
  name: 'userFeedback',
  initialState: {
    feedbacks: [],
    isLoadingGetFeedbacks: false,
    isLoadingBtnCreateOrUpdateFeedback: false,
    visibleModalCreateOrUpdateFeedback: false,
    configModalFeedback: {
      title: '',
      type: '',
    },
    errorInfoFeedback: {
      cover: '',
      avatar: '',
      name: '',
      content: '',
    },
    infoFeedback: {
      cover: {
        url: '',
        data: '',
      },
      avatar: {
        url: '',
        data: '',
      },
      name: '',
      content: '',
    },
    isLoadingBtnDelete: false,
    visibleModalDeleteFeedback: false,
  },
  reducers: {
    setInfoFeedback: (state, action) => ({
      ...state,
      infoFeedback: action.payload,
    }),
    setErrorInfoFeedback: (state, action) => ({
      ...state,
      errorInfoFeedback: action.payload,
    }),
    setConfigModalFeedback: (state, action) => ({
      ...state,
      configModalFeedback: action.payload,
    }),
    setShowModalCreateOrUpdateFeedback: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateFeedback: action.payload,
    }),
    requestCreateOrUpdateFeedback: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateFeedback: true,
    }),
    requestCreateOrUpdateFeedbackSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateFeedback: false,
    }),
    requestCreateOrUpdateFeedbackFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateFeedback: false,
    }),
    requestDeleteFeedback: (state) => ({
      ...state,
      isLoadingBtnDelete: true,
    }),
    requestDeleteFeedbackSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
    }),
    requestDeleteFeedbackFail: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
    }),
    setShowModalDeleteFeedback: (state, action) => ({
      ...state,
      visibleModalDeleteFeedback: action.payload,
    }),
    requestGetUserFeedback: (state) => ({
      ...state,
      isLoadingGetFeedbacks: true,
      feedbacks: [],
    }),
    requestGetUserFeedbackSuccess: (state, action) => ({
      ...state,
      isLoadingGetFeedbacks: false,
      feedbacks: action.payload.data.map((item) => {
        item.cover = {
          url: item.cover,
          data: ''
        }
        item.avatar = {
          url: item.avatar,
          data: ''
        }
        return item;
      }),
    }),
    requestGetUserFeedbackFail: (state) => ({
      ...state,
      isLoadingGetFeedbacks: false,
    }),
  },
});

export const {
  setInfoFeedback,
  setErrorInfoFeedback,
  setConfigModalFeedback,
  setShowModalCreateOrUpdateFeedback,
  requestCreateOrUpdateFeedback,
  requestCreateOrUpdateFeedbackSuccess,
  requestCreateOrUpdateFeedbackFail,
  requestDeleteFeedback,
  requestDeleteFeedbackSuccess,
  requestDeleteFeedbackFail,
  setShowModalDeleteFeedback,
  requestGetUserFeedback,
  requestGetUserFeedbackSuccess,
  requestGetUserFeedbackFail,
} = userFeedbackSlice.actions;

export default userFeedbackSlice.reducer;
