import { GENDER_USER, STATUS_USER } from "@/utils/constants"

export const userInitialData = {
  dataFilter: {
    keySearch: '',
    page: 1,
    perPage: 20,
    order: null,
    column: null
  },
}

export const initInfoAdmin = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: GENDER_USER.MALE,
  address: '',
  status: STATUS_USER['ACTIVE'],
  role_ids: [],
}

export const initErrInfoAdmin = {
  name: '',
  email: '',
  avatar: '',
  password: '',
  phone: '',
  gender: '',
  address: '',
  status: '',
  role_ids:'',

}