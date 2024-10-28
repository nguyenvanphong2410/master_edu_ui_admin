import { createSlice } from "@reduxjs/toolkit";


const homeSlice = createSlice({
    name: 'home',
    initialState: {
        typeRevenue: 'daily',
        typeSearch: 'daily',
        overview: [],
        revenue: [],
        transaction: [],
        revenueDateFilter: {
            start_time: null,
            end_time: null,
        },
        searchDateFilter: {
            start_time: null,
            end_time: null,
        },
    },
    reducers: {
        setTypeRevenue: (state, action) => ({
            ...state,
            typeRevenue: action.payload
        }),
        setTypeSearch: (state, action) => ({
            ...state,
            typeSearch: action.payload
        }),
        setRevenueDateFilter: (state, action) => ({
            ...state,
            revenueDateFilter: action.payload
        }),
        setSearchDateFilter: (state, action) => ({
            ...state,
            searchDateFilter: action.payload
        }),
        requestGetListOverview: (state) => ({
            ...state,
        }),
        requestGetListOverviewSuccess: (state, action) => ({
            ...state,
            overview: action.payload.data,
        }),
        requestGetListOverviewsFail: (state) => ({
            ...state,
            overview: [],
        }),
        requestGetListRevenue: (state) => ({
            ...state,
        }),
        requestGetListRevenueSuccess: (state, action) => ({
            ...state,
            revenue: action.payload.data,
        }),
        requestGetListRevenueFail: (state) => ({
            ...state,
            revenue: [],
        }),
        requestGetListTransaction: (state) => ({
            ...state,
        }),
        requestGetListTransactionSuccess: (state, action) => ({
            ...state,
            transaction: action.payload.data,
        }),
        requestGetListTransactionFail: (state) => ({
            ...state,
            transaction: [],
        }),
    }
})

export const {
    setTypeRevenue, setTypeSearch, setRevenueDateFilter, setSearchDateFilter,
    requestGetListOverview, requestGetListOverviewSuccess, requestGetListOverviewsFail, 
    requestGetListRevenue, requestGetListRevenueSuccess, requestGetListRevenueFail,
    requestGetListTransaction, requestGetListTransactionSuccess, requestGetListTransactionFail,
} = homeSlice.actions

export default homeSlice.reducer;
