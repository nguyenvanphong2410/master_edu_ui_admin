import useWindowSize from '../../utils/hooks/useWindowSize.js';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  setDataFilter,
  setStatusOrderType,
  setVisibleModalChangeStatusOrder,
  setVisibleModalDeleteOrder,
} from '../../states/modules/order/index.js';
import { formatMoney, handleSetTimeOut, hasPermission, formatPhoneNumber } from '../../utils/helper.js';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import Delete from '../../assets/images/icons/duotone/trash-can.svg';
import Check from '../../assets/images/icons/duotone/circle-check.svg';
import Xmark from '../../assets/images/icons/duotone/circle-xmark.svg';
import { ORDER_STATUS, ORDER_STATUS_LABEL, PACKAGE_TYPE, PERMISSIONS } from '../../utils/constants.js';
import { Tag, Tooltip } from 'antd';
import { changeStatusOrder, deleteOrder, getListOrders } from '../../api/order/index.js';
import moment from 'moment';
import hv from '@/assets/images/icons/solid/graduation.svg';

export default function Handle() {
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [contentModal, setContentModal] = useState('');
  const [orderData, setOrderData] = useState('');
  const [filterSelect, setFilterSelect] = useState({
    status: null,
    courseName: null,
  });

  const windowWidth = useWindowSize().width;
  const dataFilter = useSelector((state) => state.order.dataFilter);
  const orders = useSelector((state) => state.order.orders);
  const paginationListOrders = useSelector((state) => state.order.paginationListOrders);
  const isLoadingTableOrders = useSelector((state) => state.order.isLoadingTableOrders);
  const isLoadingBtnDelete = useSelector((state) => state.order.isLoadingBtnDelete);
  const visibleModalDeleteOrder = useSelector((state) => state.order.visibleModalDeleteOrder);
  const isLoadingBtnChangeStatus = useSelector((state) => state.order.isLoadingBtnChangeStatus);
  const visibleModalChangeStatusOrder = useSelector((state) => state.order.visibleModalChangeStatusOrder);
  const listCourse = useSelector((state) => state.order.listCourse);
  const statusOrderType = useSelector((state) => state.order.statusOrderType);
  const orderStatus = ORDER_STATUS_LABEL;

  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      width: 200,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => (
        <span className={`font-bold ${record.course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'text-[#999999]' : ''}`}>
          {text}{' '}
        </span>
      ),
    },
    {
      title: 'Học viên',
      dataIndex: 'user',
      key: 'user',
      width: 230,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => (
        <span>
          {record.user?.name ? (
            <span className={'font-semibold flex'}>
              {record.user.name}
              <Tooltip title={`Học viên`}>
                <InlineSVG src={hv} className={`w-4 h-4 mt-1 ml-1 text-[#a321fa]`} />
              </Tooltip>
            </span>
          ) : (
            ''
          )}
          <a
            href={'tel:' + record.user.phone}
            className={`${record.course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'text-[#999999]' : ''}`}
          >
            {formatPhoneNumber(record.user.phone)}
          </a>{' '}
          <br />
        </span>
      ),
    },
    {
      title: 'Khóa học',
      dataIndex: 'course_name',
      key: 'course_name',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      width: 160,
      render: (text, record) => (
        <span className={`${record.course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'text-[#999999]' : ''}`}>
          {text}
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'course_current_price',
      key: 'course_current_price',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      align: 'center',
      width: 150,
      render: (text, record) => (
        <p
          className={`w-full text-right ${
            record.course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'text-[#999999]' : ''
          }`}
        >
          {formatMoney(text)}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      align: 'center',
      width: 130,
      render: (text) => <Tag color={handleFillStatus(text, 'color')}>{handleFillStatus(text, 'label')}</Tag>,
    },
    {
      title: 'Người xác nhận',
      dataIndex: 'censor',
      key: 'censor',
      width: 150,
      showSorterTooltip: false,
      render: (text) => (text ? <span>{text.name}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => (
        <span className={`${record.course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'text-[#999999]' : ''}`}>
          {moment(record.created_at).format('HH:mm DD/MM/YYYY')}
        </span>
      ),
    },
    hasPermission([PERMISSIONS.EDIT.EDIT_CONFIRM, PERMISSIONS.EDIT.EDIT_CANCEL, PERMISSIONS.DELETE.DELETE_DELETE])
      ? {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          width: 120,
          fixed: 'right',
          align: 'center',
          render: (text, record) => (
            <div>
              {[ORDER_STATUS['PENDING']].includes(record.status) ? (
                <div className={`btn-action flex justify-evenly`}>
                  {hasPermission([PERMISSIONS.EDIT.EDIT_CONFIRM]) ? (
                    <Tooltip placement="bottom" title={'Xác nhận'}>
                      <div
                        className={`btn-edit cursor-pointer`}
                        onClick={() => openModalChangeStatus(record, ORDER_STATUS['COMPLETED'])}
                      >
                        <InlineSVG src={Check} width={14} />
                      </div>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {hasPermission([PERMISSIONS.EDIT.EDIT_CANCEL]) ? (
                    <Tooltip placement="bottom" title={'Hủy'}>
                      <div
                        className={`btn-edit cursor-pointer ml-1 !mr-0`}
                        onClick={() => openModalChangeStatus(record, ORDER_STATUS['CANCEL'])}
                      >
                        <InlineSVG src={Xmark} width={14} />
                      </div>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {hasPermission([PERMISSIONS.DELETE.DELETE_ORDER]) ? (
                    <Tooltip placement="bottom" title={'Xóa'}>
                      <div className={`btn-delete cursor-pointer`} onClick={() => openModalDelete(record)}>
                        <InlineSVG src={Delete} width={14} />
                      </div>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          ),
        }
      : {
          width: 1,
        },
  ];

  const handleFillStatus = (status, value) => {
    const result = orderStatus.find((item) => item.key === status);
    return result[value];
  };

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListOrders(newDataFilter));
  };

  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.keySearch = e.target.value;
    newDataFilter.page = 1;
    dispatch(setDataFilter(newDataFilter));
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(getListOrders(newDataFilter));
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
    dispatch(getListOrders(newDataFilter));
  };

  const handleFilterSelect = (e, type) => {
    setFilterSelect({
      ...filterSelect,
      [type]: e,
    });
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter[type] = e;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListOrders(newDataFilter));
  };

  const openModalDelete = (order) => {
    setOrderId(order._id);
    setContentModal(
      <span>
        Bạn có chắc chắn muốn xóa yêu cầu mua khóa học{' '}
        <div>
          <b>{order.code}</b>?
        </div>
      </span>
    );
    dispatch(setVisibleModalDeleteOrder(true));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteOrder(orderId));
  };

  const openModalChangeStatus = (order, type) => {
    setOrderId(order._id);
    setOrderData(order);
    dispatch(setStatusOrderType(type));
    switch (type) {
      case ORDER_STATUS['COMPLETED']:
        setContentModal(
          <span>
            Xác nhận yêu cầu mua của học viên{' '}
            <div>
              <b>{formatPhoneNumber(order.user.phone)}</b>
            </div>
          </span>
        );
        break;
      case ORDER_STATUS['CANCEL']:
        setContentModal(
          <span>
            Hủy yêu cầu mua khóa học của học viên{' '}
            <div>
              <b>{formatPhoneNumber(order.user.phone)}</b>
            </div>
          </span>
        );
        break;
      default:
        break;
    }
    dispatch(setVisibleModalChangeStatusOrder(true));
  };

  const handleConfirmChangeStatus = () => {
    dispatch(changeStatusOrder(orderId, statusOrderType));
  };

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilter(newDataFilter));
    dispatch(getListOrders(newDataFilter));
  };

  return {
    windowWidth,
    columns,
    orders,
    dataFilter,
    paginationListOrders,
    isLoadingTableOrders,
    isLoadingBtnDelete,
    contentModal,
    orderData,
    visibleModalDeleteOrder,
    orderStatus,
    filterSelect,
    listCourse,
    statusOrderType,
    isLoadingBtnChangeStatus,
    visibleModalChangeStatusOrder,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
    handleConfirmDelete,
    handleFilterSelect,
    handleConfirmChangeStatus,
    handleSelectLimitTable,
  };
}
