import React from 'react';
import { Button, Col, Input, Radio, Row, Space, Switch, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../../../assets/images/icons/light/warning.svg';
import Handle from './handle.js';
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg';
import Close from '@/assets/images/icons/duotone/xmark.svg';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import { GENDER_USER, TYPE_SUBMIT } from '@/utils/constants';
import { setInForCustomer } from '@/states/modules/customer';

export default function CreateOrUpdate(props) {
  const { closeModal } = props;
  const {
    configModal,
    inForCustomer,
    errorCreateOrUpdate,
    isLoadingBtnCreateOrUpdate,
    dispatch,
    handleChangeInput,
    handleChangeSwitch,
    handleConfirm,
    handleFocus,
    handleChangeAvatar,
  } = Handle(props);

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
                onClick={() => dispatch(setInForCustomer({ ...inForCustomer, avatarUrl: '', avatar: 'delete' }))}
              >
                <InlineSVG src={Close} alt="" className={`icon-action`} />
              </div>
            </Tooltip>
            <div className={`relative`}>
              <img
                src={inForCustomer.avatarUrl ? inForCustomer.avatarUrl : avatarDefault}
                crossOrigin="anonymous"
                alt=""
                className={`img-avt`}
              />
            </div>
          </div>
          <div className="layout-info">
            <Row gutter={20}>
              <Col sm={12} xs={24}>
                <div className={`input-wrap`}>
                  <div className={'label-wrap'}>
                    Họ và tên <span className={'required'}>*</span>
                  </div>
                  <Input
                    className={`main-input`}
                    placeholder={'Nhập họ và tên'}
                    value={inForCustomer.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInput(e, 'name')}
                  />
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
                  <Input
                    className={`main-input`}
                    placeholder={'Nhập email'}
                    value={inForCustomer.email}
                    onFocus={() => handleFocus('email')}
                    onChange={(e) => handleChangeInput(e, 'email')}
                  />
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

                {configModal.type === TYPE_SUBMIT.UPDATE ? (
                  <div className={`input-wrap`}>
                    <div className={'label-wrap'}>Địa chỉ</div>
                    <Input
                      className={`main-input`}
                      placeholder={'Nhập địa chỉ'}
                      value={inForCustomer.address}
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
                ) : (
                  ''
                )}

                {configModal.type === TYPE_SUBMIT.CREATE ? (
                  <div className={`input-wrap`}>
                    <div className={'label-wrap'}>
                      Mật khẩu <span className={'required'}>*</span>
                    </div>
                    <Input.Password
                      className={`main-input`}
                      placeholder={'Nhập mật khẩu'}
                      value={inForCustomer.password}
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
                
                <div className={`input-wrap !mb-[15px]`}>
                  <div className={'label-wrap'}>Trạng thái</div>
                  <Switch
                    className={`main-switch`}
                    checked={inForCustomer.status}
                    onChange={(e) => handleChangeSwitch(e, 'status')}
                  />
                </div>
              </Col>
              <Col sm={12} xs={24}>
                <div className={`input-wrap`}>
                  <div className={'label-wrap'}>
                    Số điện thoại <span className={'required'}>*</span>
                  </div>

                  <Input
                    className={`main-input`}
                    placeholder={'Nhập số điện thoại'}
                    value={inForCustomer.phone}
                    onFocus={() => handleFocus('phone')}
                    onChange={(e) => handleChangeInput(e, 'phone')}
                  />
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
                    value={inForCustomer.address}
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
                  <div className={'label-wrap'}>Giới tính</div>

                  <Radio.Group onChange={(e) => handleChangeInput(e, 'gender')} value={inForCustomer.gender} className='mt-3'>
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
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={`flex justify-center`}>
        <Button 
          className={`main-btn-close mr-[10px]`} 
          size={'large'} 
          onClick={() => closeModal()}
        >
          Đóng
        </Button>
        {configModal.type === TYPE_SUBMIT.CREATE ? (
          <Button
            className={`main-btn-primary`}
            size={'large'}
            loading={isLoadingBtnCreateOrUpdate}
            onClick={() => handleConfirm(TYPE_SUBMIT.CREATE, inForCustomer)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            className={`main-btn-primary`}
            size={'large'}
            loading={isLoadingBtnCreateOrUpdate}
            onClick={() => handleConfirm(TYPE_SUBMIT.UPDATE, inForCustomer)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}
