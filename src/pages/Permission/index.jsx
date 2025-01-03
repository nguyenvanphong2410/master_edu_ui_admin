import './styles.scss';
import NoData from './NoData';
import Handle from './handle.js';
import TreeList from './TreeList';
import { Button, Tooltip } from 'antd';
import styles from './styles.module.scss';
import ModalDefault from '@/components/Modal';
import MainLayout from '@/layouts/MainLayout';
import TablePermission from './TablePermission';
import AddEmployeeOfRole from './AddEmployeeOfRole';
import ModalDeleteDefault from '@/components/ModalDelete';
import { PERMISSIONS, PROTECTED, TYPE_SUBMIT } from '@/utils/constants';
import { ClusterOutlined } from '@ant-design/icons';
import CreateOrUpdatePermission from './CreateOrUpdatePermission';
import {
  setVisibleModalAddEmployeeOfRole,
  setVisibleModalCreateOrUpdateRole,
  setVisibleModalDeleteRole,
} from '@/states/modules/permissions';
import { hasPermission } from '@/utils/helper';
import InlineSVG from 'react-inlinesvg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';

export default function PermisssionsManagement() {
  const {
    dataRole,
    rolesList,
    configModal,
    infoRoleSelected,
    employeeOfRoleList,
    contentModalDelete,
    isLoadingBtnDeleteRole,
    visibleModalDeleteRole,
    visibleModalCreateOrUpdateRole,
    visibleModalAddEmployeeOfRole,
    dispatch,
    openModalCreate,
    handleConfirmDelete,
    openModalAddEmployeeRole,
    handleToggleVisibleModalCreateOrUpdate,
  } = Handle();

  return (
    <MainLayout>
      <div className={styles.pageWrap}>
        <div className={styles.permissionWrap}>
          <div className={styles.permissionTitle}>
            <div className={styles.rolesName}>
              <p>Quản lý vai trò</p>
              {hasPermission([PERMISSIONS.ADD.ADD_ROLE]) && (
                <Tooltip title="Tạo mới vai trò" placement="top">
                  <Button
                    icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                    className={`md:flex items-center main-btn-primary h-full s:hidden`}
                    onClick={() => openModalCreate(TYPE_SUBMIT.CREATE)}
                  >
                    Tạo mới
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
          {rolesList?.length > 0 ? (
            <div className={styles.permissionContent}>
              <TreeList data={dataRole} />
            </div>
          ) : (
            <div className={styles.permissionNoContent}>
              <NoData description={'Không có dữ liệu !'} />
            </div>
          )}
        </div>
        <div className={styles.permissionMain}>
          {infoRoleSelected?._id && hasPermission([PERMISSIONS.LIST.LIST_PERMISSION]) ? (
            <div className={styles.mainWrap}>
              <div className={styles.mainTitle}>
                <p className='mb-2'>Áp dụng quyền hạn theo vai trò</p>
              </div>

              <div className={styles.mainContent}>
                <div className={`${styles.headerPermission} mt-4 mb-4`}>
                  <span
                    className={`
                                                ${infoRoleSelected.protected === PROTECTED.PROTECTED ? 'mt-2 mb-2' : ''}
                                                ${
                                                  !hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE_ROLE])
                                                    ? 'mt-2 mb-2'
                                                    : ''
                                                }
                                            `}
                  >
                    <span className={styles.roleName}>Vai trò</span>
                    <span className={`${styles.strong}`}> {infoRoleSelected.name}</span>
                    {infoRoleSelected.protected === PROTECTED.PROTECTED ? (
                      ''
                    ) : (
                      <>
                        {employeeOfRoleList.length > 0 ? (
                          <>
                            {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE_ROLE]) && (
                              <>
                                <span> gồm có </span>
                                <Tooltip title="Xem quản trị viên" placement="top">
                                  <span
                                    className="text-blue-55 cursor-pointer"
                                    onClick={() => openModalAddEmployeeRole()}
                                  >
                                    {' '}
                                    {employeeOfRoleList.length} quản trị viên.
                                  </span>
                                </Tooltip>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE_ROLE]) && (
                              <span> chưa có quản trị viên nào. </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </span>
                  {infoRoleSelected.protected === PROTECTED.PROTECTED ? (
                    ''
                  ) : (
                    <>
                      {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE_ROLE]) && (
                        <Button
                          icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                          className={`md:flex items-center main-btn-primary h-full s:hidden`}
                          size={'large'}
                          onClick={() => openModalAddEmployeeRole()}
                        >
                          Thêm quản trị viên
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.tablePermission}>
                  <TablePermission />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.iconContainer}>
                <ClusterOutlined className={styles.iconSetting} />
                {hasPermission([PERMISSIONS.LIST.LIST_PERMISSION]) ? (
                  <p>Thiết lập quyền hạn</p>
                ) : (
                  <p>Bạn không có quyền thiết lập quyền hạn!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalDefault
        title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
        isModalOpen={visibleModalCreateOrUpdateRole}
        handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
        handleCancel={() => dispatch(setVisibleModalCreateOrUpdateRole(false))}
      >
        <CreateOrUpdatePermission />
      </ModalDefault>

      <ModalDeleteDefault
        contentBtn={'Xóa vai trò'}
        content={contentModalDelete}
        loading={isLoadingBtnDeleteRole}
        isModalOpen={visibleModalDeleteRole}
        handleConfirm={() => handleConfirmDelete()}
        handleOk={() => dispatch(setVisibleModalDeleteRole(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteRole(false))}
      />

      <ModalDefault
        isModalOpen={visibleModalAddEmployeeOfRole}
        title={`Quản trị viên với vai trò ${infoRoleSelected.name}`}
        onCancel={setVisibleModalAddEmployeeOfRole(false)}
        handleCancel={() => dispatch(setVisibleModalAddEmployeeOfRole(false))}
      >
        <AddEmployeeOfRole />
      </ModalDefault>
    </MainLayout>
  );
}
