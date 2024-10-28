import { getListDetailsCourse, getListDetailsCourseFailure, getListDetailsCourseSuccess } from "@/states/modules/package/detailsCourse";
import {
  changeHighlightPackage,
  changeHighlightPackageFailure,
  changeHighlightPackageSuccess,
  createPackage,
  createPackageFailure,
  createPackageSuccess,
  deletePackage,
  deletePackageFailure,
  deletePackageSuccess,
  getAllCourse,
  getAllCourseFailure,
  getAllCourseSuccess,
  getListDataPackage,
  getListDataPackageFailure,
  getListDataPackageSuccess,
  updatePackage,
  updatePackageFailure,
  updatePackageSuccess,
} from "../../states/modules/package";
import callApi from "../callApi";

export const getAllCourses = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/admin/packages/all',
    actionTypes: [getAllCourse, getAllCourseSuccess, getAllCourseFailure],
    variables: {},
    dispatch,
    getState,
  });
};


export const handleGetListDataPackages = () => async (dispatch, getState) => {
  const dataFilter = getState().package.dataFilter;
  let path = `/admin/packages?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDataPackage,
      getListDataPackageSuccess,
      getListDataPackageFailure,],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleCreatePackages = (data) => async (dispatch, getState) => {
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
    apiPath: "/admin/packages",
    actionTypes: [
      createPackage,
      createPackageSuccess,
      createPackageFailure,
    ],
    variables: form,
    dispatch,
    getState,
    headers,
  });
}

export const handleUpdatePackages = (id, data) => async (dispatch, getState) => {
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
    apiPath: `/admin/packages/${id}`,
    actionTypes: [
      updatePackage,
      updatePackageSuccess,
      updatePackageFailure,
    ],
    variables: form,
    dispatch,
    getState,
    headers,
  });
}

export const handleDeletePackages = (id) => async (dispatch, getState) => {
  return callApi({
    method: "delete",
    apiPath: `/admin/packages/${id}`,
    actionTypes: [
      deletePackage,
      deletePackageSuccess,
      deletePackageFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const handleChangeHighlightPackage = (id) => async (dispatch, getState) => {
  return callApi({
    method: "patch",
    apiPath: `/admin/packages/${id}/highlighted`,
    actionTypes: [
      changeHighlightPackage,
      changeHighlightPackageSuccess,
      changeHighlightPackageFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const requestGetDetailsCourseForUser = (id) => async (dispatch, getState) => {
  let path = `packages/${id}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDetailsCourse, getListDetailsCourseSuccess, getListDetailsCourseFailure],
    variables: {},
    dispatch,
    getState,
  });
};
