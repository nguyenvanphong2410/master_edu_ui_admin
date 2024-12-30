import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import { Button, Input, Popover } from 'antd';
import Handle from './handle.js';
import TableDefault from '../../components/Table/index.jsx';
import styles from './styles.module.scss';
import ModalDefault from '../../components/Modal';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import CreateOrUpdate from './components/CreateOrUpdate';
import ModalDeleteDefault from '../../components/ModalDelete/index.jsx';
import ResetPassword from './components/ResetPassword';
import ModalConfirm from '../../components/ModalConfirm/index.jsx';
import { hasPermission } from '@/utils/helper.js';
import { PERMISSIONS } from '@/utils/constants.js';
import { setVisibleModalChangeStatusTeacher, setVisibleModalDeleteTeacher } from '@/states/modules/teacher/index.js';
import InlineSVG from 'react-inlinesvg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';
import CourseAndClassOfTeacher from './components/CourseAndClassOfTeacher/index.jsx';
import FilterPopoverTeacher from './components/FilterPopover/index.jsx';
import FilterIcon from '@/assets/images/icons/duotone/filter-list.svg';

export default function Teacher() {
  const {
    teachers,
    detailTeacher,
    columns,
    visibleModalCreateOrUpdate,
    isTypeModalCreate,
    paginationListTeachers,
    isLoadingTableTeachers,
    visibleModalDeleteTeacher,
    isLoadingBtnDelete,
    contentModalDelete,
    dataFilter,
    visibleModalResetPassword,
    configModalTeacher,
    visibleModalChangeStatus,
    visibleModalCourseAndClassOfTeacher,
    contentModalChangeStatus,
    dataCourseAndClassOfTeacher,
    visiblePopoverSelect,
    dispatch,
    handleConfirmChangeStatus,
    handleToggleVisibleModalResetPassword,
    handleToggleVisibleModalCreateOrUpdate,
    openModalCreate,
    handleConfirmDelete,
    handleSelectLimitTable,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
    handleCancelModalCourseAndClassOfTeacher,
    handleOpenChange,
    handleShowPopoverSelect,
    windowWidth,
  } = Handle();

  return (
    <MainLayout>
      <div>
        <div className={styles.listWrap}>
          <div className={styles.filterWrap}>
            <div className={styles.search}>
              <Input
                prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                className={`main-input`}
                placeholder={'Nhập họ tên, email hoặc SĐT để tìm kiếm'}
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="flex">
            <div className="mr-4">
                {hasPermission([PERMISSIONS.LIST.LIST_STUDENT]) && (
                  <Popover
                    content={<FilterPopoverTeacher />}
                    placement="bottomRight"
                    open={visiblePopoverSelect}
                    onOpenChange={handleOpenChange}
                    trigger={'click'}
                    title={
                      <div className={`title-filter-wrap`}>
                        <span className={`title-filter`}>Bộ lọc giáo viên</span>
                      </div>
                    }
                  >
                    <Button
                      icon={<InlineSVG src={FilterIcon} className={`w-4 h-4`} />}
                      className={`md:flex items-center main-btn-light-color h-full s:hidden`}
                      size={'large'}
                      onClick={handleShowPopoverSelect}
                    >
                      Bộ lọc
                    </Button>
                  </Popover>
                )}
              </div>
            <div className={styles.action}>
              {hasPermission([PERMISSIONS.ADD.ADD_TEACHER]) && (
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                  className={`md:flex items-center main-btn-primary h-full s:hidden`}
                  size={'large'}
                  onClick={() => openModalCreate()}
                >
                  Tạo mới
                </Button>
              )}
            </div>
            </div>
          </div>

          <div className={'tableWrap h-[calc(100vh-267px)]'}>
            <TableDefault
              loading={isLoadingTableTeachers}
              dataSource={teachers}
              columns={columns}
              onChange={handleChangeTable}
              pagination={paginationListTeachers}
              handleSelectPagination={(e) => handleSelectPagination(e)}
              isFixed
              extraClassName={'h-[calc(100vh-310px)]'}
              scroll={{
                x: 1000,
                y:
                  windowWidth <= 576
                    ? 'calc(100vh - 310px)'
                    : windowWidth <= 1536
                    ? 'calc(100vh - 370px)'
                    : 'calc(100vh - 342px)',
              }}
              limitTable={dataFilter.perPage}
              handleSelectLimitTable={(e) => handleSelectLimitTable(e)}
              rowKey={(record) => record._id}
            />
          </div>
        </div>

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdate}
          handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
          handleCancel={() => handleToggleVisibleModalCreateOrUpdate()}
          title={configModalTeacher.title}
        >
          <CreateOrUpdate
            detailTeacher={detailTeacher}
            isTypeModalCreate={isTypeModalCreate}
            closeModal={() => handleToggleVisibleModalCreateOrUpdate()}
          />
        </ModalDefault>

        <ModalDefault
          isModalOpen={visibleModalResetPassword}
          handleOk={() => handleToggleVisibleModalResetPassword()}
          handleCancel={() => handleToggleVisibleModalResetPassword()}
          title={'Thay đổi mật khẩu'}
        >
          <ResetPassword closeModal={() => handleToggleVisibleModalResetPassword()} />
        </ModalDefault>

        <ModalDeleteDefault
          content={contentModalDelete}
          contentBtn={'Xóa'}
          isModalOpen={visibleModalDeleteTeacher}
          handleOk={() => dispatch(setVisibleModalDeleteTeacher(false))}
          handleCancel={() => dispatch(setVisibleModalDeleteTeacher(false))}
          handleConfirm={() => handleConfirmDelete()}
          loading={isLoadingBtnDelete}
        />

        <ModalConfirm
          content={contentModalChangeStatus}
          contentBtn={'Xác nhận'}
          isModalOpen={visibleModalChangeStatus}
          handleOk={() => dispatch(setVisibleModalChangeStatusTeacher(false))}
          handleCancel={() => dispatch(setVisibleModalChangeStatusTeacher(false))}
          handleConfirm={() => handleConfirmChangeStatus()}
          loading={isLoadingBtnDelete}
        />

        <ModalDefault
          isModalOpen={visibleModalCourseAndClassOfTeacher}
          handleCancel={() => handleCancelModalCourseAndClassOfTeacher()}
          title={'Khóa học và lớp do giáo viên phụ trách'}
          width={1200}
        >
          <CourseAndClassOfTeacher dataCourseAndClassOfTeacher={dataCourseAndClassOfTeacher}/>
        </ModalDefault>
      </div>
    </MainLayout>
  );
}
