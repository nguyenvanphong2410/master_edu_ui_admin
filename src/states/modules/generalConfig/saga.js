import {
    all, fork, put
  } from "redux-saga/effects";
  import {setBreadcrumb, setTitlePage} from "../app/index.js";

  
  function* loadRouteData () {
    yield put(setTitlePage('Cấu hình'));
    yield put(setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ'
      },
      {
        path: '/config-management',
        name: 'Cấu hình'
      },
    ]))
  }
  
  function* handleActions () {

  }
  
  export default function* loadGeneralConfigSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }