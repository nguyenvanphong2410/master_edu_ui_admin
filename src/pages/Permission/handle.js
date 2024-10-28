import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROTECTED } from '@/utils/constants';
import {
  setInfoRole,
  setConfigModal,
  setEmployeeeIds,
  setErrorEmployeeIds,
  setInfoRoleSelected,
  setVisibleModalDeleteRole,
  setErrorCreateOrUpdateRole,
  setQueryEmployeeWithoutRole,
  setInfoPermissionRoleSelected,
  setVisibleModalAddEmployeeOfRole,
  setVisibleModalCreateOrUpdateRole,
  initialQueryEmployeeWithoutRole,
} from '../../states/modules/permissions/index';
import {
  handleGetTypes,
  handleDeleteRole,
  handleGetEmployeeOfRole,
  handleGetPermissionOfRole,
  handleEmployeeWithoutRole,
  handleUpdatePermissionRole,
} from '@/api/permission';

export default function Handle() {
  const dispatch = useDispatch();

  const [permissionId, setPermissionId] = useState('');
  const [contentModalDelete, setContentModalDelete] = useState('');

  const infoUser = useSelector((state) => state.app.infoUser);
  const infoRole = useSelector((state) => state.permission.infoRole);
  const rolesList = useSelector((state) => state.permission.rolesList);
  const typesList = useSelector((state) => state.permission.typesList);
  const configModal = useSelector((state) => state.permission.configModal);
  const permissionList = useSelector((state) => state.permission.permissionList);
  const infoRoleSelected = useSelector((state) => state.permission.infoRoleSelected);
  const employeeOfRoleList = useSelector((state) => state.permission.employeeOfRoleList);
  const isLoadingBtnDeleteRole = useSelector((state) => state.permission.isLoadingBtnDeleteRole);
  const visibleModalDeleteRole = useSelector((state) => state.permission.visibleModalDeleteRole);
  const isLoadingListPermission = useSelector((state) => state.permission.isLoadingListPermission);
  const visibleModalAddEmployeeOfRole = useSelector((state) => state.permission.visibleModalAddEmployeeOfRole);
  const visibleModalCreateOrUpdateRole = useSelector((state) => state.permission.visibleModalCreateOrUpdateRole);
  const isLoadingBtnUpdatePermissionRole = useSelector((state) => state.permission.isLoadingBtnUpdatePermissionRole);

  const handleReloadData = () => {
    dispatch(
      setErrorCreateOrUpdateRole({
        name: '',
        description: '',
      })
    );
  };

  const openModalCreate = (type) => {
    dispatch(setConfigModal({ title: 'Tạo mới vai trò', type }));
    dispatch(
      setInfoRole({
        name: '',
        description: '',
      })
    );
    handleReloadData();
    handleToggleVisibleModalCreateOrUpdate();
  };

  const handleToggleVisibleModalCreateOrUpdate = () => {
    handleReloadData();
    dispatch(setVisibleModalCreateOrUpdateRole(!visibleModalCreateOrUpdateRole));
  };

  const openModalEdit = (roleDetail, type) => {
    handleToggleVisibleModalCreateOrUpdate();
    dispatch(setConfigModal({ title: 'Cập nhật thông tin vai trò ', type }));
    dispatch(setInfoRole({...roleDetail}));
    dispatch(setInfoRoleSelected({ ...roleDetail }));
    if (roleDetail.protected === PROTECTED.UNPROTECTED) {
      dispatch(handleGetEmployeeOfRole(roleDetail._id));
    }
    dispatch(handleGetPermissionOfRole(roleDetail._id));
    dispatch(handleGetTypes())
  };

  const openModalDelete = (user) => {
    dispatch(setInfoRole(user));
    dispatch(setVisibleModalDeleteRole(true));
  };

  useEffect(() => {
    if (infoRole) {
      setContentModalDelete(
        <span>
          Bạn có chắc chắn muốn xóa vai trò{''}
          <div>
            <b>{infoRole.name}</b>?
          </div>
        </span>
      );
    }
  }, [infoRole]);

  const handleConfirmDelete = () => {
    if (infoRole) {
      dispatch(handleDeleteRole(infoRole._id));
    }
  };

  const handleContentSelect = (role) => {
    const roleId = role._id;
    dispatch(setInfoRoleSelected({ ...role }));
    dispatch(setInfoRole({...role}));
    if (role.protected === PROTECTED.UNPROTECTED) {
      dispatch(handleGetEmployeeOfRole(roleId));
    }
    dispatch(handleGetPermissionOfRole(roleId));
    dispatch(handleGetTypes());
  };

  const openModalAddEmployeeRole = () => {
    dispatch(handleEmployeeWithoutRole(infoRoleSelected._id));
    dispatch(handleGetEmployeeOfRole(infoRoleSelected._id));
    dispatch(setVisibleModalAddEmployeeOfRole(true));
    dispatch(setEmployeeeIds({employee_ids: []}));
    dispatch(setErrorEmployeeIds({employee_ids: ''}));
  };

  const handleToggleVisibleModalAddEmployeeOfRole = () => {
    dispatch(setEmployeeeIds({ employee_ids: [] }));
    dispatch(setErrorEmployeeIds({ employee_ids: '' }));
    dispatch(setQueryEmployeeWithoutRole(initialQueryEmployeeWithoutRole));
    dispatch(setVisibleModalAddEmployeeOfRole(!visibleModalAddEmployeeOfRole));
  };

  const handleCheckboxChange = (id, permissionId, permissionRole) => {
    setPermissionId(id);
    dispatch(setInfoPermissionRoleSelected(permissionRole));
    dispatch(handleUpdatePermissionRole(infoRoleSelected._id, id));
  };

  const handleConfirmUpdatePermissionRole = () => {
    dispatch(handleUpdatePermissionRole(infoRoleSelected._id, permissionId));
  };

  const convertRoleList = (roles) => {
    const convertRole = (role) => {
        let newRole = { ...role };

        if (newRole.name === 'super_admin') {
            newRole.name = 'Super Admin';
        }

        if (newRole.children && newRole.children.length > 0) {
            newRole.children = newRole.children.map(convertRole);
        }

        return newRole;
    };

    return roles.map(convertRole);
  };
  const dataRole = convertRoleList(rolesList);

  return {
    dataRole,
    infoUser,
    infoRole,
    typesList,
    rolesList,
    configModal,
    permissionList,
    infoRoleSelected,
    contentModalDelete,
    employeeOfRoleList,
    visibleModalDeleteRole,
    isLoadingBtnDeleteRole,
    isLoadingListPermission,
    visibleModalAddEmployeeOfRole,
    visibleModalCreateOrUpdateRole,
    isLoadingBtnUpdatePermissionRole,
    dispatch,
    openModalEdit,
    openModalDelete,
    openModalCreate,
    handleConfirmDelete,
    handleContentSelect,
    handleCheckboxChange,
    openModalAddEmployeeRole,
    handleConfirmUpdatePermissionRole,
    handleToggleVisibleModalCreateOrUpdate,
    handleToggleVisibleModalAddEmployeeOfRole,
  };
}
