import { GENDER_USER, STATUS_USER } from '@/utils/constants';

export const teacherInitialData = {
    keySearch: '',
    page: 1,
    perPage: 20,
    order: null,
    column: null,
};

export const initInfoTeacher = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: GENDER_USER.MALE,
  address: '',
  status: STATUS_USER['ACTIVE'],
  role_ids: [],
};

export const initErrInfoTeacher = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: '',
  address: '',
  status: '',
  role_ids: [],
};

export const paginationListTeachers = {
  currentPage: 1,
  perPage: 20,
  totalPage: 1,
  totalRecord: 0,
};
