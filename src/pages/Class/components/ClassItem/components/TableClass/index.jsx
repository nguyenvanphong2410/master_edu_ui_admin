import React from 'react';
import Handle from './handle';
import { Tag, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import TableDefault from '@/components/Table';
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import styles from './styles.module.scss';
import { hasPermission } from '@/utils/helper';
import Edit from '@/assets/images/icons/duotone/pencil.svg';
import Delete from '@/assets/images/icons/duotone/trash-can.svg';
import filePen from '@/assets/images/icons/duotone/file-pen.svg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import moment from 'moment';
import teacher from '@/assets/images/icons/solid/chalkboard-user.svg';
import ModalDefault from '@/components/Modal';
import {
  setClassSelected,
  setInfoScore,
  setStudentToSetScoreSelected,
  setVisibleModalDSSVOfClass,
  setVisibleModalSettingScore,
} from '@/states/modules/class';
import ModalSettingScore from '../ModalSettingScore';
import { requestGetListStudentOfClass } from '@/api/score';
import { initInfoScore } from '@/states/modules/class/initState';
import { requestGetListStudentScoreOfClass } from '@/api/class';
import TableDSSVOfClass from '../TableDSSVOfClass';

function TableClass({ handleChangeTableClass }) {
  const dispatch = useDispatch();
  const windowWidth = useWindowSize().width;

  const dataListClasses = useSelector((state) => state.class.classes);
  const isLoadingTableClass = useSelector((state) => state.class.isLoadingTableClass);
  const paginationListClass = useSelector((state) => state.class.paginationListClass);
  const classSelected = useSelector((state) => state.class.classSelected);
  const visibleModalSettingScore = useSelector((state) => state.class.visibleModalSettingScore);
  const visibleModalDSSVOfClass = useSelector((state) => state.class.visibleModalDSSVOfClass);

  const { handleShowModalUpdateClass, handleDeleteClassAlert, handleChangePaginationClass } = Handle();

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
      title: <span className="title-table">Khóa học</span>,
      dataIndex: 'course',
      key: 'course',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <span>{text?.name}</span>;
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
          <span className="text-blue-55 underline cursor-pointer" onClick={() => handleClickTotalStudent(record)}>
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
        return <div>{handleDisplayStatusClass(record?.course?.start_time, record?.course?.end_time)}</div>;
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
            <p>{moment(record?.course?.start_time).format('DD/MM/YYYY')}</p>
            <p>đến {moment(record?.course?.end_time).format('DD/MM/YYYY')}</p>
          </div>
        );
      },
    },
    {
      title: <span className="title-table">Tạo bởi</span>,
      dataIndex: 'creator',
      key: 'creator',
      align:'center',
      width: 150,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <span>{text?.name}</span>;
      },
    },
    hasPermission([PERMISSIONS.EDIT.EDIT_CLASS, PERMISSIONS.DELETE.DELETE_CLASS])
      ? {
          title: <span className="title-table">Hoạt động</span>,
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
          fixed: window.innerWidth > 767 ? 'right' : '',
          width: 160,
          render: (text, record) => {
            return (
              <div className={`btn-table-action`}>
                <Tooltip placement="top" title={'Xét điểm'}>
                  <div className={`btn-edit`} onClick={() => handleShowModalSettingScoreClass(record)}>
                    <InlineSVG src={filePen} width={14} />
                  </div>
                </Tooltip>
                {hasPermission([PERMISSIONS.EDIT.EDIT_CLASS]) && (
                  <Tooltip placement="top" title={'Cập nhật'}>
                    <div className={`btn-edit`} onClick={() => handleShowModalUpdateClass(record, TYPE_SUBMIT.UPDATE)}>
                      <InlineSVG src={Edit} width={14} />
                    </div>
                  </Tooltip>
                )}
                {hasPermission([PERMISSIONS.DELETE.DELETE_CLASS]) && (
                  <Tooltip placement="top" title={'Xóa'}>
                    <div className={`btn-delete`} onClick={() => handleDeleteClassAlert(record)}>
                      <InlineSVG src={Delete} width={14} />
                    </div>
                  </Tooltip>
                )}
              </div>
            );
          },
        }
      : {
          width: 1,
        },
  ];

  const handleShowModalSettingScoreClass = (record) => {
    dispatch(setVisibleModalSettingScore(true));
    dispatch(setClassSelected(record));
    dispatch(requestGetListStudentOfClass(record._id));
    dispatch(requestGetListStudentScoreOfClass(record._id));
  };

  const handleCancelModalSettingScore = () => {
    dispatch(setVisibleModalSettingScore(false));
    dispatch(setStudentToSetScoreSelected(''));
    dispatch(setInfoScore(initInfoScore));
  };

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

  const handleClickTotalStudent = (record) => {
    dispatch(setClassSelected(record))
    dispatch(requestGetListStudentScoreOfClass(record._id));
    dispatch(setVisibleModalDSSVOfClass(true));

  }

  const handleCancelModalDSSVOfClass = () => {
    dispatch(setVisibleModalDSSVOfClass(false));

  }

  return (
    <div>
      <TableDefault
        extraClassName={'h-[calc(100vh-290px)]'}
        loading={isLoadingTableClass}
        onChange={handleChangeTableClass}
        dataSource={dataListClasses}
        pagination={paginationListClass}
        columns={columns}
        rowKey={(record) => record?._id}
        handleSelectPagination={(e) => handleChangePaginationClass(e)}
        scroll={{
          x: 1000,
          y:
            windowWidth <= 576
              ? 'calc(100vh - 310px)'
              : windowWidth <= 1536
              ? 'calc(100vh - 340px)'
              : 'calc(100vh - 342px)',
        }}
      />
      <ModalDefault
        isModalOpen={visibleModalSettingScore}
        handleCancel={handleCancelModalSettingScore}
        title={'Xét điểm số'}
        width={1200}
      >
        <ModalSettingScore />
      </ModalDefault>

      <ModalDefault
        isModalOpen={visibleModalDSSVOfClass}
        handleCancel={handleCancelModalDSSVOfClass}
        title={<>Danh sách học viên của lớp <span className='text-color-blue'>{classSelected?.name}</span> thuộc khóa học <span className='text-color-main'>{classSelected?.course?.name}</span></>}
        width={1650}
      >
        <TableDSSVOfClass />
      </ModalDefault>
    </div>
  );
}

export default TableClass;
