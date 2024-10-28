import React from 'react';
import { Button, Input, Radio, Space, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import Handle from './handle.js';
import styles from './styles.module.scss';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import { GENDER_USER } from '@/utils/constants.js';

export default function Information(props) {
  const {
    infoProfile,
    errorInformation,
    isLoadingBtnInformation,
    handleChangeInput,
    handleConfirmUpdateInformation,
    handleKeyDown,
    handleChangeInputAvatar,
    handleChangeAvatar,
    imageUrl,
  } = Handle(props);
  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`flex justify-center`}>
          <input
            id={'imageUpload'}
            type="file"
            accept="image/*"
            className={`hidden`}
            onChange={(file) => handleChangeAvatar(file)}
          />
          <div className="relative">
            <img
              src={imageUrl ? imageUrl : avatarDefault}
              crossOrigin="anonymous"
              alt=""
              className={`${styles.avatar_profile}`}
            />
            <Tooltip title="Xóa ảnh đại diện">
              <div className={`${styles.icon_profile} md:top-[110px] s:top-[86px]`} onClick={handleChangeInputAvatar}>
                <InlineSVG src={Close} alt="" className={`w-3.5 h-3.5`} />
              </div>
            </Tooltip>
            <Tooltip title="Chỉnh sửa ảnh đại diện">
              <label className={`${styles.icon_profile} top-[-12px]`} htmlFor="imageUpload">
                <InlineSVG src={IconEditAvatar} alt="" className={`w-3.5 h-3.5`} />
              </label>
            </Tooltip>
          </div>
        </div>
        {errorInformation && errorInformation.avatar && (
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInformation.avatar}
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Tên tài khoản <span className={'required'}>*</span>
        </div>
        <Input
          className={`main-input ${errorInformation && errorInformation?.name?.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập tên tài khoản'}
          value={infoProfile.name}
          onChange={(e) => handleChangeInput(e, 'name')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {errorInformation && errorInformation?.name?.length > 0 ? (
          <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
            {errorInformation?.name}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap text-[#a8a8a8]'}>
          Email <span className={'required'}></span>
        </div>
        <Input
          className={`main-input ${errorInformation && errorInformation?.email?.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập tên tài khoản'}
          value={infoProfile.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          onKeyDown={(e) => handleKeyDown(e)}
          disabled={true}
        />
        {errorInformation && errorInformation?.email?.length > 0 ? (
          <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
            {errorInformation?.email}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>Số điện thoại</div>
        <Input
          className={`main-input`}
          placeholder={'Nhập số diện thoại'}
          value={infoProfile.phone}
          onChange={(e) => handleChangeInput(e, 'phone')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {errorInformation && errorInformation?.phone?.length > 0 ? (
          <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
            {errorInformation?.phone}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Địa chỉ <span className={'required'}></span>
        </div>
        <Input
          className={`main-input ${errorInformation && errorInformation?.address?.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập địa chỉ'}
          value={infoProfile.address}
          onChange={(e) => handleChangeInput(e, 'address')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {errorInformation && errorInformation?.address?.length > 0 ? (
          <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
            {errorInformation?.address}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>Giới tính</div>

        <Radio.Group onChange={(e) => handleChangeInput(e, 'gender')} value={infoProfile.gender}>
          <Space>
            <Radio value={GENDER_USER.MALE}>Nam</Radio>
            <Radio value={GENDER_USER.FEMALE}>Nữ</Radio>
            <Radio value={GENDER_USER.OTHER}>Khác</Radio>
          </Space>
        </Radio.Group>
        {errorInformation && errorInformation?.gender?.length > 0 ? (
          <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="auto" />
            </div>
            {errorInformation?.gender}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className={`flex justify-center`}>
        <Button
          loading={isLoadingBtnInformation}
          type="primary"
          size={'large'}
          className={`main-btn-primary !w-auto mt-[15px]`}
          onClick={() => handleConfirmUpdateInformation()}
        >
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
}
