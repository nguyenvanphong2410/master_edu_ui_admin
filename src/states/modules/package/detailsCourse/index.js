import {createSlice} from '@reduxjs/toolkit';

const detailsCourseSlice = createSlice({
  name: 'detailsCourse',
  initialState: {
    courseDetails: {},
    isLoadingTableDetailsCourse: false,

  },
  reducers: {
    getListDetailsCourse: (state) => ({
      ...state,
      isLoadingTableDetailsCourse: true,

    }),
    getListDetailsCourseSuccess: (state, action) => ({
      ...state,
      isLoadingTableDetailsCourse: false,
      courseDetails: action.payload.data,
    }),
    getListDetailsCourseFailure: (state) => ({
      ...state,
      isLoadingTableDetailsCourse: false,

    }),
  },
});

export const {getListDetailsCourse, getListDetailsCourseSuccess, getListDetailsCourseFailure} =
  detailsCourseSlice.actions;
export default detailsCourseSlice.reducer;
