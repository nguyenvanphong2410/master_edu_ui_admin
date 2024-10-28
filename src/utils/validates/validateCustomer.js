import _ from "lodash";
import {isValidEmail, isValidName, isValidPassword, isValidPhone} from "../helper.js";

export const isValidateCustomer = (data, type, errors) => {
  let error = false
  let dataError = _.cloneDeep(errors);

  switch (type) {
    case 'phone':
      if (!data.phone || data.phone.length === 0) {
        dataError.phone = 'Số điện thoại không được để trống.';
        error = true;
      }
      else if (!isValidPhone(data.phone)) {
        dataError.phone = 'Số điện thoại không đúng định dạng.';
        error = true;
      } else {
        dataError.phone = '';
      }
      break;
    case 'name':
      if (data.name?.length > 0 && !isValidName(data.name)) {
        dataError.name = "Họ và tên không bao gồm số hoặc ký tự đặc biệt"
        error = true;
      }else {
        dataError.name = '';
      }
      break;
    case 'email':
      if (data.email?.length > 0 && !isValidEmail(data.email)) {
        dataError.email = 'Email không đúng định dạng.';
        error = true;
      } else {
        dataError.email = '';
      }
      break;
    case 'password':
      if (data.password.length === 0) {
        dataError.password = 'Mật khẩu không được để trống.';
        error = true;
      } else if (!isValidPassword(data.password)) {
        dataError.password = "Mật khẩu phải bao gồm có ít nhất 6 ký tự."
        error = true
      } else {
        dataError.password = '';
      }
      break;
    default:
      break;
  }

  return {
    isError: error,
    error: dataError,
  }
}
