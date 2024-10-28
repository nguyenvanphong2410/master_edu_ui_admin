import React from "react";
import store from "../states/configureStore";
import {notification} from "antd";
import CloseIcon from '../assets/images/icons/light/close.svg';
import success from '../assets/images/icons/notification/success_16x16.svg';
import error from '../assets/images/icons/notification/error_16x16.svg';
import warning from '../assets/images/icons/notification/warning_16x16.svg';
import {isValidate} from "./validate.js";
import moment from "moment";
import {isValidateAccount} from "./validates/validateAccount.js";
import {isValidateLogin} from "./validates/validateLogin.js";
import vi_VN from 'antd/es/date-picker/locale/vi_VN.js';
import {isValidateCustomer} from "./validates/validateCustomer.js";
import _ from "lodash";

import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Nhập ngôn ngữ tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime'; // Nhập plugin relativeTime

dayjs.extend(relativeTime); // Kích hoạt plugin relativeTime
dayjs.locale('vi'); // Thiết lập ngôn ngữ là tiếng Việt

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_NAME_REGEX =  /^[\p{L} ]*$/u;
export const VALIDATE_PASSWORD_REGEX = /^.{6,}$/
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/
export const VALIDATE_PHONE_CONTACT_REGEX_RULE = /^[0-9]{8,}$/
export const VALIDATE_URL_REGEX = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/

export const hasPermission = (permissions) => {
  let { auth } = store.getState();
  let isPermission = false;
  if (permissions) {
    permissions.forEach(permission => {
      if (
        auth.authUser &&
        auth.authUser.permissions &&
        (
          auth.authUser.permissions.includes(permission) || auth.authUser.permissions.includes('super_admin')
        )
      ) {
        isPermission = true
      }
    })
  }

  return isPermission;
}

export const getNotification = (type, content, duration = 3, align = 'top') => {
  let typeNotification = handleGetTypeNotification(type);
  notification[type]({
    message: '',
    description: (
      <div className={`notification-content ${typeNotification.className}`}>
        <div className={'icon-notification'}>
          <img src={typeNotification.icon} alt=""/>
        </div>
        <span className={'text-notification'}>{content}</span>
      </div>
    ),
    closeIcon: (
      <img src={CloseIcon} alt=""/>
    ),
    placement: align,
    duration: duration,
    style: {fontWeight: "normal"}
  });
};

const handleGetTypeNotification = (type) => {
  let typeNotification = {};
  switch (type) {
    case "error":
      typeNotification = {
        className: 'notification-error',
        icon: error,
      }
      break;
    case "warning":
      typeNotification = {
        className: 'notification-warning',
        icon: warning,
      }
      break;
    default:
      typeNotification = {
        className: 'notification-success',
        icon: success,
      }
  }
  return typeNotification
}

// Validate
export const isValidEmail = (email) => {
  let result = false
  if (email && typeof email === 'string') {
    const regex = RegExp(VALIDATE_EMAIL_REGEX);
    result = regex.test(email.trim())
  }
  return result
}

export const isValidName = (name) => {
  let result = false
  if (name && typeof name === 'string') {
    const regex = RegExp(VALIDATE_NAME_REGEX);
    result = regex.test(name.trim())
  }
  return result
}


export const isValidPassword = (password) => {
  let result = false
  if (password && typeof password === 'string') {
    const regex = RegExp(VALIDATE_PASSWORD_REGEX);
    result = regex.test(password.trim())
  }
  return result
}

export const isValidPhone = (phone) => {
  let result = false

  if (phone && typeof phone === 'string') {
    let trimPhone = phone.trim()

    if (trimPhone) {
      const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

      let ruleMatchs = trimPhone.match(regexRule);

      if (ruleMatchs && ruleMatchs.length > 0) {
        result = (ruleMatchs[0] === trimPhone)
      }
    }
  }
  return result
}

export const handleCheckValidateConfirm = (data, errors, type = 'default', title = '') => {
  let error = false;
  let keys = Object.keys(data);
  let dataError = errors

  keys.map(key => {
    let validate = {};
    switch (type){
      case 'account':
        validate = isValidateAccount(data, key, dataError);
        break;
      case 'login':
        validate = isValidateLogin(data, key, dataError);
        break;
      case 'profile':
        validate = isValidateAccount(data, key, dataError, false);
        break;
      case 'customer':
        validate = isValidateCustomer(data, key, dataError);
        break;
      default:
        validate = isValidate(data, key, dataError, title);
    }
    dataError = validate.error;
    if (validate.isError) {
      error = true;
    }
  })

  return {
    isError: error,
    dataError: dataError
  }
}

export const getDynamicRoute = (path) => {
  const {location} = store.getState().app;
  const params = location?.params || {};

  let pathActive = path;
  if (_.isString(pathActive) && pathActive && !!pathActive.length) {
      if (pathActive.startsWith('/')) {
          pathActive = pathActive.substring(1);
      }
      const pathArray = pathActive.split('/');

      const newArray = pathArray.map((item) => {
          if (item.startsWith(':')) {
              const pathWithoutColon = item.replace(/:/g, '');
              return params[pathWithoutColon];
          }
          return item;
      });
      let pathString = newArray.join('/');
      if (!pathString.startsWith('/')) {
          pathString = '/' + pathString;
      }

      return pathString;
  }
};

export const isRouteActive = (path) => {
  const {location} = store.getState().app;
  const currentPath = location.pathName;

  return getDynamicRoute(path) === currentPath;
};

export const handleCheckRoute = (routes) => {
  let isActive = false;

  const handleCheckArr = (index) => {
      if (index >= routes.length) return;

      if (isRouteActive(routes[index])) {
          isActive = true;
          return;
      } else {
          return handleCheckArr(++index);
      }
  };

  handleCheckArr(0);

  return isActive;
};

export const convertQueryStringToObject = (queryString) => {
  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }

  var pairs = queryString.split('&');
  var result = {};

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1] || '');

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }

      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const handleSetTimeOut = (func, delay = 1000, timeoutId = null) => {
  let handleSetTimeOut;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  handleSetTimeOut = setTimeout(func, delay);

  return handleSetTimeOut;
}

export const formatDate = (date) => {
  return moment(date * 1000).format('HH:mm DD/MM/YYYY')
}

export const formatMoney = (amount) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return formatter.format(amount);
}

export const formatPoint = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
}

export const formatLocalDateTime = {
  ...vi_VN,
  lang: {
      ...vi_VN.lang,
      shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      shortMonths:  [
        "Thg 1",
        "Thg 2",
        "Thg 3",
        "Thg 4",
        "Thg 5",
        "Thg 6",
        "Thg 7",
        "Thg 8",
        "Thg 9",
        "Thg 10",
        "Thg 11",
        "Thg 12",
    ],
    shortQuarter: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
      "now": "Hiện tại",
  },
}

export const formatNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const handleGetLastRecordFlowPage = (totalRecord, currentPage, perPage) => {
  let number = (currentPage - 1) * perPage + perPage;
  if (totalRecord <= number) {
    number = totalRecord;
  }
  return number;
}

export const handleGetTextSelectPage = (totalRecord, currentPage, perPage) => {
  let text = 'Hiển thị ';
  text += ((currentPage - 1) * perPage + 1) + ' - ';
  text += handleGetLastRecordFlowPage(totalRecord, currentPage, perPage) + ' trên tổng ';
  text += totalRecord + ' bản ghi';
  return text;
}
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result)
  reader.readAsDataURL(img);
};

export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
}

export const dayjsFormatSort = (createdAt) => {
  return dayjs(createdAt).format("DD/MM/YYYY");
};

export const dayjsFormatFromNow = (createdAt) => {
  return dayjs(createdAt).fromNow();
};