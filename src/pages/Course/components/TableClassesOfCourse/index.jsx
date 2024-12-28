import TableDefault from '@/components/Table';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Avatar, Tag, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import moment from 'moment';
import styles from './styles.module.scss';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import chalkboard from '@/assets/images/icons/solid/chalkboard-user.svg';
import ModalDefault from '@/components/Modal';
import TableDSSV from '../TableDSSV';
import { setShowModalDSSV } from '@/states/modules/course';
import { useState } from 'react';

const TableClassesOfCourse = ({ dataTimeOfModalClassOfCourse, infoCourses }) => {
  const windowWidth = useWindowSize().width;
  const dispatch = useDispatch();

  const [dataClickDSSV, setDataClickDSSV] = useState(null)
  const [dataInfoClassSelected, setDataInfoClassSelected] = useState(null)

  const classesOfCourse = useSelector((state) => state.course.classesOfCourse);
  const visibleModalDSSV = useSelector((state) => state.course.visibleModalDSSV);

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
      render: (text, record) => {
        return (
          <div className={`flex`}>
            <Avatar
              className={`avatar-user shadow`}
              crossOrigin="anonymous"
              src={text.avatar ? text.avatar : avatarDefault}
            />
            <div className={`ml-[10px] font-medium`}>
              <div className={`name-user cursor-pointer flex`}>
                {text.name}
                <Tooltip title={`Giáo viên`}>
                  <InlineSVG src={chalkboard} className={`w-4 h-4 mt-1 ml-1 text-[#f19137]`} />
                </Tooltip>
              </div>
              <a className="email-user" href={`mailto:${text.email}`}>
                {text.email}
              </a>
            </div>
          </div>
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
        return <div>{handleDisplayStatusClass()}</div>;
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
            <p>{moment(dataTimeOfModalClassOfCourse.start_time).format('DD/MM/YYYY')}</p>
            <p>đến {moment(dataTimeOfModalClassOfCourse.end_time).format('DD/MM/YYYY')}</p>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Sinh viên</span>,
      dataIndex: 'student_of_class',
      key: 'student_of_class',
      align: 'center',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <span className="text-blue-55 underline cursor-pointer" onClick={() => handleShowDSSV(record?.student_of_class, record)}>
            DSSV
          </span>
        );
      },
    },
  ];

  const handleDisplayStatusClass = () => {
    const start_time = dataTimeOfModalClassOfCourse.start_time;
    const end_time = dataTimeOfModalClassOfCourse.end_time;

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

  const handleShowDSSV = (dataListDSSV, record) => {
    console.log("🌈 ~ handleShowDSSV ~ record lop ne:", record)
    setDataInfoClassSelected(record?.name)
    dispatch(setShowModalDSSV(true));
    setDataClickDSSV(dataListDSSV);
  };

  const handleCancelDSSV = () => {
    dispatch(setShowModalDSSV(false));
  };

  return (
    <>
      <div className={'tableWrap h-[calc(100vh-380px)]'}>
        <TableDefault
          dataSource={classesOfCourse}
          isFixed
          extraClassName={'h-[calc(100vh-430px)]'}
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
        <ModalDefault
          isModalOpen={visibleModalDSSV}
          handleCancel={handleCancelDSSV}
          title={<>Danh sách học viên của lớp <span className='text-color-blue'>{dataInfoClassSelected}</span> thuộc khóa học <span className='text-color-main'>{infoCourses?.name}</span></>}
          width={1400}
        >
          <TableDSSV dataDSSV={dataClickDSSV} />
        </ModalDefault>
      </div>
    </>
  );
};

export default TableClassesOfCourse;
