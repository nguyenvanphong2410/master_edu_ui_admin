import {isValidEmail, isValidPassword, isValidPhone} from "./helper";
import _ from "lodash";

export const isValidate = (data, type, errors, title) => {
  let error = false
  let dataError = _.cloneDeep(errors);
  switch (type) {
    case 'code':
      if (data.code.length === 0) {
        dataError.code = `Mã ${title} không được để trống.`;
        error = true;
      } else {
        dataError.code = '';
      }
      break;
    case 'name':
      if (data.name.length === 0) {
        dataError.name = `Tên ${title} không được để trống.`;
        error = true;
      } else if (data.name.length > 50) {
        dataError.name = 'Độ dài không vượt quá 50 kí tự';
        error = true;
      } else {
        dataError.name = '';
      }
      break;
    case 'email':
      if (!data.email || data.email.length === 0) {
        dataError.email = 'Email không được để trống.';
        error = true;
      } else if (!isValidEmail(data.email)) {
        dataError.email = 'Email không đúng định dạng.';
        error = true;
      } else {
        dataError.email = '';
      }
      break;
    case 'phone':
      if (data.phone.length === 0) {
        dataError.phone = 'Số điện thoại không được để trống.';
        error = true;
      } else if (!isValidPhone(data.phone)) {
        dataError.phone = 'Số điện thoại không đúng định dạng';
        error = true;
      } else {
        dataError.phone = '';
      }
      break;
    case 'address':
      if (data.address.length === 0) {
        dataError.address = 'Địa chỉ không được để trống.';
        error = true;
      } else if (data.address.length > 500) {
        dataError.address = 'Độ dài không vượt quá 500';
        error = true;
      } else {
        dataError.address = '';
      }
      break;
    case 'currentPassword':
      if (data.currentPassword.length === 0) {
        dataError.currentPassword = 'Mật khẩu hiện tại không được để trống.';
        error = true;
      } else if (!isValidPassword(data.currentPassword)) {
        dataError.currentPassword = "Mật khẩu phải bao gồm có ít nhất 6 ký tự"
        error = true
      } else {
        dataError.currentPassword = '';
      }
      break;
    case 'password':
      if (data.password.length === 0) {
        dataError.password = 'Mật khẩu mới không được để trống.';
        error = true;
      } else if (!isValidPassword(data.password)) {
        dataError.password = "Mật khẩu phải bao gồm có ít nhất 6 ký tự"
        error = true
      } else {
        dataError.password = '';
      }
      break;
    case 'confirmPassword':
      if (data.confirmPassword.length === 0) {
        dataError.confirmPassword = 'Mật khẩu xác nhận không được để trống.';
        error = true;
      } else if (data.password && data.confirmPassword !== data.password) {
        dataError.confirmPassword = 'Mật khẩu không trùng khớp.'
        error = true
      } else {
        dataError.confirmPassword = '';
      }
      break;
    case 'user_id':
      if (!data.user_id) {
        dataError.user_id = 'Giáo viên không được để trống.';
        error = true;
      } else {
        dataError.user_id = '';
      }
      break;
  }

  return {
    isError: error,
    error: dataError,
  }
}
