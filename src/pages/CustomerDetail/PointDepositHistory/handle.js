import { useDispatch, useSelector } from "react-redux";
import { setDataFilterPoint } from "../../../states/modules/detail";
import React, { useState } from "react";
import {Tag, Tooltip} from "antd";
import {
  changeStatusOrderInDetailCustomer,
  deleteOrderInDetailCustomer,
  requestPointDepositHistory
} from "../../../api/customer";
import useWindowSize from "../../../utils/hooks/useWindowSize";
import {formatMoney, formatPhoneNumber, handleSetTimeOut, hasPermission} from "../../../utils/helper";
import moment from "moment";
import _ from "lodash";
import {ORDER_STATUS, ORDER_STATUS_LABEL, PERMISSIONS} from "../../../utils/constants";
import InlineSVG from "react-inlinesvg";
import Check from "@/assets/images/icons/duotone/circle-check.svg";
import Xmark from "@/assets/images/icons/duotone/circle-xmark.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import {
  setStatusOrderType,
  setVisibleModalChangeStatusOrder,
  setVisibleModalDeleteOrder
} from "@/states/modules/order/index.js";

export default function Handle() {
  const windowWidth = useWindowSize().width;
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);
  const dataFilter = useSelector((state) => state.detail.dataFilterPoint);
  const loadingTable = useSelector(
    (state) => state.detail.isLoadingGetListPointDepositHistory
  );
  const dataListPointDepositHistory = useSelector(
    (state) => state.detail.dataListPointDepositHistory
  );
  const paginationListPointDepositHistory = useSelector(
    (state) => state.detail.paginationListPointDepositHistory
  );

  const orderStatus = ORDER_STATUS_LABEL

  const [orderId, setOrderId] = useState('');
  const [contentModal, setContentModal] = useState('');
  const [orderData, setOrderData] = useState('');
  const visibleModalChangeStatusOrder = useSelector((state) => state.order.visibleModalChangeStatusOrder);
  const statusOrderType = useSelector((state) => state.order.statusOrderType);
  const isLoadingBtnChangeStatus = useSelector((state) => state.order.isLoadingBtnChangeStatus);
  const isLoadingBtnDelete = useSelector((state) => state.order.isLoadingBtnDelete);
  const visibleModalDeleteOrder = useSelector((state) => state.order.visibleModalDeleteOrder);
  const user = useSelector((state) => state.detail.infoCustomer)

  const handleSearch = (e) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.q = e.target.value;
    newDataFilter.page = 1;
    dispatch(setDataFilterPoint(newDataFilter));
    let newTimeoutId = handleSetTimeOut(
      () => {
        dispatch(requestPointDepositHistory());
      },
      500,
      timeoutId
    );
    setTimeoutId(newTimeoutId);
  };

  const onChangeTable = (pagination, filters, sorter) => {
    let data = _.cloneDeep(dataFilter);
    if (sorter.order && sorter.field) {
        data.sort_order = sorter.order === "descend" ? "desc" : "asc";
        data.field = sorter.field
    } else {
        data.field = "created_at"
        data.sort_order = "desc"
    }
    dispatch(setDataFilterPoint(data));
    dispatch(requestPointDepositHistory());
}

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "code",
      key: "code",
      showSorterTooltip: false,
      render: (text) => <span className={"font-bold"}>{text} </span>,
    },
    {
      title: "Khóa học",
      dataIndex: "package_name",
      key: "package_name",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Điểm",
      dataIndex: "package_point",
      key: "package_point",
      align: "center",
      sorter: true,
      showSorterTooltip: false,
      render: (text) =>
        text ? (
          <span className={"font-semibold text-[#52c41a]"}>+{text}</span>
        ) : (
          <span className={`italic`}>Đang cập nhật</span>
        ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "package_current_price",
      key: "package_current_price",
      showSorterTooltip: false,
      sorter: true,
      align: "center",
      render: (text) => <p className="w-full text-right">{formatMoney(text)}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      align: 'center',
      render: (text) => <Tag color={handleFillStatus(text, 'color')}>{handleFillStatus(text, 'label')}</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <span>{moment(record.created_at).format("HH:mm DD/MM/YYYY")}</span>
      ),
    },
    (
      hasPermission([
        PERMISSIONS.EDIT.EDIT_CONFIRM,
        PERMISSIONS.EDIT.EDIT_CANCEL,
        PERMISSIONS.DELETE.DELETE_DELETE
      ]) ?
        {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          width: 160,
          fixed: 'right',
          align: 'center',
          render: (text, record) => (
            <div>
              {[ORDER_STATUS['PENDING']].includes(record.status) ? (
                <div className={`btn-action flex justify-evenly`}>
                  {
                    hasPermission([PERMISSIONS.EDIT.EDIT_CONFIRM]) ?
                      <Tooltip placement="bottom" title={'Xác nhận'}>
                        <div
                          className={`btn-edit cursor-pointer`}
                          onClick={() => openModalChangeStatus(record, ORDER_STATUS['COMPLETED'])}
                        >
                          <InlineSVG src={Check} width={14} />
                        </div>
                      </Tooltip> :''
                  }
                  {
                    hasPermission([PERMISSIONS.EDIT.EDIT_CANCEL]) ?
                      <Tooltip placement="bottom" title={'Hủy'}>
                        <div
                          className={`btn-edit cursor-pointer ml-1 !mr-0`}
                          onClick={() => openModalChangeStatus(record, ORDER_STATUS['CANCEL'])}
                        >
                          <InlineSVG src={Xmark} width={14} />
                        </div>
                      </Tooltip> :''
                  }
                  {
                    hasPermission([PERMISSIONS.DELETE.DELETE_DELETE]) ?
                      <Tooltip placement="bottom" title={'Xóa'}>
                        <div className={`btn-delete cursor-pointer`} onClick={() => openModalDelete(record)}>
                          <InlineSVG src={Delete} width={14} />
                        </div>
                      </Tooltip> :''
                  }
                </div>
              ) : (
                ''
              )}
            </div>
          ),
        }
        : {
          width: 1
        }
    ),
  ];

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter.page = value;
    dispatch(setDataFilterPoint(newDataFilter));
    dispatch(requestPointDepositHistory());
  };

  const handleFilterSelect = (e, type) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter[type] = e;
    dispatch(setDataFilterPoint(newDataFilter));
    dispatch(requestPointDepositHistory());
  }

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilter);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilterPoint(newDataFilter));
    dispatch(requestPointDepositHistory());
  }

  const handleFillStatus = (status, value) => {
    const result = orderStatus.find((item) => item.key === status);
    return result[value];
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
              <b>{formatPhoneNumber(user.name)}</b>
            </div>
          </span>
        );
        break;
      case ORDER_STATUS['CANCEL']:
        setContentModal(
          <span>
            Hủy yêu cầu mua của học viên{' '}
            <div>
              <b>{formatPhoneNumber(user.name)}</b>
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
    dispatch(changeStatusOrderInDetailCustomer(orderId, statusOrderType));
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
    dispatch(deleteOrderInDetailCustomer(orderId));
  };


  return {
    contentModal,
    orderData,
    dataFilter,
    loadingTable,
    dataListPointDepositHistory,
    paginationListPointDepositHistory,
    columns,
    windowWidth,
    orderStatus,
    visibleModalChangeStatusOrder,
    statusOrderType,
    isLoadingBtnChangeStatus,
    visibleModalDeleteOrder,
    isLoadingBtnDelete,
    handleFilterSelect,
    onChangeTable,
    handleSearch,
    handleSelectPagination,
    handleSelectLimitTable,
    handleConfirmChangeStatus,
    handleConfirmDelete
  };
}
