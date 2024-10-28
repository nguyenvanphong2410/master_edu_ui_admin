import { requestGetListOverview, requestGetListOverviewSuccess, requestGetListOverviewsFail, requestGetListRevenue, requestGetListRevenueFail, requestGetListRevenueSuccess, requestGetListTransaction, requestGetListTransactionFail, requestGetListTransactionSuccess } from "../../states/modules/home";
import callApi from "../callApi";

export const getListOverview = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `admin/dashboard/overview`,
        actionTypes: [
            requestGetListOverview,
            requestGetListOverviewSuccess,
            requestGetListOverviewsFail,
        ],
        variables: {},
        dispatch,
        getState
    })
}

export const getListRevenue = () => async (dispatch, getState) => {
    const typeRevenue = getState().home.typeRevenue
    const revenueDateFilter = getState().home.revenueDateFilter
    let path = `admin/dashboard/revenue/${typeRevenue}`;
    if (revenueDateFilter.start_time && revenueDateFilter.end_time) {
        if (typeRevenue === 'daily') {
            path += `?start_time=${revenueDateFilter.start_time.format("DD-MM-YYYY")}&end_time=${revenueDateFilter.end_time.format("DD-MM-YYYY")}`;
        } else if (typeRevenue === 'monthly') {
            path += `?start_time=${revenueDateFilter.start_time.format("MM-YYYY")}&end_time=${revenueDateFilter.end_time.format("MM-YYYY")}`;
        } else {
            path += `?start_time=${revenueDateFilter.start_time.format("YYYY")}&end_time=${revenueDateFilter.end_time.format("YYYY")}`;
        }
    }
    
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            requestGetListRevenue,
            requestGetListRevenueSuccess,
            requestGetListRevenueFail,
        ],
        variables: {},
        dispatch,
        getState
    })
}

export const getListTransaction = () => async (dispatch, getState) => {
    const typeSearch = getState().home.typeSearch
    const searchDateFilter = getState().home.searchDateFilter
    let path = `admin/dashboard/transaction/${typeSearch}`;
    if (searchDateFilter.start_time && searchDateFilter.end_time) {
        if (typeSearch === 'daily') {
            path += `?start_time=${searchDateFilter.start_time.format("DD-MM-YYYY")}&end_time=${searchDateFilter.end_time.format("DD-MM-YYYY")}`;
        } else if (typeSearch === 'monthly') {
            path += `?start_time=${searchDateFilter.start_time.format("MM-YYYY")}&end_time=${searchDateFilter.end_time.format("MM-YYYY")}`;
        } else {
            path += `?start_time=${searchDateFilter.start_time.format("YYYY")}&end_time=${searchDateFilter.end_time.format("YYYY")}`;
        }
    }
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            requestGetListTransaction,
            requestGetListTransactionSuccess,
            requestGetListTransactionFail,
        ],
        variables: {},
        dispatch,
        getState
    })
}