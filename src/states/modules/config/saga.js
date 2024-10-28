import { all, fork, put, takeLatest } from "redux-saga/effects";
import { setBreadcrumb, setTitlePage } from "../app";
import {
  handleGetInfoBanks,
  handleGetInfoLarks,
  handleGetInfoOtp,
  handleGetService,
  handleGetAllBanks,
} from "../../../api/config";
import {
  setErrorInfoBank,
  setErrorInfoLark,
  setErrorInfoSMS,
  setErrorService,
  updateInfoBankFailure,
  updateInfoBankSuccess,
  updateInfoLarkFailure,
  updateInfoLarkSuccess,
  updateInfoSMSFailure,
  updateInfoSMSSuccess,
  updateServiceFailure,
  updateServiceSuccess,
} from ".";
import { getNotification, hasPermission } from "../../../utils/helper";
import _ from "lodash";
import { PERMISSIONS } from "@/utils/constants";

function* loadRouteData() {
  yield put(setTitlePage("Cấu hình liên kết"));
  yield put(
    setBreadcrumb([
      {
        path: "/",
        name: "Trang chủ",
      },
      {
        path: "/config-management",
        name: "Cấu hình",
      },
      {
        path: "/config-management/link",
        name: "Cấu hình liên kết",
      },
    ])
  );

  if (hasPermission([PERMISSIONS.LIST.LIST_CONFIG_LARK])) {
    yield put(handleGetInfoLarks());
  }

  if (hasPermission([PERMISSIONS.LIST.LIST_CONFIG_BANK])) {
    yield put(handleGetAllBanks());
    yield put(handleGetInfoBanks());
  }

  if (hasPermission([PERMISSIONS.LIST.LIST_CONFIG_OTP])) {
    yield put(handleGetInfoOtp());
  }
  
  if (hasPermission([PERMISSIONS.LIST.LIST_CONFIG_SERVICE])) {
    yield put(handleGetService());
  }

  yield put(setErrorInfoBank({
    bank_id: "",
    account_no: "",
    template: "",
    account_name: "",
  }));
  yield put(setErrorInfoLark({
    app_id: "",
    app_secret: "",
    group_id: "",
    oauth_url: "",
    message_url: "",
  }));
  yield put(setErrorInfoSMS({
    app_key: "",
    template_register: "",
    template_forgot_password: "",
  }));
  yield put(setErrorService({
    token: "",
  }));
}

function* handleActions() {
  yield takeLatest(updateInfoBankSuccess, function* () {
    getNotification("success", "Cập nhật tài khoản ngân hàng thành công.");
    yield put(handleGetInfoBanks());
  });

  yield takeLatest(updateInfoBankFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoBank({
          bank_id: _.get(errors, "bank_id", ""),
          account_no: _.get(errors, "account_no", ""),
          template: _.get(errors, "template", ""),
          account_name: _.get(errors, "account_name", ""),
        })
      );
    } else {
      getNotification("error", "Cập nhật tài khoản ngân hàng thất bại.");
    }
  });

  yield takeLatest(updateInfoLarkSuccess, function* () {
    getNotification("success", "Cập nhật thông tin lark thành công.");
    yield put(handleGetInfoLarks());
  });

  yield takeLatest(updateInfoLarkFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoLark({
          app_id: _.get(errors, 'app_id', ""),
          app_secret: _.get(errors, 'app_secret', ""),
          group_id: _.get(errors, 'group_id', ""),
          oauth_url: _.get(errors, 'oauth_url', ""),
          message_url: _.get(errors, 'message_url', ""),
        })
      );
    } else {
      getNotification("error", "Cập nhật thông tin lark thất bại.");
    }
  });

  yield takeLatest(updateInfoSMSSuccess, function* () {
    getNotification("success", "Cập nhật thông tin OTP thành công.");
    yield put(handleGetInfoOtp());
  });

  yield takeLatest(updateInfoSMSFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorInfoSMS({
          app_key: _.get(errors, 'app_key', ""),
          template_register: _.get(errors, 'template_register', ""),
          template_forgot_password: _.get(errors, 'template_forgot_password', ""),
        })
      );
    } else {
      getNotification("error", "Cập nhật thông tin OTP thất bại.");
    }
  });

  yield takeLatest(updateServiceSuccess, function* () {
    getNotification("success", "Cập nhật thông tin dịch vụ thành công.");
    yield put(handleGetService());
  });

  yield takeLatest(updateServiceFailure, function* (action) {
    const errorStatus = action.payload.data.status;
    if (errorStatus === 400) {
      const errors = action.payload.data.detail;

      yield put(
        setErrorService({
          token: _.get(errors, 'token', ""),
        })
      );
    } else {
      getNotification("error", "Cập nhật thông tin dịch vụ thất bại.");
    }
  });
}

export default function* loadConfigSaga() {
  yield all([
    fork(loadRouteData), 
    fork(handleActions)
  ]);
}
