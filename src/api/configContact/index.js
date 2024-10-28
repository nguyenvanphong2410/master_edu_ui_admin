
import callApi from '../callApi';
import { 
    getListConfigContact, 
    getListConfigContactFailure, 
    getListConfigContactSuccess, 
    updateConfigContact, 
    updateConfigContactFailure, 
    updateConfigContactSuccess 
} from '@/states/modules/configContact';
  
  export const handleGetConfigContact = () => async (dispatch, getState) => {
    return callApi({
      method: 'get',
      apiPath: '/admin/config-contacts',
      actionTypes: [getListConfigContact, getListConfigContactSuccess, getListConfigContactFailure],
      variables: {},
      dispatch,
      getState,
    });
  };
  
  export const handleUpdateConfigContact = (data) => async (dispatch, getState) => {
    const headers =  {  "Content-Type": "multipart/form-data",}
    return callApi({
      method: 'put',
      apiPath: '/admin/config-contacts',
      actionTypes: [updateConfigContact, updateConfigContactSuccess, updateConfigContactFailure],
      variables: data,
      dispatch,
      getState,
      headers: headers,
    });
  };
  