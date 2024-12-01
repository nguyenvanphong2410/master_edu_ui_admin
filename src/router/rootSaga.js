import loadAuthSaga from "../states/modules/auth/saga.js";
import loadUserSaga from "../states/modules/user/saga.js";
import loadHomeSaga from "../states/modules/home/saga.js";
import loadOrderSaga from "../states/modules/order/saga.js";
import loadConfigSaga from "../states/modules/config/saga.js";
import loadCustomerSaga from "../states/modules/customer/saga.js";
import loadSearchHistorySaga from "../states/modules/searchHistory/saga.js";
import loadCourseSaga from "../states/modules/course/saga.js";
import loadDetailSaga from "../states/modules/detail/saga.js";
import permissionsSaga from "../states/modules/permissions/saga.js";
import loadGeneralConfigSaga from "@/states/modules/generalConfig/saga.js";
import loadConfigServiceSaga from "../states/modules/configService/saga.js";
import loadUserFeedbackSaga from "@/states/modules/userFeedback/saga.js";
import loadConfigContactSaga from "@/states/modules/configContact/saga.js";
import loadClassSaga from "@/states/modules/class/saga.js";
import loadTeacherSaga from "@/states/modules/teacher/saga.js";
import detailsCourseSaga from "@/states/modules/course/detailsCourse/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_USER_PAGE'] = loadUserSaga
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_ORDER_PAGE'] = loadOrderSaga
ROUTE_SAGAS['LOAD_CONFIG_PAGE'] = loadConfigSaga
ROUTE_SAGAS['LOAD_CUTOMER_PAGE'] = loadCustomerSaga
ROUTE_SAGAS['LOAD_USER_FEEDBACK_PAGE'] = loadUserFeedbackSaga
ROUTE_SAGAS['LOAD_CLASS_PAGE'] = loadClassSaga
ROUTE_SAGAS['LOAD_TEACHER_PAGE'] = loadTeacherSaga

ROUTE_SAGAS['LOAD_SEARCH_HISTORY_PAGE'] = loadSearchHistorySaga
ROUTE_SAGAS['LOAD_PACKAGE_PAGE'] = loadCourseSaga
ROUTE_SAGAS['LOAD_DETAIL_PAGE'] = loadDetailSaga
ROUTE_SAGAS['LOAD_PERMISSIONS_PAGE'] = permissionsSaga
ROUTE_SAGAS['LOAD_GENERAL_CONGFIG_PAGE'] = loadGeneralConfigSaga
ROUTE_SAGAS['LOAD_CONFIG_SERVICE_PAGE'] = loadConfigServiceSaga
ROUTE_SAGAS['LOAD_CONFIG_CONTACT_PAGE'] = loadConfigContactSaga
ROUTE_SAGAS['LOAD_DETAILS_COURSE_PAGE'] = detailsCourseSaga;
