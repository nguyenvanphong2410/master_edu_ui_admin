import {
  getListConfigService,
  getListConfigServiceFailure,
  getListConfigServiceSuccess,
  updateConfigService,
  updateConfigServiceFailure,
  updateConfigServiceSuccess,
} from '@/states/modules/configService';
import callApi from '../callApi';

export const handleGetInfoConfigServices = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/admin/config-services',
    actionTypes: [getListConfigService, getListConfigServiceSuccess, getListConfigServiceFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleUpdateInfoConfigServices = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: '/admin/config-services',
    actionTypes: [updateConfigService, updateConfigServiceSuccess, updateConfigServiceFailure],
    variables: data,
    dispatch,
    getState,
  });
};
