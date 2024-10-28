import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { rootLoader } from './rootLoader.js';
import Login from '../pages/Auth/Login';
import ResetPassword from '../pages/Auth/ResetPassword';
import Account from '../pages/Account/index.jsx';
import Order from '../pages/Order/index.jsx';
import Config from '../pages/Config/index.jsx';
import CustomerDetail from '../pages/CustomerDetail/index.jsx';
import Course from '../pages/Course/index.jsx';
import Customer from '@/pages/Customer';
import General from '@/pages/General';
import ConfigService from '@/pages/ConfigService';
import Permisssions from '@/pages/Permission';
import { PAGE_ERROR, PERMISSIONS } from '@/utils/constants';
import PageError from '@/components/Error';
import UserFeedback from '@/pages/UserFeedback';
import ConfigContact from '@/pages/ConfigContact';
import ClassCpn from '@/pages/Class';
import Teacher from '@/pages/Teacher';
import DetailsCourse from '@/pages/DetailsCourse';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    loader: ({ request, params }) => rootLoader({ request, params }, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    loader: ({ request, params }) => rootLoader({ request, params }, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '',
    element: <Home />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_HOME_PAGE'),
  },
  {
    path: 'course',
    element: <Course />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_PACKAGE_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_COURSE,
      ]),
  },
  {
    path: 'class',
    element: <ClassCpn />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_CLASS_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_CLASS,
      ]),
  },
  {
    path: '/order',
    element: <Order />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_ORDER_PAGE', [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.LIST.LIST_ORDER]),
  },
  {
    path: '/customer',
    element: <Customer />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_CUTOMER_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_STUDENT,
      ]),
  },
  {
    path: '/teacher',
    element: <Teacher />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_TEACHER_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_TEACHER,
      ]),
  },
  {
    path: '/account',
    element: <Account />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_USER_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_EMPLOYEE,
      ]),
  },
  {
    path: '/config/link',
    element: <Config />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_CONFIG_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_CONFIG,
      ]),
  },
  {
    path: '/customer-detail/:id',
    element: <CustomerDetail />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_DETAIL_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.DETAIL.DETAIL_STUDENT,
      ]),
  },
  {
    path: '/details-course/:id',
    element: <DetailsCourse />,
    loader: ({request, params}) =>
      rootLoader({request, params}, true, 'LOAD_DETAILS_COURSE_PAGE', [PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.DETAIL.DETAIL_COURSE]),
  },
  
  
  {
    path: '/permissions',
    element: <Permisssions />,
    loader: ({ request, params }) =>
      rootLoader({ request, params }, true, 'LOAD_PERMISSIONS_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_ROLE,
      ]),
  },
  {
    path: '/403',
    element: <PageError type={PAGE_ERROR.FORBIDDEN} title={'Bạn không có quyền truy cập!'} />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
  },
  {
    path: '*',
    element: <PageError type={PAGE_ERROR.NOT_FOUND} title={'Trang bạn truy cập không tồn tại!'} />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
  },
  {
    path: '/config',
    element: <General />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_GENERAL_CONGFIG_PAGE', [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.LIST.LIST_CONFIG,
    ]),
  },
  {
    path: '/config/service',
    element: <ConfigService />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_CONFIG_SERVICE_PAGE'),
  },
  {
    path: '/config/user-feedback',
    element: <UserFeedback />,
    loader: ({ request, params }) => rootLoader(
      { request, params }, true, 'LOAD_USER_FEEDBACK_PAGE', [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.LIST.LIST_CONFIG_FEEDBACK,
      ]
    )
  },
  {
    path: '/config/contact',
    element: <ConfigContact />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_CONFIG_CONTACT_PAGE', [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.LIST.LIST_CONFIG_CONTACT,
    ]),
  },
]);

export default router;
