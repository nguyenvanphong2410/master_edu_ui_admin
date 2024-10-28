import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    isLoadingConfig: false,
    isLoadingLark: false,
    isLoadingBank: false,
    isLoadingSMS: false,
    isLoadingUpdateService: false,
    isLoadingGetAllBank: false,
    updateInfoBank: {
      bank_id: "",
      template: "compact2",
      account_no: "",
      account_name: ""
    },
    updateInfoLark: {
      app_id: "",
      app_secret: "",
      group_id: "",
      oauth_url: "",
      message_url: "",
    },
    updateInfoSMS: {
      app_key: "",
      url: "",
      template_register: "",
      template_forgot_password: "",
    },
    updateService: {
      token: "",
      name_based_on_birth_api: "",
      compatibility_by_birth_and_name_api: "",
    },
    errorInfoBank: {
      bank_id: "",
      account_no: "",
      template: "",
      account_name: "",
    },
    errorInfoLark: {
      app_id: "",
      app_secret: "",
      group_id: "",
      oauth_url: "",
      message_url: "",
    },
    errorInfoSMS: {
      app_key: "",
      url: "",
      template_register: "",
      template_forgot_password: "",
    },
    errorService: {
      token: "",
      name_based_on_birth_api: "",
      compatibility_by_birth_and_name_api: "",
    },
    banks: [],
  },
  reducers: {
    getInfoBanks: (state) => ({
      ...state,
      isLoadingConfig: true,
    }),
    getInfoBankSuccess: (state, action) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoBank: {
        bank_id: action.payload.data.bank_id,
        template: action.payload.data.template,
        account_no: action.payload.data.account_no,
        account_name: action.payload.data.account_name,
      },
    }),
    getInfoBankFailure: (state) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoBank: {
        bank_id: "",
        template: "compact2",
        account_no: "",
        account_name: "",
      },
    }),
    getInfoLarks: (state) => ({
      ...state,
      isLoadingConfig: true,
    }),
    getInfoLarkSuccess: (state, action) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoLark: {
        app_id: action.payload.data.app_id,
        app_secret: action.payload.data.app_secret,
        group_id: action.payload.data.group_id,
        oauth_url: action.payload.data.oauth_url,
        message_url: action.payload.data.message_url,
      },
    }),
    getInfoLarkFailure: (state) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoLark: {
        app_id: "",
        app_secret: "",
        group_id: "",
        oauth_url: "",
        message_url: "",
      },
    }),
    getInfoOtp: (state) => ({
      ...state,
      isLoadingConfig: true,
    }),
    getInfoOtpSuccess: (state, action) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoSMS: {
        url: action.payload.data.url,
        app_key: action.payload.data.app_key,
        template_register: action.payload.data.template_register,
        template_forgot_password: action.payload.data.template_forgot_password,
      },
    }),
    getInfoOtpFailure: (state) => ({
      ...state,
      isLoadingConfig: false,
      updateInfoSMS: {
        app_key: "",
        template_register: "",
        template_forgot_password: "",
      },
    }),
    getService: (state) => ({
      ...state,
      isLoadingConfig: true,
    }),
    getServiceSuccess: (state, action) => ({
      ...state,
      isLoadingConfig: false,
      updateService: {
        token: action.payload.data.token,
        name_based_on_birth_api: action.payload.data.name_based_on_birth_api,
        compatibility_by_birth_and_name_api: action.payload.data.compatibility_by_birth_and_name_api,
      },
    }),
    getServiceFailure: (state) => ({
      ...state,
      isLoadingConfig: false,
      updateService: {
        token: "",
      },
    }),
    updateInfoBank: (state) => ({
      ...state,
      isLoadingLark: true,
    }),
    updateInfoBankSuccess: (state) => ({
      ...state,
      isLoadingBank: false,
    }),
    updateInfoBankFailure: (state) => ({
      ...state,
      isLoadingBank: false,
    }),
    updateInfoLark: (state) => ({
      ...state,
      isLoadingLark: true,
    }),
    updateInfoLarkSuccess: (state) => ({
      ...state,
      isLoadingLark: false,
    }),
    updateInfoLarkFailure: (state) => ({
      ...state,
      isLoadingLark: false,
    }),
    updateInfoSMS: (state) => ({
      ...state,
      isLoadingSMS: true,
    }),
    updateInfoSMSSuccess: (state) => ({
      ...state,
      isLoadingSMS: false,
    }),
    updateInfoSMSFailure: (state) => ({
      ...state,
      isLoadingSMS: false,
    }),
    updateService: (state) => ({
      ...state,
      isLoadingUpdateService: true,
    }),
    updateServiceSuccess: (state) => ({
      ...state,
      isLoadingUpdateService: false,
    }),
    updateServiceFailure: (state) => ({
      ...state,
      isLoadingUpdateService: false,
    }),
    setUpdateInfoBank: (state, action) => ({
      ...state,
      updateInfoBank: action.payload,
    }),
    setUpdateInfoLark: (state, action) => ({
      ...state,
      updateInfoLark: action.payload,
    }),
    setUpdateInfoSMS: (state, action) => ({
      ...state,
      updateInfoSMS: action.payload,
    }),
    setUpdateService: (state, action) => ({
      ...state,
      updateService: action.payload,
    }),
    setErrorInfoBank: (state, action) => ({
      ...state,
      errorInfoBank: action.payload,
    }),
    setErrorInfoLark: (state, action) => ({
      ...state,
      errorInfoLark: action.payload,
    }),
    setErrorInfoSMS: (state, action) => ({
      ...state,
      errorInfoSMS: action.payload,
    }),
    setErrorService: (state, action) => ({
      ...state,
      errorService: action.payload,
    }),
    getAllBank: (state) => ({
      ...state,
      isLoadingGetAllBank: true,
    }),
    getAllBankSuccess: (state, action) => ({
      ...state,
      isLoadingGetAllBank: false,
      banks: action.payload.data,
    }),
    getAllBankFailure: (state) => ({
      ...state,
      isLoadingGetAllBank: false,
      banks: [],
    }),
  },
});

export const {
  getInfoBanks,
  getInfoBankSuccess,
  getInfoBankFailure,
  getInfoLarks,
  getInfoLarkSuccess,
  getInfoLarkFailure,
  getInfoOtp,
  getInfoOtpSuccess,
  getInfoOtpFailure,
  getService,
  getServiceSuccess,
  getServiceFailure,
  updateInfoBank,
  updateInfoBankSuccess,
  updateInfoBankFailure,
  updateInfoLark,
  updateInfoLarkFailure,
  updateInfoLarkSuccess,
  updateInfoSMS,
  updateInfoSMSFailure,
  updateInfoSMSSuccess,
  updateService,
  updateServiceSuccess,
  updateServiceFailure,
  setUpdateInfoBank,
  setUpdateInfoLark,
  setUpdateInfoSMS,
  setUpdateService,
  setErrorInfoBank,
  setErrorInfoLark,
  setErrorInfoSMS,
  setErrorService,
  getAllBank,
  getAllBankSuccess,
  getAllBankFailure
} = configSlice.actions;

export default configSlice.reducer;
