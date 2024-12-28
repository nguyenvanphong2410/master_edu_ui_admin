import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import { Input, Select } from 'antd';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import TableDefault from '../../components/Table/index.jsx';
import styles from './styles.module.scss';
import Handle from './handle.js';
import ModalDeleteDefault from '../../components/ModalDelete/index.jsx';
import { setVisibleModalChangeStatusOrder, setVisibleModalDeleteOrder } from '../../states/modules/order/index.js';
import { useDispatch } from 'react-redux';
import { PACKAGE_TYPE } from '@/utils/constants.js';
import ModalChangeStatusOrder from "@/components/ModalChangeStatusOrder/index.jsx";

export default function OrderManagement() {
  const dispatch = useDispatch();
  const {
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
    handleSelectLimitTable
  } = Handle();

  return (
    <MainLayout>
      <div className={styles.listWrap}>
        <div className={styles.filterWrap}>
          <div className={styles.search}>
            <Input
              prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
              className={`main-input`}
              placeholder={'Nhập mã giao dịch, tên hoặc SĐT học viên để tìm kiếm'}
              value={dataFilter.keySearch}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <Select
            className={`main-select w-60 pl-3`}
            placeholder="Chọn khóa học"
            optionLabelProp="label"
            value={filterSelect.courseName}
            allowClear
            onChange={(e) => handleFilterSelect(e, 'courseName')}
          >
            {listCourse.map((status, index) => {
              return (
                <Select.Option key={index} value={status} label={status}>
                  {status}
                </Select.Option>
              );
            })}
          </Select>
          <Select
            className={`main-select w-52 pl-3`}
            placeholder="Chọn trạng thái"
            optionLabelProp="label"
            value={filterSelect.status}
            allowClear
            onChange={(e) => handleFilterSelect(e, 'status')}
          >
            {orderStatus.map((status) => {
              return (
                <Select.Option key={status.key} value={status.key} label={status.label}>
                  {status.label}
                </Select.Option>
              );
            })}
          </Select>
        </div>

        <div className={'tableWrap h-[calc(100vh-267px)]'}>
          <TableDefault
            rowClassName={({ course_type }) => {
              return course_type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT;
            }}
            loading={isLoadingTableOrders}
            dataSource={orders}
            columns={columns}
            onChange={handleChangeTable}
            pagination={paginationListOrders}
            handleSelectPagination={(e) => handleSelectPagination(e)}
            isFixed
            extraClassName={'h-[calc(100vh-315px)]'}
            scroll={{ x: 1200, y: windowWidth <= 576 ? 'calc(100vh - 210px)' : windowWidth <= 1536 ? 'calc(100vh - 370px)' : 'calc(100vh - 382px)' }}
            rowKey={(record) => record._id}
            limitTable={dataFilter.perPage}
            handleSelectLimitTable={(e) => handleSelectLimitTable(e)}
          />
        </div>
      </div>

      <ModalDeleteDefault
        content={contentModal}
        contentBtn={'Xóa yêu cầu'}
        isModalOpen={visibleModalDeleteOrder}
        handleOk={() => dispatch(setVisibleModalDeleteOrder(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteOrder(false))}
        handleConfirm={() => handleConfirmDelete()}
        loading={isLoadingBtnDelete}
      />

      <ModalChangeStatusOrder
        title={contentModal}
        contentBtn={'Xác nhận'}
        isModalOpen={visibleModalChangeStatusOrder}
        handleOk={() => dispatch(setVisibleModalChangeStatusOrder(false))}
        handleCancel={() => dispatch(setVisibleModalChangeStatusOrder(false))}
        handleConfirm={() => handleConfirmChangeStatus()}
        loading={isLoadingBtnChangeStatus}
        type={statusOrderType}
        orderData={orderData}
      />
    </MainLayout>
  );
}
