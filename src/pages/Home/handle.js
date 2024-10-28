
import './styles.scss';
import useWindowSize from "../../utils/hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { setRevenueDateFilter, setSearchDateFilter, setTypeRevenue, setTypeSearch } from "../../states/modules/home";
import _ from 'lodash';
import { getListRevenue, getListTransaction } from '../../api/home';
import { formatNumber } from '../../utils/helper';

const dateFilter = {
    daily: "ngày",
    monthly: "tháng",
    yearly: "năm"
}

export default function Handle() {
    const windowWidth = useWindowSize().width
    const typeRevenue = useSelector(state => state.home.typeRevenue);
    const typeSearch = useSelector(state => state.home.typeSearch);
    const searchDateFilter = useSelector(state => state.home.searchDateFilter);
    const revenueDateFilter = useSelector(state => state.home.revenueDateFilter);
    const overview = useSelector(state => state.home.overview);
    const revenue = useSelector(state => state.home.revenue);
    const transaction = useSelector(state => state.home.transaction);

    const dispatch = useDispatch();
    const handleChangeTypeRevenue = (value) => {
        let newDataFilter = _.cloneDeep(revenueDateFilter);
        newDataFilter.start_time = null;
        newDataFilter.end_time = null;
        dispatch(setRevenueDateFilter(newDataFilter));
        dispatch(setTypeRevenue(value));
        dispatch(getListRevenue())
    };

    const handleChangeTypeSearch = (value) => {
        let newDataFilter = _.cloneDeep(searchDateFilter);
        newDataFilter.start_time = null;
        newDataFilter.end_time = null;
        dispatch(setSearchDateFilter(newDataFilter));
        dispatch(setTypeSearch(value));
        dispatch(getListTransaction())
    };

    const updateDateFilter = (filter, value) => {
        let newDataFilter = _.cloneDeep(filter);
        newDataFilter.start_time = value ? value[0] : null;
        newDataFilter.end_time = value ? value[1] : null;
        return newDataFilter;
    };

    const onChangeDateSearch = (value) => {
        const newDataFilter = updateDateFilter(searchDateFilter, value);
        dispatch(setSearchDateFilter(newDataFilter));
        dispatch(getListTransaction())
    }

    const onChangeDateRevenue = (value) => {
        const newDataFilter = updateDateFilter(revenueDateFilter, value);
        dispatch(setRevenueDateFilter(newDataFilter));
        dispatch(getListRevenue())
    }

    const textTile = (type, date, text) => {
        if (date.start_time && date.end_time) {
            let startDateFormatted, endDateFormatted;
            switch (type) {
                case 'daily':
                    startDateFormatted = date.start_time.format("DD-MM-YYYY");
                    endDateFormatted = date.end_time.format("DD-MM-YYYY");
                    break;
                case 'monthly':
                    startDateFormatted = date.start_time.format("MM-YYYY");
                    endDateFormatted = date.end_time.format("MM-YYYY");
                    break;
                case 'yearly':
                    startDateFormatted = date.start_time.format("YYYY");
                    endDateFormatted = date.end_time.format("YYYY");
                    break;
                default:
                    startDateFormatted = "";
                    endDateFormatted = "";
            }
            return `Biểu đồ thống kê ${text} từ ${dateFilter[type]} ${startDateFormatted} đến ${dateFilter[type]} ${endDateFormatted}`;
        } else {
            return `Biểu đồ thống kê ${text} theo ${dateFilter[type]}`;
        }
    };


    const categoriesRevenue = revenue?.map(item => item.time);
    const seriesDataRevenue = revenue?.map(item => item.value);

    const categoriesTransaction = transaction?.map(item => item.time);
    const seriesDataTransaction = transaction?.map(item => item.value);

    const generateChartState = (categories, seriesData, type, dateFilter, titleSuffix, tooltipSuffix) => {
        return {
            options: {
                chart: {
                    id: 'basic-bar',
                    toolbar: {
                        show: false,
                    }
                },
                xaxis: {
                    categories: categories
                },
                title: {
                    text: textTile(type, dateFilter, titleSuffix.toLowerCase()),
                    align: 'center',
                    style: {
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return formatNumber(val) + tooltipSuffix;
                        }
                    }
                },
                dataLabels: {
                    enabled: false 
                },
                yaxis: {
                    labels: {
                      formatter: function (val) {
                        return formatNumber(val);
                      }
                    }
                  },
            },
            series: [{
                name: titleSuffix,
                data: seriesData,
            }]
        };
    };

    const stateRevenue = generateChartState(categoriesRevenue, seriesDataRevenue, typeRevenue, revenueDateFilter, 'Doanh thu', ' VNĐ');
    const stateSearch = generateChartState(categoriesTransaction, seriesDataTransaction, typeSearch, searchDateFilter, 'Tra cứu', ' lượt');

    return {
        windowWidth, typeRevenue, typeSearch,
        handleChangeTypeRevenue, handleChangeTypeSearch,
        revenueDateFilter, searchDateFilter,
        onChangeDateSearch, onChangeDateRevenue,
        overview, stateRevenue, stateSearch
    }
}