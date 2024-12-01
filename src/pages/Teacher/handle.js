import { useDispatch, useSelector } from 'react-redux';
import {
  setConfigModalTeacher,
  setDataFilterTeacher,
  setErrorCreateOrUpdateTeacher,
  setErrorResetPasswordTeacher,
  setIdTeacher,
  setInForTeacher,
  setVisibleModalChangeStatusTeacher,
  setVisibleModalCreateOrUpdateTeacher,
  setVisibleModalDeleteTeacher,
  setVisibleModalResetPasswordTeacher,
} from '../../states/modules/teacher/index.js';
import React, { useEffect, useState } from 'react';
import { Avatar, Switch, Tag, Tooltip } from 'antd';
import { changeStatusTeacher, deleteTeacher, getListTeachers } from '../../api/teacher/index.js';
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
import { initErrInfoTeacher, initInfoTeacher } from '@/states/modules/teacher/initialState.js';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import chalkboard from '@/assets/images/icons/solid/chalkboard-user.svg';
import moment from 'moment';

export default function Handle() {
  const [isTypeModalCreate, setIsTypeModalCreate] = useState(true);
  const visibleModalCreateOrUpdate = useSelector((state) => state.teacher.visibleModalCreateOrUpdate);
  const teachers = useSelector((state) => state.teacher.teachers);
  const paginationListTeachers = useSelector((state) => state.teacher.paginationListTeachers);
  const isLoadingTableTeachers = useSelector((state) => state.teacher.isLoadingTableTeachers);
  const visibleModalDeleteTeacher = useSelector((state) => state.teacher.visibleModalDeleteTeacher);
  const isLoadingBtnDelete = useSelector((state) => state.teacher.isLoadingBtnDelete);
  const [contentModalDelete, setContentModalDelete] = useState('');
  const [detailTeacher, setDetailTeacher] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherStatus, setTeacherStatus] = useState(false);
  const [contentModalChangeStatus, setContentModalChangeStatus] = useState('');
  const dataFilter = useSelector((state) => state.teacher.dataFilter);
  console.log("🌈 ~ Handle ~ dataFilter:", dataFilter)
  const visibleModalResetPassword = useSelector((state) => state.teacher.visibleModalResetPassword);
  const visibleModalChangeStatus = useSelector((state) => state.teacher.visibleModalChangeStatus);
  const configModalTeacher = useSelector((state) => state.teacher.configModalTeacher);

  const dispatch = useDispatch();

  const windowWidth = useWindowSize().width;

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      width: 110,
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
                <Tooltip title={`Giáo viên`}>
                  <InlineSVG src={chalkboard} className={`w-4 h-4 mt-1 ml-1 text-[#f19137]`} />
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
      width: 150,
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
            hasPermission([PERMISSIONS.EDIT.EDIT_TEACHER])
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
            disabled={hasPermission([PERMISSIONS.EDIT.EDIT_TEACHER]) ? false : true}
          />
        </Tooltip>
      ),
    },
    hasPermission([
      PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_TEACHER,
      PERMISSIONS.EDIT.EDIT_TEACHER,
      PERMISSIONS.DELETE.DELETE_TEACHER,
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
                {hasPermission([PERMISSIONS.EDIT.EDIT_RESET_PASSWORD_TEACHER]) && (
                  <Tooltip placement="bottom" title={'Thay đổi mật khẩu'}>
                    <div
                      className={`btn-reset`}
                      onClick={() => openModalResetPassword(record._id)}
                    >
                      <InlineSVG src={ResetPass} width={14} />
                    </div>
                  </Tooltip>
                )}
                {hasPermission([PERMISSIONS.EDIT.EDIT_TEACHER]) && (
                  <Tooltip placement="bottom" title={'Cập nhật'}>
                    <div className={`btn-edit`} onClick={() => openModalEdit(record)}>
                      <InlineSVG src={Edit} width={14} />
                    </div>
                  </Tooltip>
                )}
                {hasPermission([PERMISSIONS.DELETE.DELETE_TEACHER]) && (
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
      setDetailTeacher({});
    }
  }, [visibleModalCreateOrUpdate]);

  const handleReloadData = () => {
    dispatch(setErrorCreateOrUpdateTeacher(initErrInfoTeacher));
    dispatch(
      setErrorResetPasswordTeacher({
        password: '',
        confirmPassword: '',
      })
    );
  };

  const handleToggleVisibleModalCreateOrUpdate = () => {
    handleReloadData();
    dispatch(setVisibleModalCreateOrUpdateTeacher(!visibleModalCreateOrUpdate));
  };

  const openModalCreate = () => {
    dispatch(handleGetRoles());

    setIsTypeModalCreate(true);
    handleToggleVisibleModalCreateOrUpdate();
    dispatch(setInForTeacher(initInfoTeacher));
    dispatch(setErrorCreateOrUpdateTeacher(initErrInfoTeacher));

    dispatch(
      setConfigModalTeacher({
        title: 'Tạo mới giáo viên',
        type: TYPE_SUBMIT.CREATE,
      })
    );
  };

  const openModalEdit = (teacher) => {
    dispatch(setInForTeacher(teacher));
    dispatch(
      setConfigModalTeacher({
        title: 'Cập nhật thông tin giáo viên',
        type: TYPE_SUBMIT.UPDATE,
      })
    );

    dispatch(handleGetRoles());

    handleToggleVisibleModalCreateOrUpdate();
    dispatch(setInForTeacher({ ...teacher, avatarUrl: teacher.avatar, role_ids: teacher?.role_ids?.map((item) => item._id) }));
  };

  const openModalDelete = (teacher) => {
    setTeacherId(teacher._id);
    setContentModalDelete(
      <span>
        Bạn có chắc chắn muốn xóa quản trị viên{' '}
        <div>
          <b>{teacher.name}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalDeleteTeacher(true));
  };

  const handleConfirmDelete = () => {
    if (teacherId) {
      dispatch(deleteTeacher(teacherId));
    }
  };

  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    newDataFilter.page = 1;
    dispatch(setDataFilterTeacher(newDataFilter));
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(getListTeachers(newDataFilter));
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
    dispatch(setDataFilterTeacher(newDataFilter));
    dispatch(getListTeachers(newDataFilter));
  };

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = value;
    dispatch(setDataFilterTeacher(newDataFilter));
    dispatch(getListTeachers(newDataFilter));
  };

  const handleToggleVisibleModalResetPassword = () => {
    handleReloadData();
    dispatch(setVisibleModalResetPasswordTeacher(!visibleModalResetPassword));
  };

  const openModalResetPassword = (id) => {
    dispatch(setIdTeacher(id));
    dispatch(setVisibleModalResetPasswordTeacher(true));
  };

  const openModalChangeStatus = (e, teacher) => {
    setTeacherId(teacher._id);
    setTeacherStatus(e);
    setContentModalChangeStatus(
      <span>
        Bạn có chắc chắn muốn {e ? 'mở khóa' : 'khóa'} giáo viên{' '}
        <div>
          <b>{teacher.name}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalChangeStatusTeacher(true));
  };

  const handleConfirmChangeStatus = () => {
    if (teacherId) {
      dispatch(changeStatusTeacher(teacherId, teacherStatus ? 1 : 0));
    }
  };

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilterTeacher(newDataFilter));
    dispatch(getListTeachers(newDataFilter));
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
    teachers,
    detailTeacher,
    columns,
    visibleModalCreateOrUpdate,
    isTypeModalCreate,
    paginationListTeachers,
    isLoadingTableTeachers,
    visibleModalDeleteTeacher,
    isLoadingBtnDelete,
    configModalTeacher,
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
