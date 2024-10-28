import { createSlice } from '@reduxjs/toolkit';

const configServiceSlice = createSlice({
  name: 'configService',
  initialState: {
    isLoadingConfigService: false,
    islLoadingBtnConfigService: false,
    infoConfigServices: {
      config_services: [],
    },
    errorInfoConfigServices: {
      config_services: [],
    },
    configServiceNames: []
  },
  reducers: {
    getListConfigService: (state) => ({
      ...state,
      isLoadingConfigService: true,
    }),
    getListConfigServiceSuccess: (state, action) => ({
      ...state,
      isLoadingConfigService: false,
      configServiceNames: action.payload.data,
      infoConfigServices: {
        config_services: action.payload.data,
      },
    }),
    getListConfigServiceFailure: (state) => ({
      ...state,
      isLoadingConfigService: false,
    }),
    setInfoConfigServices: (state, action) => ({
      ...state,
      infoConfigServices: action.payload,
    }),
    setErrorInfoConfigServices: (state, action) => ({
      ...state,
      errorInfoConfigServices: action.payload,
    }),
    updateConfigService: (state) => ({
      ...state,
      islLoadingBtnConfigService: true,
    }),
    updateConfigServiceSuccess: (state) => ({
      ...state,
      islLoadingBtnConfigService: false,
    }),
    updateConfigServiceFailure: (state) => ({
      ...state,
      islLoadingBtnConfigService: false,
    }),
  },
});

export const {
  getListConfigService,
  getListConfigServiceSuccess,
  getListConfigServiceFailure,
  setInfoConfigServices,
  setErrorInfoConfigServices,
  updateConfigService,
  updateConfigServiceFailure,
  updateConfigServiceSuccess,
} = configServiceSlice.actions;

export default configServiceSlice.reducer;
