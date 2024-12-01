import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import { Button, Input } from 'antd';
import Handle from './handle.js';
import TableDefault from '../../components/Table/index.jsx';
import styles from './styles.module.scss';
import ModalDefault from '../../components/Modal';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import CreateOrUpdate from './components/CreateOrUpdate';
import ModalDeleteDefault from '../../components/ModalDelete/index.jsx';
import { setVisibleModalChangeStatus, setVisibleModalDeleteUser } from '../../states/modules/user/index.js';
import ResetPassword from './components/ResetPassword';
import ModalConfirm from '../../components/ModalConfirm/index.jsx';
import { hasPermission } from '@/utils/helper.js';
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants.js';
import InlineSVG from 'react-inlinesvg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';

export default function AccountManagement() {
  const {
    users,
    detailUser,
    columns,
    visibleModalCreateOrUpdate,
    isTypeModalCreate,
    paginationListUsers,
    isLoadingTableUsers,
    visibleModalDeleteUser,
    isLoadingBtnDelete,
    dispatch,
    contentModalDelete,
    dataFilter,
    visibleModalResetPassword,
    configModalAdmin,
    visibleModalChangeStatus,
    contentModalChangeStatus,
    handleConfirmChangeStatus,
    handleToggleVisibleModalResetPassword,
    handleToggleVisibleModalCreateOrUpdate,
    openModalCreate,
    handleConfirmDelete,
    handleSelectLimitTable,
    handleSearch,
    handleChangeTable,
    handleSelectPagination,
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
            <div className={styles.action}>
              {hasPermission([PERMISSIONS.ADD.ADD_EMPLOYEE]) && (
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

          <div className={'tableWrap h-[calc(100vh-267px)]'}>
            <TableDefault
              loading={isLoadingTableUsers}
              dataSource={users}
              columns={columns}
              onChange={handleChangeTable}
              pagination={paginationListUsers}
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
          title={configModalAdmin.type === TYPE_SUBMIT.CREATE ? 'Tạo mới quản trị viên' : 'Cập nhật quản trị viên'}
        >
          <CreateOrUpdate
            detailUser={detailUser}
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
          isModalOpen={visibleModalDeleteUser}
          handleOk={() => dispatch(setVisibleModalDeleteUser(false))}
          handleCancel={() => dispatch(setVisibleModalDeleteUser(false))}
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
      </div>
    </MainLayout>
  );
}
