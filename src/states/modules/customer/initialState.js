import { GENDER_USER, STATUS_USER } from "@/utils/constants"

export const customerInitialData = {
  dataFilter: {
    q: '',
    page: 1,
    perPage: 20,
    order: null,
    column: null
  },
}

export const initInfoCustomer = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: GENDER_USER.MALE,
  attendance_score: 0,
  plus_score: 0,
  midterm_score: 0,
  final_score: 0,
  address: '',
  status: STATUS_USER['ACTIVE'],
}

export const initErrInfoCustomer = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: '',
  attendance_score: '',
  plus_score: '',
  midterm_score: '',
  final_score: '',
  address: '',
  status: '',
}

