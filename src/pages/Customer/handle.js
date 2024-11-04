import { useDispatch, useSelector } from 'react-redux';
import {
  setConfigModal,
  setCustomerType,
  setDataFilter,
  setErrorCreateOrUpdate,
  setErrorResetPassword,
  setInForCustomer,
  setVisibleModalChangeStatus,
  setVisibleModalConfirmCustomer,
  setVisibleModalCreateOrUpdate,
  setVisibleModalDeleteCustomer,
  setVisibleModalResetPassword,
} from '@/states/modules/customer/index.js';
import React, { useEffect, useState } from 'react';
import { Avatar, Switch, Tooltip } from 'antd';
import { changeStatusCustomer, confirmCustomer, deleteCustomer, getListCustomers } from '@/api/customer/index.js';
import { formatPhoneNumber, formatPoint, handleSetTimeOut, hasPermission } from '@/utils/helper.js';
import _ from 'lodash';
import InlineSVG from 'react-inlinesvg';
import Edit from '../../assets/images/icons/duotone/pencil.svg';
import Delete from '../../assets/images/icons/duotone/trash-can.svg';
import ResetPass from '../../assets/images/icons/duotone/lock-keyhole.svg';
import useWindowSize from '../../utils/hooks/useWindowSize.js';
import './styles.scss';
import { CUSTOMER_TYPE, GENDER_USER, PERMISSIONS, STATUS_CUSTOMER, TYPE_SUBMIT } from '@/utils/constants.js';
import Check from '../../assets/images/icons/duotone/circle-check.svg';
import moment from 'moment';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import { initErrInfoCustomer, initInfoCustomer } from '@/states/modules/customer/initialState';
import graduation from '@/assets/images/icons/solid/graduation.svg';

export default function Handle() {
  const [isTypeModalCreate, setIsTypeModalCreate] = useState(true);
  const visibleModalCreateOrUpdate = useSelector((state) => state.customer.visibleModalCreateOrUpdate);
  const customers = useSelector((state) => state.customer.customers);
  const paginationListCustomers = useSelector((state) => state.customer.paginationListCustomers);
  const isLoadingTableCustomers = useSelector((state) => state.customer.isLoadingTableCustomers);
  const visibleModalDeleteCustomer = useSelector((state) => state.customer.visibleModalDeleteCustomer);
  const isLoadingBtnDelete = useSelector((state) => state.customer.isLoadingBtnDelete);
  const [contentModalDelete, setContentModalDelete] = useState('');
  const [detailCustomer, setDetailCustomer] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customerStatus, setCustomerStatus] = useState(false);
  const [contentModalChangeStatus, setContentModalChangeStatus] = useState('');
  const dataFilter = useSelector((state) => state.customer.dataFilter);
  const visibleModalResetPassword = useSelector((state) => state.customer.visibleModalResetPassword);
  const visibleModalChangeStatus = useSelector((state) => state.customer.visibleModalChangeStatus);
  const visibleModalConfirmCustomer = useSelector((state) => state.customer.visibleModalConfirmCustomer);
  const customer_type = useSelector((state) => state.customer.customer_type);
  const [contentModalConfirm, setContentModalConfirm] = useState('');
  const dispatch = useDispatch();

  const configModal = useSelector((state) => state.customer.configModal);

  const windowWidth = useWindowSize().width;

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span className="font-semibold text-[#4d7ca8]">{text}</span>,
    },
    {
      title: <span className="title-table">Họ và tên</span>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 300,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={`flex`}>
            <Avatar
              className={`avatar-user shadow`}
              crossOrigin="anonymous"
              src={record.avatar ? record.avatar : avatarDefault}
            />
            <div className={`ml-[10px] font-medium`}>
              <div className={`name-user cursor-pointer flex`}>
                {text}
                <Tooltip title={`Học viên`}>
                  <InlineSVG src={graduation} className={`w-4 h-4 mt-1 ml-1 text-[#c012f5]`} />
                </Tooltip>
              </div>
              <span className={`email-user`}></span>
              <a className="email" href={`mailto:${record.email}`}>
                {record.email}
              </a>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) =>
        text ? <span>{handleDisplayGender(text)}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>,
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text ? <span>{text}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text ? <span>{text}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    // {
    //   title: 'Điểm CC',
    //   dataIndex: 'attendance_score',
    //   key: 'attendance_score',
    //   align: 'center',
    //   width: 130,
    //   showSorterTooltip: false,
    //   render: (text) => <p>{formatPoint(text)}</p>,
    // },
    // {
    //   title: 'Điểm cộng',
    //   dataIndex: 'plus_score',
    //   key: 'plus_score',
    //   align: 'center',
    //   width: 130,
    //   showSorterTooltip: false,
    //   render: (text) => <p>{formatPoint(text)}</p>,
    // },
    // {
    //   title: 'Điểm GK',
    //   dataIndex: 'midterm_score',
    //   key: 'midterm_score',
    //   align: 'center',
    //   width: 130,
    //   showSorterTooltip: false,
    //   render: (text) => <p>{formatPoint(text)}</p>,
    // },
    // {
    //   title: 'Điểm CK',
    //   dataIndex: 'final_score',
    //   key: 'final_score',
    //   align: 'center',
    //   width: 130,
    //   showSorterTooltip: false,
    //   render: (text) => <p>{formatPoint(text)}</p>,
    // },
    // {
    //   title: 'Điểm tổng',
    //   dataIndex: '',
    //   key: '',
    //   align: 'center',
    //   width: 130,
    //   showSorterTooltip: false,
    //   render: (text, record) => (
    //     <p className="font-semibold text-blue-25">
    //       {displayScoreTotal(
    //         record.attendance_score * 0.1 + record.plus_score + record.midterm_score * 0.3 + record.final_score * 0.6
    //       )}
    //     </p>
    //   ),
    // },

    {
      title: 'Ngày đăng ký',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      align: 'center',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => <p className={`text-center`}>{moment(text).format('HH:MM DD/MM/YYYY')}</p>,
    },
    customer_type === CUSTOMER_TYPE.CONFIRMED
      ? ({
          title: 'Điểm hiện tại',
          dataIndex: 'point',
          key: 'point',
          align: 'center',
          showSorterTooltip: false,
          sorter: (a, b) => a.age - b.age,
          render: (text) => <p className={`text-right`}>{formatPoint(text)}</p>,
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          width: 130,
          showSorterTooltip: false,
          sorter: (a, b) => a.age - b.age,
          render: (text, record) => (
            <Tooltip
              title={
                hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT])
                  ? text === STATUS_CUSTOMER['DE_ACTIVE']
                    ? 'Kích hoạt'
                    : 'Khóa'
                  : ''
              }
            >
              <Switch
                checked={text}
                className={`main-switch`}
                onChange={(e) => openModalChangeStatus(e, record)}
                disabled={!hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT])}
              />
            </Tooltip>
          ),
        })
      : {
          width: 1,
        },
    hasPermission([
      PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_STUDENT,
      PERMISSIONS.EDIT.EDIT_STUDENT,
      PERMISSIONS.DELETE.DELETE_STUDENT,
    ])
      ? {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          width: 160,
          fixed: 'right',
          align: 'center',
          render: (text, record) => (
            <div>
              {customer_type === CUSTOMER_TYPE.CONFIRMED ? (
                <div className={`btn-action flex justify-evenly`}>
                  {hasPermission([PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_STUDENT]) && (
                    <Tooltip placement="bottom" title={'Thay đổi mật khẩu'}>
                      <div
                        className={`btn-main btn-reset w-[24px] cursor-pointer`}
                        onClick={() => openModalResetPassword(record._id)}
                      >
                        <InlineSVG src={ResetPass} width={14} />
                      </div>
                    </Tooltip>
                  )}
                  {hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT]) && (
                    <Tooltip placement="bottom" title={'Cập nhật'}>
                      <div className={`btn-main btn-edit cursor-pointer`} onClick={() => openModalEdit(record)}>
                        <InlineSVG src={Edit} width={14} />
                      </div>
                    </Tooltip>
                  )}
                  {hasPermission([PERMISSIONS.DELETE.DELETE_STUDENT]) && (
                    <Tooltip placement="bottom" title={'Xóa'}>
                      <div className={`btn-main btn-delete cursor-pointer`} onClick={() => openModalDelete(record)}>
                        <InlineSVG src={Delete} width={14} />
                      </div>
                    </Tooltip>
                  )}
                </div>
              ) : (
                <div className={`btn-action flex justify-evenly`}>
                  {hasPermission([PERMISSIONS.EDIT.EDIT_STUDENT]) && (
                    <Tooltip placement="bottom" title={'Xác thực'}>
                      <div className={`btn-main btn-edit cursor-pointer`} onClick={() => openModalConfirm(record)}>
                        <InlineSVG src={Check} width={14} />
                      </div>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          ),
        }
      : {
          width: 1,
        },
  ];

  useEffect(() => {
    if (!visibleModalCreateOrUpdate) {
      setDetailCustomer({});
    }
  }, [visibleModalCreateOrUpdate]);

  // const displayScoreTotal = (num) => {
  //   let result = null;
  //   result = parseFloat(num.toFixed(2));
  //   return result;
  // };

  const handleReloadData = () => {
    dispatch(setErrorCreateOrUpdate(initErrInfoCustomer));
    dispatch(
      setErrorResetPassword({
        password: '',
        confirmPassword: '',
      })
    );
  };

  const handleToggleVisibleModalCreateOrUpdate = () => {
    handleReloadData();
    dispatch(setVisibleModalCreateOrUpdate(!visibleModalCreateOrUpdate));
  };

  const openModalCreate = () => {
    dispatch(setInForCustomer(initInfoCustomer));
    dispatch(
      setConfigModal({
        title: 'Tạo mới học viên',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    handleToggleVisibleModalCreateOrUpdate();
  };

  const openModalEdit = (customer) => {
    dispatch(setErrorCreateOrUpdate(initErrInfoCustomer));
    dispatch(
      setConfigModal({
        title: 'Cập nhật thông tin học viên',
        type: TYPE_SUBMIT.UPDATE,
      })
    );
    dispatch(setInForCustomer({ ...customer, avatarUrl: customer.avatar }));
    handleToggleVisibleModalCreateOrUpdate();
  };

  const openModalDelete = (customer) => {
    setCustomerId(customer._id);
    setContentModalDelete(
      <span>
        Bạn có chắc chắn muốn xóa học viên
        <div>
          <b>{formatPhoneNumber(customer.phone)}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalDeleteCustomer(true));
  };

  const openModalConfirm = (customer) => {
    setCustomerId(customer._id);
    setContentModalConfirm(
      <span>
        Bạn có chắc chắn muốn xác thực học viên
        <div>
          <b>{formatPhoneNumber(customer.phone)}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalConfirmCustomer(true));
  };

  const handleConfirmDelete = () => {
    if (customerId) {
      dispatch(deleteCustomer(customerId));
    }
  };

  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.q = e.target.value;
    newDataFilter.page = 1;
    dispatch(setDataFilter(newDataFilter));
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(getListCustomers(newDataFilter));
      },
      500,
      timeoutId
    );
    setTimeoutId(newTimeoutId);
  };

  const handleChangeTable = (pagination, filters, sorter) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.order = null;
    newDataFilter.column = null;
    if (sorter.order && sorter.field) {
      newDataFilter.order = sorter.order === 'descend' ? 'desc' : 'asc';
      newDataFilter.column = sorter.field;
    }
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListCustomers(newDataFilter));
  };

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListCustomers(newDataFilter));
  };

  const handleToggleVisibleModalResetPassword = () => {
    handleReloadData();
    dispatch(setVisibleModalResetPassword(!visibleModalResetPassword));
  };

  const openModalResetPassword = (id) => {
    setCustomerId(id);
    dispatch(setVisibleModalResetPassword(true));
  };

  const openModalChangeStatus = (e, customer) => {
    setCustomerId(customer._id);
    setCustomerStatus(e);
    setContentModalChangeStatus(
      <span>
        Bạn có chắc chắn muốn {e ? 'mở khóa' : 'khóa'} học viên
        <div>
          <b>{formatPhoneNumber(customer.name)}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalChangeStatus(true));
  };

  const handleConfirmChangeStatus = () => {
    if (customerId) {
      dispatch(changeStatusCustomer(customerId, customerStatus ? 1 : 0));
    }
  };

  const handleConfirmCustomer = () => {
    if (customerId) {
      dispatch(confirmCustomer(customerId));
    }
  };

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListCustomers(newDataFilter));
  };

  const handelChangeTab = (value) => {
    dispatch(setCustomerType(value));
    dispatch(getListCustomers(dataFilter));
  };

  const handleDisplayGender = (gender) => {
    let genderDisplay = '';
    switch (gender) {
      case GENDER_USER.MALE:
        return (genderDisplay = 'Nam');
      case GENDER_USER.FEMALE:
        return (genderDisplay = 'Nữ');
      case GENDER_USER.OTHER:
        return (genderDisplay = 'Khác');
      default:
        break;
    }
    return genderDisplay;
  };

  return {
    windowWidth,
    customers,
    customerId,
    detailCustomer,
    columns,
    visibleModalCreateOrUpdate,
    configModal,
    paginationListCustomers,
    isLoadingTableCustomers,
    visibleModalDeleteCustomer,
    isLoadingBtnDelete,
    contentModalDelete,
    dataFilter,
    visibleModalResetPassword,
    visibleModalChangeStatus,
    visibleModalConfirmCustomer,
    contentModalConfirm,
    contentModalChangeStatus,
    customer_type,
    dispatch,
    handleConfirmChangeStatus,
    handleToggleVisibleModalResetPassword,
    handleToggleVisibleModalCreateOrUpdate,
    openModalCreate,
    handleConfirmDelete,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
    handleSelectLimitTable,
    handelChangeTab,
    handleConfirmCustomer,
  };
}
