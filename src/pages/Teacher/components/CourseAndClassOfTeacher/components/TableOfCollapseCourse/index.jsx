import TableDefault from '@/components/Table';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Tag, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import teacher from '@/assets/images/icons/solid/chalkboard-user.svg';
import moment from 'moment';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import styles from './styles.module.scss';

const TableOfCollapseCourse = ({listClassOfCourse, startTime, endTime}) => {

  const windowWidth = useWindowSize().width;
  const columns = [
    {
      title: <span className="title-table">Lớp học</span>,
      dataIndex: 'pictures',
      key: 'pictures',
      width: 300,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <img
              src={record.image_featured ? record.image_featured : imageDefaultClass}
              crossOrigin="anonymous"
              alt="img-class"
              className={`${styles.pictures}`}
              onClick={() => handleShowModalUpdateClass(record, TYPE_SUBMIT.UPDATE)}
            />
            <span className="ml-3">
              <a
                className={`text-ui font-semibold text-[#6589a1] flex items-start`}
                onClick={() => handleShowModalUpdateClass(record, TYPE_SUBMIT.UPDATE)}
              >
                {record.code}
              </a>
              <p className="text-left font-semibold">{record.name}</p>
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Giáo viên</span>,
      dataIndex: 'teacher',
      key: 'teacher',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return (
          <>
            <p className="font-medium flex">
              {text?.name}
              <Tooltip title={`Giáo viên`}>
                <InlineSVG src={teacher} className={`w-4 h-4 mt-1 ml-1 text-[#ff7e33]`} />
              </Tooltip>
            </p>
            <p className="text-[#8b8989]">{text?.email}</p>
          </>
        );
      },
    },
    {
      title: <span className="title-table">Học viên</span>,
      dataIndex: 'creator',
      key: 'creator',
      width: 150,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <span >
            {record.student_ids?.length > 0 ? record.student_ids?.length : 0} học viên
          </span>
        );
      },
    },  
    {
      title: <span className="title-table">Trạng thái</span>,
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return <div>{handleDisplayStatusClass(startTime, endTime)}</div>;
      },
    },
    {
      title: <span className="title-table">Thời gian học</span>,
      dataIndex: 'time',
      key: 'time',
      align: 'end',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div>
            <p>{moment(startTime).format('DD/MM/YYYY')}</p>
            <p>đến {moment(endTime).format('DD/MM/YYYY')}</p>
          </div>
        );
      },
    },

  ];

  const handleDisplayStatusClass = (start_time, end_time) => {
    if (!start_time || !end_time) {
      return <Tag color="default">Không xác định</Tag>;
    }

    const now = new Date();
    let result = null;

    if (new Date(start_time) < now && new Date(end_time) < now) {
      result = <Tag color="green">Đã hoàn thành</Tag>;
    } else if (new Date(start_time) <= now && new Date(end_time) > now) {
      result = <Tag color="blue">Đang diễn ra</Tag>;
    } else if (new Date(start_time) > now && new Date(end_time) > now) {
      result = <Tag color="orange">Sắp diễn ra</Tag>;
    }

    return result;
  };

  return (
    <>
      <div className={'tableWrap'}>
        <TableDefault
          dataSource={listClassOfCourse}
          isFixed
          scroll={{
            x: 1000,
            y:
              windowWidth <= 576
                ? 'calc(100vh - 439px)'
                : windowWidth <= 1536
                ? 'calc(100vh - 370px)'
                : 'calc(100vh - 342px)',
          }}
          rowKey={(record) => record._id}
          columns={columns}
          isPagination={false}
        />
      </div>
    </>
  );
};

export default TableOfCollapseCourse;
