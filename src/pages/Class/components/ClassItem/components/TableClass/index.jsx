import React from 'react';
import Handle from './handle';
import { Tooltip } from 'antd';
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
  setVisibleModalSettingScore,
} from '@/states/modules/class';
import ModalSettingScore from '../ModalSettingScore';
import { requestGetListStudentOfClass } from '@/api/score';
import { initInfoScore } from '@/states/modules/class/initState';
import { requestGetListStudentScoreOfClass } from '@/api/class';

function TableClass({ handleChangeTableClass }) {
  const dispatch = useDispatch();
  const windowWidth = useWindowSize().width;

  const dataListClasses = useSelector((state) => state.class.classes);
  const isLoadingTableClass = useSelector((state) => state.class.isLoadingTableClass);
  const paginationListClass = useSelector((state) => state.class.paginationListClass);
  const classSelected = useSelector((state) => state.class.classSelected);
  const visibleModalSettingScore = useSelector((state) => state.class.visibleModalSettingScore);

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
      title: <span className="title-table">Tạo bởi</span>,
      dataIndex: 'creator',
      key: 'creator',
      width: 150,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <span>{text?.name}</span>;
      },
    },
    {
      title: <span className="title-table">Tối đa</span>,
      dataIndex: 'max_number_student',
      key: 'max_number_student',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text ? <span>{text} người</span> : '---';
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
                  <div
                    className={`btn-edit`}
                    onClick={() => handleShowModalSettingScoreClass(record)}
                  >
                    <InlineSVG src={filePen} width={14} />
                  </div>
                </Tooltip>
                {hasPermission([PERMISSIONS.EDIT.EDIT_CLASS]) && (
                  <Tooltip placement="top" title={'Cập nhật'}>
                    <div
                      className={`btn-edit`}
                      onClick={() => handleShowModalUpdateClass(record, TYPE_SUBMIT.UPDATE)}
                    >
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
    </div>
  );
}

export default TableClass;
