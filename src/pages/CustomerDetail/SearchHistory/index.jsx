import styles from "../styles.module.scss"
import React from "react";
import TableDefault from "../../../components/Table";
import Handle from "./handle";
import { Select } from "antd";

export default function SearchHistory() {
    const {
        dataFilter,
        loadingTable,
        dataListSearchHistory,
        paginationListSearchHistory,
        columns,
        handleSelectPagination,
        handleChangeTable,
        handleSelectLimitTable,
        onChangeService,
        isLoadingGetListServiceOption,
        listServiceOption,
        windowWidth,
    } = Handle();

    return (
        <div>
            <div className={styles.listWrap}>
                <div className={styles.filterWrap}>
                    <div className={styles.search}></div>
                    <Select
                        className={`main-select w-64 pl-3`}
                        placeholder="Chọn dịch vụ"
                        optionLabelProp="label"
                        value={dataFilter.service_name}
                        allowClear
                        onChange={onChangeService}
                        loading={isLoadingGetListServiceOption}
                        popupClassName={styles.serviceOptionPopupWrap}
                        >
                        {listServiceOption.map((item) => (
                            <Select.Option key={item} value={item} label={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className={styles.tableSearchHistoryWrap}>
                    <TableDefault
                        loading={loadingTable}
                        dataSource={dataListSearchHistory}
                        columns={columns}
                        pagination={paginationListSearchHistory}
                        isFixed
                        extraClassName={'h-[calc(100vh-443px)] max-[576px]:h-[calc(100vh_-_399px)]'}
                        handleSelectPagination={e => handleSelectPagination(e)}
                        onChange={handleChangeTable}
                        rowKey={(record) => record._id}
                        limitTable={dataFilter.perPage}
                        handleSelectLimitTable={(e) => handleSelectLimitTable(e)}
                        scroll={{
                        x: 1000,
                        y:
                            windowWidth <= 576
                            ? "calc(100vh - 500px)"
                            : "calc(100vh - 520px)",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
