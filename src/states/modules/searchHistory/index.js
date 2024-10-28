import { createSlice } from "@reduxjs/toolkit";

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: {
    histories: [],
    isLoadingGetHistories: false, 
    dataFilter: {
      start_time: null,
      end_time: null,
      keySearch: '',
      page: 1,
      perPage: 20,
      order: null,
      column: null,
      service_name: null,
    },
    paginationListHistory: {
      currentPage: 1,
      perPage: 20,
      totalPage: 1,
      totalRecord: 0,
    },
    isLoadingGetListServiceOption: false,
    listServiceOption: [],
  },
  reducers: {
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload
    }),
    requestGetListHistory: (state) => ({
      ...state,
      isLoadingGetHistories: true
    }),
    requestGetListHistorySuccess: (state, action) => ({
      ...state,
      isLoadingGetHistories: false,
      histories: action.payload.data.transactions,
      paginationListHistory: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      }
    }),
    requestGetListHistoryFail: (state) => ({
      ...state,
      isLoadingGetHistories: false,
      histories: [],
      paginationListHistory: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
      }
    }),
    requestGetListServiceOption: (state) => ({
      ...state,
      isLoadingGetListServiceOption: true,
    }),
    requestGetListServiceOptionSuccess: (state, action) => ({
      ...state,
      isLoadingGetListServiceOption: false,
      listServiceOption: action.payload.data,
    }),
    requestGetListServiceOptionFail: (state) => ({
      ...state,
      isLoadingGetListServiceOption: false,
    }),
  }
})

export const {
  setDataFilter,
  requestGetListHistory, requestGetListHistorySuccess, requestGetListHistoryFail,
  requestGetListServiceOption, requestGetListServiceOptionSuccess, requestGetListServiceOptionFail,
} = searchHistorySlice.actions

export default searchHistorySlice.reducer