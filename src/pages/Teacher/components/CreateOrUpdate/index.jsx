import React from 'react';
import { Button, Input, Radio, Skeleton, Space, Switch, Tooltip, TreeSelect } from 'antd';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../../../assets/images/icons/light/warning.svg';
import Handle from './handle.js';
import HandlePermission from '@/pages/Permission/CreateOrUpdatePermission/handle';
import NoData from '@/pages/Permission/NoData';
import { hasPermission } from '@/utils/helper';
import { GENDER_USER, PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import { setInForAdmin } from '@/states/modules/user';

export default function CreateOrUpdate(props) {
  const { isTypeModalCreate, closeModal } = props;
  const {
    inForTeacher,
    errorCreateOrUpdate,
    isLoadingBtnCreateOrUpdate,
    isLoadingDetailTeacher,
    configModalTeacher,
    dispatch,
    handleChangeInput,
    handleChangeSwitch,
    handleConfirm,
    handleFocus,
    handleChangeAvatar,
  } = Handle(props);

  const { treeDataOption } = HandlePermission();

  return (
    <div>
      <div>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>Ảnh đại diện</div>
          <div className={`flex mb-4`}>
            <input
              id={'imageUpload'}
              type="file"
              accept="image/*"
              className={`hidden`}
              onChange={(file) => handleChangeAvatar(file)}
            />
            <Tooltip title="Chỉnh sửa ảnh đại diện">
              <label className={`icon-img icon-edit-img`} htmlFor="imageUpload">
                <InlineSVG src={IconEditAvatar} alt="" className={`icon-action`} />
              </label>
            </Tooltip>
            <Tooltip title="Xóa ảnh đại diện">
              <div
                className={`icon-img icon-remove-img`}
                onClick={() => dispatch(setInForAdmin({ ...inForTeacher, avatarUrl: '', avatar: 'delete' }))}
              >
                <InlineSVG src={Close} alt="" className={`icon-action`} />
              </div>
            </Tooltip>
            <div className={`relative`}>
              <img
                src={inForTeacher.avatarUrl ? inForTeacher.avatarUrl : avatarDefault}
                crossOrigin="anonymous"
                alt=""
                className={`img-avt`}
              />
            </div>
          </div>
        </div>

        <div className="h-[300px] overflow-auto">
          <div className={`input-wrap`}>
            <div className={'label-wrap'}>
              Họ và tên <span className={'required'}>*</span>
            </div>
            {!isTypeModalCreate && isLoadingDetailTeacher ? (
              <Skeleton.Input size={'large'} active={true} block={true} />
            ) : (
              <Input
                className={`main-input`}
                placeholder={'Nhập họ và tên'}
                value={inForTeacher.name}
                onFocus={() => handleFocus('name')}
                onChange={(e) => handleChangeInput(e, 'name')}
              />
            )}
            {errorCreateOrUpdate && errorCreateOrUpdate?.name?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.name}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className={`input-wrap`}>
            <div className={'label-wrap'}>
              Email <span className={'required'}>*</span>
            </div>
            {!isTypeModalCreate && isLoadingDetailTeacher ? (
              <Skeleton.Input size={'large'} active={true} block={true} />
            ) : (
              <Input
                className={`main-input`}
                placeholder={'Nhập email'}
                value={inForTeacher.email}
                onFocus={() => handleFocus('email')}
                onChange={(e) => handleChangeInput(e, 'email')}
              />
            )}
            {errorCreateOrUpdate && errorCreateOrUpdate?.email?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.email}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className={`input-wrap`}>
            <div className={'label-wrap'}>Số điện thoại</div>
            {!isTypeModalCreate && isLoadingDetailTeacher ? (
              <Skeleton.Input size={'large'} active={true} block={true} />
            ) : (
              <Input
                className={`main-input`}
                placeholder={'Nhập số điện thoại'}
                value={inForTeacher.phone}
                onFocus={() => handleFocus('phone')}
                onChange={(e) => handleChangeInput(e, 'phone')}
              />
            )}
            {errorCreateOrUpdate && errorCreateOrUpdate?.phone?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.phone}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className={`input-wrap`}>
            <div className={'label-wrap'}>Địa chỉ</div>
            <Input
              className={`main-input`}
              placeholder={'Nhập địa chỉ'}
              value={inForTeacher.address}
              onFocus={() => handleFocus('address')}
              onChange={(e) => handleChangeInput(e, 'address')}
            />
            {errorCreateOrUpdate && errorCreateOrUpdate?.address?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.address}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className={`input-wrap`}>
            <div className={'label-wrap'}>Giới tính <span className={'required'}>*</span></div>

            <Radio.Group onChange={(e) => handleChangeInput(e, 'gender')} value={inForTeacher.gender}>
              <Space>
                <Radio value={GENDER_USER.MALE}>Nam</Radio>
                <Radio value={GENDER_USER.FEMALE}>Nữ</Radio>
                <Radio value={GENDER_USER.OTHER}>Khác</Radio>
              </Space>
            </Radio.Group>
            {errorCreateOrUpdate && errorCreateOrUpdate?.gender?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.gender}
              </span>
            ) : (
              ''
            )}
          </div>

          {configModalTeacher.type === TYPE_SUBMIT.CREATE ? (
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Mật khẩu <span className={'required'}>*</span>
              </div>
              <Input.Password
                className={`main-input`}
                placeholder={'Nhập mật khẩu'}
                value={inForTeacher.password}
                onFocus={() => handleFocus('password')}
                onChange={(e) => handleChangeInput(e, 'password')}
              />
              {errorCreateOrUpdate && errorCreateOrUpdate?.password?.length > 0 ? (
                <span className={'error'}>
                  <div className={'icon'}>
                    <InlineSVG src={IconWarning} width={14} height="auto" />
                  </div>
                  {errorCreateOrUpdate?.password}
                </span>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          {hasPermission([PERMISSIONS.EDIT.EDIT_EMPLOYEE_ROLE]) && (
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>Vai trò </div>
              <TreeSelect
                multiple
                allowClear
                treeDefaultExpandAll
                showSearch={false}
                className="main-select w-full tree_select_wrap"
                placeholder="Chọn vai trò "
                notFoundContent={
                  <div className="mt-4 mb-4">
                    <NoData description={'Không có dữ liệu !'} />
                  </div>
                }
                treeData={treeDataOption}
                value={inForTeacher?.role_ids}
                onChange={(value) => handleChangeInput(value, 'role_ids')}
              />
            </div>
          )}

          <div className={`input-wrap !mb-[15px]`}>
            <div className={'label-wrap'}>
              Trạng thái <span className={'required'}>*</span>
            </div>
            {!isTypeModalCreate && isLoadingDetailTeacher ? (
              <Skeleton.Button shape={'round'} size={'large'} active={true} />
            ) : (
              <Switch
                className={`main-switch`}
                checked={inForTeacher.status}
                onChange={(e) => handleChangeSwitch(e, 'status')}
              />
            )}
            {errorCreateOrUpdate && errorCreateOrUpdate?.status?.length > 0 ? (
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdate?.status}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className={`flex justify-center`}>
        {configModalTeacher.type === TYPE_SUBMIT.CREATE ? (
          <Button
            className={`main-btn-primary`}
            size={'large'}
            loading={isLoadingBtnCreateOrUpdate}
            onClick={() => handleConfirm(TYPE_SUBMIT.CREATE, inForTeacher)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            className={`main-btn-primary`}
            size={'large'}
            loading={isLoadingBtnCreateOrUpdate}
            onClick={() => handleConfirm(TYPE_SUBMIT.UPDATE, inForTeacher)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}
