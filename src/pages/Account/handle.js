import { useDispatch, useSelector } from 'react-redux';
import {
  setConfigModalAdmin,
  setDataFilter,
  setErrorCreateOrUpdate,
  setErrorResetPassword,
  setIdUser,
  setInForAdmin,
  setVisibleModalChangeStatus,
  setVisibleModalCreateOrUpdate,
  setVisibleModalDeleteUser,
  setVisibleModalResetPassword,
} from '../../states/modules/user/index.js';
import React, { useEffect, useState } from 'react';
import { Avatar, Switch, Tag, Tooltip } from 'antd';
import { changeStatusUser, deleteUser, getListUsers } from '../../api/user/index.js';
import { handleSetTimeOut, hasPermission } from '../../utils/helper.js';
import _ from 'lodash';
import InlineSVG from 'react-inlinesvg';
import Edit from '../../assets/images/icons/duotone/pencil.svg';
import Delete from '../../assets/images/icons/duotone/trash-can.svg';
import ResetPass from '../../assets/images/icons/duotone/lock-keyhole.svg';
import useWindowSize from '../../utils/hooks/useWindowSize.js';
import './styles.module.scss';
import './styles.scss';
import { handleGetRoles } from '@/api/permission/index.js';
import { GENDER_USER, PERMISSIONS, STATUS_USER, TYPE_SUBMIT } from '@/utils/constants.js';
import { initErrInfoAdmin, initInfoAdmin } from '@/states/modules/user/initialState.js';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import shield from '@/assets/images/icons/solid/shield.svg';
import moment from 'moment';

export default function Handle() {
  const [isTypeModalCreate, setIsTypeModalCreate] = useState(true);
  const visibleModalCreateOrUpdate = useSelector((state) => state.user.visibleModalCreateOrUpdate);
  const users = useSelector((state) => state.user.users);
  const paginationListUsers = useSelector((state) => state.user.paginationListUsers);
  const isLoadingTableUsers = useSelector((state) => state.user.isLoadingTableUsers);
  const visibleModalDeleteUser = useSelector((state) => state.user.visibleModalDeleteUser);
  const isLoadingBtnDelete = useSelector((state) => state.user.isLoadingBtnDelete);
  const [contentModalDelete, setContentModalDelete] = useState('');
  const [detailUser, setDetailUser] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [contentModalChangeStatus, setContentModalChangeStatus] = useState('');
  const dataFilter = useSelector((state) => state.user.dataFilter);
  const visibleModalResetPassword = useSelector((state) => state.user.visibleModalResetPassword);
  const visibleModalChangeStatus = useSelector((state) => state.user.visibleModalChangeStatus);
  const configModalAdmin = useSelector((state) => state.user.configModalAdmin);

  const dispatch = useDispatch();

  const windowWidth = useWindowSize().width;

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span className='font-semibold text-[#4d7ca8]'>{text}</span>
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
                <Tooltip title={`Quản trị viên`}>
                  <InlineSVG src={shield} className={`w-4 h-4 mt-1 ml-1 text-[#2178fa]`} />
                </Tooltip>
              </div>
              <a className="email-user" href={`mailto:${record.email}`}>
                {record.email}
              </a>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Vai trò',
      dataIndex: 'role_ids',
      key: 'role_ids',
      align: 'center',
      width: 250,
      showSorterTooltip: false,
      render: (text, record) => (
        <span>
          {record?.role_ids?.length > 0 ? (
            record?.role_ids?.map((item, index) => (
              <Tag color="default" key={index} className="mt-1">
                {item.name}
              </Tag>
            ))
          ) : (
            <span className={`text-[#909399] italic `}>Đang cập nhật</span>
          )}
        </span>
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 120,
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
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      align: 'center',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => <p className={`text-center`}>{moment(text).format('HH:MM DD/MM/YYYY')}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => (
        <Tooltip
          title={
            hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE])
              ? text === STATUS_USER['DE_ACTIVE']
                ? 'Kích hoạt'
                : 'Khóa'
              : ''
          }
        >
          <Switch
            checked={text}
            className={`main-switch`}
            onChange={(e) => openModalChangeStatus(e, record)}
            disabled={hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE]) ? false : true}
          />
        </Tooltip>
      ),
    },
    hasPermission([
      PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_EMPLOYEE,
      PERMISSIONS.EDIT.EDIT_EMPLOYEE,
      PERMISSIONS.DELETE.DELETE_EMPLOYEE,
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
              <div className={`btn-table-action`}>
                {hasPermission([PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_EMPLOYEE]) && (
                  <Tooltip placement="bottom" title={'Thay đổi mật khẩu'}>
                    <div
                      className={`btn-reset`}
                      onClick={() => openModalResetPassword(record._id)}
                    >
                      <InlineSVG src={ResetPass} width={14} />
                    </div>
                  </Tooltip>
                )}
                {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE]) && (
                  <Tooltip placement="bottom" title={'Cập nhật'}>
                    <div className={`btn-edit`} onClick={() => openModalEdit(record)}>
                      <InlineSVG src={Edit} width={14} />
                    </div>
                  </Tooltip>
                )}
                {hasPermission([PERMISSIONS.DELETE.DELETE_EMPLOYEE]) && (
                  <Tooltip placement="bottom" title={'Xóa'}>
                    <div className={`btn-delete`} onClick={() => openModalDelete(record)}>
                      <InlineSVG src={Delete} width={14} />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          ),
        }
      : {
          width: 1,
        },
  ];

  useEffect(() => {
    if (!visibleModalCreateOrUpdate) {
      setDetailUser({});
    }
  }, [visibleModalCreateOrUpdate]);

  const handleReloadData = () => {
    dispatch(setErrorCreateOrUpdate(initErrInfoAdmin));
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
    dispatch(handleGetRoles());

    setIsTypeModalCreate(true);
    handleToggleVisibleModalCreateOrUpdate();
    dispatch(setInForAdmin(initInfoAdmin));
    dispatch(setErrorCreateOrUpdate(initErrInfoAdmin));

    dispatch(
      setConfigModalAdmin({
        title: 'Tạo mới quản trị viên',
        type: TYPE_SUBMIT.CREATE,
      })
    );
  };

  const openModalEdit = (user) => {
    dispatch(setInForAdmin(user));
    dispatch(
      setConfigModalAdmin({
        title: 'Cập nhật thông tin quản trị viên',
        type: TYPE_SUBMIT.UPDATE,
      })
    );
    console.log('🌈 ~ openModalEdit ~ user:', user);

    dispatch(handleGetRoles());

    handleToggleVisibleModalCreateOrUpdate();
    dispatch(setInForAdmin({ ...user, avatarUrl: user.avatar, role_ids: user?.role_ids?.map((item) => item._id) }));
  };

  const openModalDelete = (user) => {
    setUserId(user._id);
    setContentModalDelete(
      <span>
        Bạn có chắc chắn muốn xóa quản trị viên{' '}
        <div>
          <b>{user.name}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalDeleteUser(true));
  };

  const handleConfirmDelete = () => {
    if (userId) {
      dispatch(deleteUser(userId));
    }
  };

  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    newDataFilter.page = 1;
    dispatch(setDataFilter(newDataFilter));
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(getListUsers(newDataFilter));
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
    dispatch(getListUsers(newDataFilter));
  };

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListUsers(newDataFilter));
  };

  const handleToggleVisibleModalResetPassword = () => {
    handleReloadData();
    dispatch(setVisibleModalResetPassword(!visibleModalResetPassword));
  };

  const openModalResetPassword = (id) => {
    dispatch(setIdUser(id));
    dispatch(setVisibleModalResetPassword(true));
  };

  const openModalChangeStatus = (e, user) => {
    setUserId(user._id);
    setUserStatus(e);
    setContentModalChangeStatus(
      <span>
        Bạn có chắc chắn muốn {e ? 'mở khóa' : 'khóa'} quản trị viên{' '}
        <div>
          <b>{user.name}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalChangeStatus(true));
  };

  const handleConfirmChangeStatus = () => {
    if (userId) {
      dispatch(changeStatusUser(userId, userStatus ? 1 : 0));
    }
  };

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListUsers(newDataFilter));
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
    users,
    detailUser,
    columns,
    visibleModalCreateOrUpdate,
    isTypeModalCreate,
    paginationListUsers,
    isLoadingTableUsers,
    visibleModalDeleteUser,
    isLoadingBtnDelete,
    configModalAdmin,
    dispatch,
    contentModalDelete,
    dataFilter,
    visibleModalResetPassword,
    visibleModalChangeStatus,
    contentModalChangeStatus,
    handleConfirmChangeStatus,
    handleToggleVisibleModalCreateOrUpdate,
    openModalCreate,
    handleConfirmDelete,
    handleToggleVisibleModalResetPassword,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
    handleSelectLimitTable,
    windowWidth,
  };
}
