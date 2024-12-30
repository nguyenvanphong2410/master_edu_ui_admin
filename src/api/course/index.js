import { getListDetailsCourse, getListDetailsCourseFailure, getListDetailsCourseSuccess } from "@/states/modules/course/detailsCourse";
import {
  changeHighlightCourse,
  changeHighlightCourseFailure,
  changeHighlightCourseSuccess,
  createCourse,
  createCourseFailure,
  createCourseSuccess,
  deleteCourse,
  deleteCourseFailure,
  deleteCourseSuccess,
  getAllCourse,
  getAllCourseFailure,
  getAllCourseSuccess,
  getListClassesOfCourse,
  getListClassesOfCourseFailure,
  getListClassesOfCourseSuccess,
  getListDataCourse,
  getListDataCourseFailure,
  getListDataCourseSuccess,
  updateCourse,
  updateCourseFailure,
  updateCourseSuccess,
} from "../../states/modules/course";
import callApi from "../callApi";

export const getAllCourses = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/admin/courses/all',
    actionTypes: [getAllCourse, getAllCourseSuccess, getAllCourseFailure],
    variables: {},
    dispatch,
    getState,
  });
};


export const handleGetListDataCourses = () => async (dispatch, getState) => {
  const dataFilter = getState().course.dataFilter;
  let path = `/admin/courses?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDataCourse,
      getListDataCourseSuccess,
      getListDataCourseFailure,],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleCreateCourses = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', data.name);
  form.append('description', data.description ? data.description : '');
  form.append('current_price', data.current_price ? data.current_price : '');
  form.append('original_price', data.original_price ? data.original_price : '');
  form.append('start_time', data.start_time ? data.start_time : '');
  form.append('end_time', data.end_time ? data.end_time : '');

  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });
  form.append('image_featured', imageFeatured);

  return callApi({
    method: "post",
    apiPath: "/admin/courses",
    actionTypes: [
      createCourse,
      createCourseSuccess,
      createCourseFailure,
    ],
    variables: form,
    dispatch,
    getState,
    headers,
  });
}

export const handleUpdateCourses = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', data.name);
  form.append('description', data.description ? data.description : '');
  form.append('current_price', data.current_price ? data.current_price : '');
  form.append('original_price', data.original_price ? data.original_price : '');
  form.append('start_time', data.start_time ? data.start_time : '');
  form.append('end_time', data.end_time ? data.end_time : '');
  form.append('status', data.status ? data.status : '');

  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  return callApi({
    method: "put",
    apiPath: `/admin/courses/${id}`,
    actionTypes: [
      updateCourse,
      updateCourseSuccess,
      updateCourseFailure,
    ],
    variables: form,
    dispatch,
    getState,
    headers,
  });
}

export const handleDeleteCourses = (id) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `/admin/courses/${id}`,
    actionTypes: [
      deleteCourse,
      deleteCourseSuccess,
      deleteCourseFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const handleChangeHighlightCourse = (id) => async (dispatch, getState) => {
  return callApi({
    method: "patch",
    apiPath: `/admin/courses/${id}/highlighted`,
    actionTypes: [
      changeHighlightCourse,
      changeHighlightCourseSuccess,
      changeHighlightCourseFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const requestGetDetailsCourseForUser = (id) => async (dispatch, getState) => {
  let path = `courses/${id}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDetailsCourse, getListDetailsCourseSuccess, getListDetailsCourseFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetClassesOfCourse = (id) => async (dispatch, getState) => {
  let path = `admin/courses/classOfCourse/${id}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListClassesOfCourse,
      getListClassesOfCourseSuccess,
      getListClassesOfCourseFailure],
    variables: {},
    dispatch,
    getState,
  });
};
