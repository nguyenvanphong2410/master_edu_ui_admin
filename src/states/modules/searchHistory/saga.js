import {
    all, fork, put
  } from "redux-saga/effects";
  import {setBreadcrumb, setTitlePage} from "../app/index.js";
import { getListHistory, getListServiceOption } from "../../../api/searchHistory/index.js";
import { setDataFilter } from "./index.js";
  
  function* loadRouteData () {
    yield put(setTitlePage('Lịch sử tra cứu'));
    yield put(setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ'
      },
      {
        path: '/search-history',
        name: 'Danh sách lịch sử tra cứu của học viên'
      },
    ]));
    yield put(setDataFilter({
      start_time: null,
      end_time: null,
      keySearch: '',
      page: 1,
      perPage: 20,
      order: null,
      column: null,
      service_name: null,
    }))
    yield put(getListHistory());
    yield put(getListServiceOption());

  }
 
  function* handleActions () {
    
  }
  
  export default function* loadSearchHistorySaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }