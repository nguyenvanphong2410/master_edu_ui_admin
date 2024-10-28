import callApi from '@/api/callApi';
import {
  changeDocCheckClass,
  changeDocCheckClassFail,
  changeDocCheckClassSuccess,
  changeStatusClass,
  changeStatusClassFail,
  changeStatusClassSuccess,
  createClass,
  createClassFail,
  createClassSuccess,
  deleteClass,
  deleteClassFail,
  deleteClassSuccess,
  getListClass,
  getListClassFailure,
  getListClassSuccess,
  updateClass,
  updateClassFail,
  updateClassSuccess,
} from '@/states/modules/class';

export const getListClasses = () => async (dispatch, getState) => {
  const dataFilter = getState().class.dataFilter;
  let path = `/admin/class?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  
  if (dataFilter.packageId) {
    console.log("🌈 ~ getListClasses ~ packageId:", dataFilter.packageId)
    path += `&package_id=${dataFilter.packageId}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListClass, getListClassSuccess, getListClassFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleCreateClass = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  let form = new FormData();

  form.append('name', data.name);
  form.append('file_record', data.file_record ? data.file_record : null);
  form.append('name_file', data.name_file ? data.name_file : null);
  form.append('course_id', data.course_id ? data.course_id : null);
  form.append('teacher_id', data.teacher_id ? data.teacher_id : null);
  form.append('max_number_student', data.max_number_student ? data.max_number_student : 0);
  form.append('notes', data.notes ? data.notes : '');

  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });
  form.append('image_featured', imageFeatured);

  if (data.student_ids?.length > 0) {
    data.student_ids.map((item) => {
      form.append('student_ids[]', item);
    });
  }

  return callApi({
    method: 'post',
    apiPath: '/admin/class',
    actionTypes: [createClass, createClassSuccess, createClassFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const handleUpdateClass = (id, data) => async (dispatch, getState) => {
  console.log("🌈 ~ handleUpdateClass ~ id:", id)
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();

  form.append('name', data.name);
  form.append('file_record', data.file_record ? data.file_record : null);
  form.append('name_file', data.name_file ? data.name_file : null);
  form.append('course_id', data.course_id ? data.course_id : null);
  form.append('teacher_id', data.teacher_id ? data.teacher_id : null);
  form.append('max_number_student', data.max_number_student ? data.max_number_student : 0);
  form.append('start_time', data.start_time ? data.start_time : null);
  form.append('end_time', data.end_time ? data.end_time : null);
  form.append('notes', data.notes ? data.notes : '');

  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (data.student_ids?.length > 0) {
    data.student_ids.map((item) => {
      form.append('student_ids[]', item);
    });
  }

  return callApi({
    method: 'put',
    apiPath: `/admin/class/${id}`,
    actionTypes: [updateClass, updateClassSuccess, updateClassFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestChangeStatusClass = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/class/update-status/${id}`,
    actionTypes: [changeStatusClass, changeStatusClassSuccess, changeStatusClassFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const requestChangeDocCheckClass = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/class/update-doc-check/${id}`,
    actionTypes: [changeDocCheckClass, changeDocCheckClassSuccess, changeDocCheckClassFail],
    variables: {
      doc_check: data,
    },
    dispatch,
    getState,
  });
};

export const handleDeleteClass = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/class/${id}`,
    actionTypes: [deleteClass, deleteClassSuccess, deleteClassFail],
    variables: {},
    dispatch,
    getState,
  });
};
