import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import { Button, Input, Popover } from 'antd';
import Handle from './handle.js';
import TableDefault from '../../components/Table/index.jsx';
import styles from './styles.module.scss';
import ModalDefault from '../../components/Modal/index.jsx';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import CreateOrUpdate from './components/CreateOrUpdate/index.jsx';
import ModalDeleteDefault from '../../components/ModalDelete/index.jsx';
import {
  setVisibleModalChangeStatus,
  setVisibleModalConfirmCustomer,
  setVisibleModalDeleteCustomer,
} from '../../states/modules/customer/index.js';
import ResetPassword from './components/ResetPassword/index.jsx';
import ModalConfirm from '../../components/ModalConfirm/index.jsx';
import { PERMISSIONS } from '@/utils/constants.js';
import { hasPermission } from '@/utils/helper.js';
import InlineSVG from 'react-inlinesvg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';
import CourseAndClassOfStudent from './components/CourseAndClassOfStudent/index.jsx';
import FilterIcon from '@/assets/images/icons/duotone/filter-list.svg';
import FilterPopoverCustomer from './components/FilterPopover/index.jsx';

export default function CustomerManagement() {
  const {
    windowWidth,
    customers,
    customerId,
    detailCustomer,
    columns,
    visibleModalCreateOrUpdate,
    configModal,
    paginationListCustomers,
    isLoadingTableCustomers,
    visibleModalDeleteCustomer,
    isLoadingBtnDelete,
    dispatch,
    contentModalDelete,
    dataFilter,
    visibleModalResetPassword,
    visibleModalChangeStatus,
    contentModalChangeStatus,
    visibleModalConfirmCustomer,
    contentModalConfirm,
    customer_type,
    visibleModalCourseAndClassOfStudent,
    dataCourseAndClassOfStudent,
    visiblePopoverSelect,
    handleOpenChange,
    handleShowPopoverSelect,
    handleConfirmChangeStatus,
    handleToggleVisibleModalResetPassword,
    handleToggleVisibleModalCreateOrUpdate,
    openModalCreate,
    handleConfirmDelete,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
    handleSelectLimitTable,
    handelChangeTab,
    handleConfirmCustomer,
    handleCancelModalCourseAndClassOfStudent,
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
                    content={<FilterPopoverCustomer />}
                    placement="bottomRight"
                    open={visiblePopoverSelect}
                    onOpenChange={handleOpenChange}
                    trigger={'click'}
                    title={
                      <div className={`title-filter-wrap`}>
                        <span className={`title-filter`}>Bộ lọc học viên</span>
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
              <div>
                {hasPermission([PERMISSIONS.ADD.ADD_STUDENT]) && (
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
              loading={isLoadingTableCustomers}
              dataSource={customers}
              columns={columns}
              onChange={handleChangeTable}
              pagination={paginationListCustomers}
              handleSelectPagination={(e) => handleSelectPagination(e)}
              rowKey={'_id'}
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
            />
          </div>
        </div>

        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdate}
          handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
          handleCancel={() => handleToggleVisibleModalCreateOrUpdate()}
          title={configModal.title}
          width={900}
        >
          <CreateOrUpdate detailCustomer={detailCustomer} closeModal={() => handleToggleVisibleModalCreateOrUpdate()} />
        </ModalDefault>

        <ModalDefault
          isModalOpen={visibleModalResetPassword}
          handleOk={() => handleToggleVisibleModalResetPassword()}
          handleCancel={() => handleToggleVisibleModalResetPassword()}
          title={'Thay đổi mật khẩu'}
        >
          <ResetPassword customerId={customerId} closeModal={() => handleToggleVisibleModalResetPassword()} />
        </ModalDefault>

        <ModalDeleteDefault
          content={contentModalDelete}
          contentBtn={'Xóa học viên'}
          isModalOpen={visibleModalDeleteCustomer}
          handleOk={() => dispatch(setVisibleModalDeleteCustomer(false))}
          handleCancel={() => dispatch(setVisibleModalDeleteCustomer(false))}
          handleConfirm={() => handleConfirmDelete()}
          loading={isLoadingBtnDelete}
        />

        <ModalConfirm
          content={contentModalChangeStatus}
          contentBtn={'Xác nhận'}
          isModalOpen={visibleModalChangeStatus}
          handleOk={() => dispatch(setVisibleModalChangeStatus(false))}
          handleCancel={() => dispatch(setVisibleModalChangeStatus(false))}
          handleConfirm={() => handleConfirmChangeStatus()}
          loading={isLoadingBtnDelete}
        />

        <ModalConfirm
          content={contentModalConfirm}
          contentBtn={'Xác thực'}
          isModalOpen={visibleModalConfirmCustomer}
          handleOk={() => dispatch(setVisibleModalConfirmCustomer(false))}
          handleCancel={() => dispatch(setVisibleModalConfirmCustomer(false))}
          handleConfirm={() => handleConfirmCustomer()}
          loading={isLoadingBtnDelete}
        />

        <ModalDefault
          isModalOpen={visibleModalCourseAndClassOfStudent}
          handleCancel={() => handleCancelModalCourseAndClassOfStudent()}
          title={'Khóa học và lớp của học viên'}
          width={1200}
        >
          <CourseAndClassOfStudent dataCourseAndClassOfStudent={dataCourseAndClassOfStudent} />
        </ModalDefault>
      </div>
    </MainLayout>
  );
}
