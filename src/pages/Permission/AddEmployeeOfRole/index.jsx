import React from 'react';
import Handle from './handle';
import NoData from '../NoData';
import Loading from '../Loading';
import HandleParent from '../handle';
import InlineSVG from 'react-inlinesvg';
import styles from './styles.module.scss';
import ModalDeleteDefault from '@/components/ModalDelete';
import Delete from '@/assets/images/icons/duotone/trash-can.svg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Avatar, Button, Select, Tooltip } from 'antd';
import { updateEmployeeOfRoleSchema } from './schema';
import { setVisibleModalDeleteEmployeeOfRole } from '@/states/modules/permissions';
import { PERMISSIONS } from '@/utils/constants';
import { hasPermission } from '@/utils/helper';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import shield from '@/assets/images/icons/solid/shield.svg';
import teacher from '@/assets/images/icons/solid/chalkboard-user.svg';

export default function AddEmployeeOfRole() {
  const {
    employeeIdsErr,
    employeeOption,
    infoEmployeeIds,
    queryEmployeeWithoutRole,
    isLoadingListEmployeeOfRole,
    isLoadingBtnAddEmployeeOfRole,
    contentModalDeleteEmployeeOfRole,
    visibleModalDeleteEmployeeOfRole,
    isLoadingBtnDeleteEmployeeOfRole,
    dispatch,
    filterOption,
    handleSearch,
    handleClear,
    handlePopupScroll,
    handleFocusEmployeeOfRole,
    handleSubmitEmployeeOfRole,
    openModalDeleteEmployeeOfRole,
    handleConfirmDeletEmployeeOfRole,
    handleChangeSelectEmployeeOfRole,
  } = Handle();

  const { employeeOfRoleList } = HandleParent();

  return (
    <div className={`container`}>
      <div className={`form`}>
        <div className={`input-wrap`}>
          <div style={{ display: 'flex' }}>
            <Select
              allowClear
              mode="multiple"
              placeholder="Chọn quản trị viên"
              popupClassName="dropdownEmploy"
              className={'main-select w-full'}
              showSearch={true}
              options={employeeOption}
              value={infoEmployeeIds.employee_ids}
              searchValue={queryEmployeeWithoutRole.q}
              onClear={handleClear}
              onSearch={handleSearch}
              filterOption={filterOption}
              onPopupScroll={handlePopupScroll}
              onFocus={() => handleFocusEmployeeOfRole('employee_ids')}
              notFoundContent={
                <div className={styles.noDataEmployeeWithoutRole}>
                  <NoData description={'Không có dữ liệu !'} />
                </div>
              }
              onChange={(value) => handleChangeSelectEmployeeOfRole(value, 'employee_ids')}
            />
            <Button
              className={`main-btn-primary ml-3`}
              size={'large'}
              loading={isLoadingBtnAddEmployeeOfRole}
              onClick={() => handleSubmitEmployeeOfRole(updateEmployeeOfRoleSchema, infoEmployeeIds)}
            >
              Thêm
            </Button>
          </div>
          {employeeIdsErr && employeeIdsErr.employee_ids ? (
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto" />
              </div>
              {employeeIdsErr.employee_ids}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      {isLoadingListEmployeeOfRole ? (
        <div className={styles.employeesInWrapLoading}>
          <Loading />
        </div>
      ) : (
        <div className={styles.employeesInWrap}>
          {employeeOfRoleList.length > 0 ? (
            employeeOfRoleList.map((item) => (
              <div className={styles.employees} key={item._id}>
                <div className={styles.employeesContent}>
                  <div className={styles.employeesWrap}>
                    <div className={styles.employeesInfo}>
                      <div className={styles.employeesNameWrap}>
                        <Avatar
                          className={`avatar-user shadow`}
                          crossOrigin="anonymous"
                          src={item.avatar ? item.avatar : avatarDefault}
                        />
                        <div className="ml-2">
                          <div className={styles.employeesName}>
                            {item.name}

                            {item.user_type === 'ADMIN' ? (
                              <Tooltip title="Quản trị viên">
                                <InlineSVG src={shield} className="ml-1 mt-[2px]w-4 h-4 text-blue-500" />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Giáo viên">
                                <InlineSVG src={teacher} className="ml-1 mt-[2px]w-4 h-4 text-yellow-500" />
                              </Tooltip>
                            )}
                          </div>
                          <div className="text-[#9c9b9b]">{item.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.employeesDelete} onClick={() => openModalDeleteEmployeeOfRole(item)}>
                      {hasPermission([PERMISSIONS.DELETE.DELETE_EMPLOYEE_ROLE]) && (
                        <Tooltip placement="top" title="Xoá quản trị viên khỏi vai trò">
                          <InlineSVG src={Delete} width={14} className={`btn-delete ${styles.iconDelete}`} />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.nodataWrap}>
              <div className={styles.nodata}>
                <div className={styles.nodataContent}>
                  <NoData description={'Không có quản trị viên nào !'} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <ModalDeleteDefault
        content={contentModalDeleteEmployeeOfRole}
        contentBtn={<span className="ml-2 mr-2">Xóa</span>}
        isModalOpen={visibleModalDeleteEmployeeOfRole}
        handleOk={() => dispatch(setVisibleModalDeleteEmployeeOfRole(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteEmployeeOfRole(false))}
        handleConfirm={() => handleConfirmDeletEmployeeOfRole()}
        loading={isLoadingBtnDeleteEmployeeOfRole}
      />
    </div>
  );
}
