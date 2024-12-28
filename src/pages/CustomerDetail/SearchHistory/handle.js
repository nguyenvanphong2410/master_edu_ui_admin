import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setDataFilter } from "../../../states/modules/detail";
import { getSearchHistory } from "../../../api/customer";
import './styles.scss';
import _ from "lodash";
import useWindowSize from "@/utils/hooks/useWindowSize";
import React from "react";

export default function Handle() {
    const dispatch = useDispatch();
    const windowWidth = useWindowSize().width;
    const dataFilter = useSelector(state => state.detail.dataFilter)
    const loadingTable = useSelector(state => state.detail.isLoadingGetListSearchHistory);
    const dataListSearchHistory = useSelector(state => state.detail.dataListSearchHistory);
    const paginationListSearchHistory = useSelector(state => state.detail.paginationListSearchHistory)
    const isLoadingGetListServiceOption = useSelector(state => state.detail.isLoadingGetListServiceOption);
    const listServiceOption = useSelector(state => state.detail.listServiceOption);

    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'service_name',
            key: 'service_name',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
            render: (text) => text ?
            <span className={'text-name-course'}>{text}</span> : <span className={`italic`}>Đang cập nhật</span>
        },
        {
            title: 'Thông tin tra cứu',
            dataIndex: 'request',
            key: 'request',
            width: 320,
            render: (text, record) => text ?
              <span className={'font-normal'}>
                {
                  record.service_code === "COMPATIBILITY_BY_BIRTH_AND_NAME" ? <>
                    <span className={`font-normal flex items-center w-max`}>
                      Họ tên con:
                      <span className={`font-bold`}>&nbsp;{text.name}</span>
                       
                      </span>
                      <br/>
                    </>
                  : <></>
                }
              <span className={`font-normal flex items-center w-max`}>
                Ngày sinh:
                  <span className={`font-bold ml-[5px]`}>{moment(text.birthday).format("DD/MM/YYYY")}</span>
                   
                  </span>
              </span>
              :
              <span className={`italic`}>Đang cập nhật</span>
        },
        {
            title: 'Số điểm bị trừ',
            dataIndex: 'service_point',
            key: 'service_point',
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
            render: (text) => text ?
            <span className="text-[#ff4d4f] font-semibold">-{text}</span> :
            <span className={`italic`}>Đang cập nhật</span>
        },
        {
            title: 'Thời gian tra cứu',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => a.age - b.age,
            render: (text) => text ?
            <span>{moment(text).format("HH:mm DD/MM/YYYY")}</span> :
            <span className={`italic`}>Đang cập nhật</span>
        },
    ];

    const handleSelectPagination = (value) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getSearchHistory());
    }

    const handleChangeTable = (pagination, filters, sorter) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.order = null;
        newDataFilter.column = null;
        if (sorter.order && sorter.field) {
          newDataFilter.order = sorter.order === "descend" ? "desc" : "asc";
          newDataFilter.column = sorter.field;
        }
        dispatch(setDataFilter(newDataFilter));
        dispatch(getSearchHistory());
    }

    const handleSelectLimitTable = (value) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter['page'] = 1;
        newDataFilter['perPage'] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getSearchHistory());
    }
    const onChangeService = (serviceCode) => {
        const newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = 1;
        newDataFilter.service_name = serviceCode;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getSearchHistory());
    };
    return {
        dispatch,
        dataFilter,
        loadingTable,
        dataListSearchHistory,
        columns,
        handleSelectPagination,
        paginationListSearchHistory,
        handleChangeTable,
        handleSelectLimitTable,
        isLoadingGetListServiceOption,
        listServiceOption,
        onChangeService,
        windowWidth,
    }
}
