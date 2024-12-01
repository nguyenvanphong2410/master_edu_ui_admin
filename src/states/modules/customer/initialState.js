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
  address: '',
  status: '',
}

