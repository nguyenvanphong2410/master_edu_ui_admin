import { Input, Select } from "antd";
import styles from "../styles.module.scss";
import IconSearch from "../../../assets/images/icons/duotone/magnifying-glass.svg";
import React from "react";
import TableDefault from "../../../components/Table";
import Handle from "./handle";
import {setVisibleModalChangeStatusOrder, setVisibleModalDeleteOrder} from "@/states/modules/order/index.js";
import ModalChangeStatusOrder from "@/components/ModalChangeStatusOrder/index.jsx";
import {useDispatch} from "react-redux";
import ModalDeleteDefault from "@/components/ModalDelete/index.jsx";

export default function PointDepositHistory() {
  const dispatch = useDispatch();
  const {
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
  } = Handle();
  return (
    <div>
      <div className={styles.listWrap}>
        <div className={styles.filterWrap}>
          <div className={styles.search}>
            <Input
              prefix={
                <img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />
              }
              value={dataFilter.q}
              onChange={(e) => handleSearch(e)}
              className={`main-input`}
              placeholder={"Nhập mã giao dịch"}
            />
          </div>
            <Select
              className={`main-select w-52 pl-3`}
              placeholder="Chọn trạng thái"
              optionLabelProp="label"
              value={dataFilter.status}
              allowClear
              onChange={(e) => handleFilterSelect(e, "status")}
            >
              {orderStatus.map((status) => {
                return (
                  <Select.Option
                    key={status.key}
                    value={status.key}
                    label={status.label}
                  >
                    {status.label}
                  </Select.Option>
                );
              })}
            </Select>
        </div>
        <div className={"tableWrapPointDepositHistory"}>
          <TableDefault
            onChange={onChangeTable}
            loading={loadingTable}
            dataSource={dataListPointDepositHistory}
            columns={columns}
            pagination={paginationListPointDepositHistory}
            handleSelectPagination={(e) => handleSelectPagination(e)}
            isFixed
            extraClassName={"h-[calc(100vh-443px)] max-[576px]:h-[calc(100vh_-_399px)]"}
            scroll={{
              x: 1000,
              y:
                windowWidth <= 576
                  ? "calc(100vh - 500px)"
                  : "calc(100vh - 520px)",
            }}
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
    </div>
  );
}
