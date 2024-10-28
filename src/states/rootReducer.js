import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import profileReducer from './modules/profile/index.js';
import userReducer from './modules/user/index.js';
import homeSlice from './modules/home/index.js';
import orderSlice from './modules/order/index.js';
import configSlice from './modules/config/index.js';
import detailSlice from './modules/detail/index.js';
import searchHistorySlice from './modules/searchHistory/index.js';
import packageSlice from './modules/package/index.js';
import customerSlice from './modules/customer/index.js';
import permissionsSlice from './modules/permissions/index.js';
import configServiceSlice from './modules/configService/index.js';
import userFeedbackSlice from './modules/userFeedback/index.js';
import classReducer from './modules/class/index.js';
import teacherReducer from './modules/teacher/index.js';
import configContactSlice from './modules/configContact/index.js';
import detailsCourseSlice from './modules/package/detailsCourse/index.js';
import commentSlice from './modules/comment/index.js';
const rootReducer = {
  app: appReducer,
  home: homeSlice,
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
  order: orderSlice,
  config: configSlice,
  detail: detailSlice,
  searchHistory: searchHistorySlice,
  package: packageSlice,
  customer: customerSlice,
  permission: permissionsSlice,
  configService: configServiceSlice,
  userFeedback: userFeedbackSlice,
  configContact: configContactSlice,
  class: classReducer,
  teacher: teacherReducer,
  detailsCourse: detailsCourseSlice,
  comment: commentSlice,
}

export default rootReducer
