import { requestGetListHistory, requestGetListHistoryFail, requestGetListHistorySuccess, requestGetListServiceOption, requestGetListServiceOptionFail, requestGetListServiceOptionSuccess } from "../../states/modules/searchHistory";
import callApi from "../callApi";

export const getListHistory = () => async (dispatch, getState) => {
    let path = `admin/transactions`;
    const dataFilter = getState().searchHistory.dataFilter
    if (dataFilter && dataFilter.perPage && dataFilter.page) {
      path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;
  
      if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`;
      }
  
      if (dataFilter.status !== null && dataFilter.status !== undefined) {
        path += `&status=${dataFilter.status}`;
      }
  
      if (dataFilter.courseName) {
        path += `&course_name=${dataFilter.courseName}`;
      }
  
      if (dataFilter.order && dataFilter.column) {
        path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
      }
      if (dataFilter.start_time && dataFilter.end_time) {
        path += `&start_time=${dataFilter.start_time.startOf('day').unix()}&end_time=${dataFilter.end_time.endOf('day').unix()}`;
      }
      if (dataFilter.service_name !== null && dataFilter.service_name !== undefined) {
        path += `&service_name=${dataFilter.service_name}`;
      }
    }
    return callApi({
      method: 'get',
      apiPath: path,
      actionTypes: [
        requestGetListHistory,
        requestGetListHistorySuccess,
        requestGetListHistoryFail
      ],
      variables: {},
      dispatch,
      getState
    })
  }
  
export const getListServiceOption = () => (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'admin/transactions/distinct-service-name',
    actionTypes: [
      requestGetListServiceOption,
      requestGetListServiceOptionSuccess,
      requestGetListServiceOptionFail,
    ],
    dispatch,
    getState,
  })
}