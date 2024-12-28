import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import styles from './styles.module.scss';
import './styles.scss';
import { Button, Divider, Input, Tooltip, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Delete from '../../assets/images/icons/duotone/trash-can.svg';
import InlineSVG from 'react-inlinesvg';
import Handle from './handle';
import { updateConfigContactSchema } from './schema';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { hasPermission } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/constants';

function ConfigContact() {
  const {
    listContact,
    isLoadingUpdateConfigContact,
    addContact,
    removeContact,
    handleChangeImg,
    beforeUpload,
    onChangeLink,
    onChangeInput,
    handleUpdateContact,
    errorContact,
    onFocusInput,
  } = Handle();

  const uploadButton = (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 0,
        background: 'none',
        marginLeft: -2,
      }}
      type="button"
    >
      <PlusOutlined />
    </button>
  );

  return (
    <MainLayout>
      <div className={styles.configContactWrap}>
        <div>
          <div className="pb-3 border-b mb-10 flex justify-between items-center">
            <span className="text-lg font-bold">Liên hệ</span>
            {hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_CONTACT]) && (
              <Button
                className={`main-btn-primary`}
                size={'small'}
                onClick={() => handleUpdateContact(updateConfigContactSchema, listContact)}
                loading={isLoadingUpdateConfigContact}
              >
                Lưu
              </Button>
            )}
          </div>

          <div className="px-5">
            <Divider>Cấu hình email và số điện thoại</Divider>
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Email <span className={'required'}>*</span>
              </div>
              <Input
                className={`main-input`}
                placeholder={'Nhập email liên hệ'}
                value={listContact.email}
                onChange={(e) => onChangeInput(e.target.value, 'email')}
                onFocus={() => onFocusInput('email')}
              />
              {errorContact && errorContact.email && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  <span>{errorContact.email}</span>
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Số điện thoại <span className={'required'}>*</span>
              </div>
              <Input
                className={`main-input`}
                placeholder={'Nhập số điện thoại liên hệ'}
                value={listContact.phone}
                onChange={(e) => onChangeInput(e.target.value, 'phone')}
                onFocus={() => onFocusInput('phone')}
              />
              {errorContact && errorContact.phone && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  <span>{errorContact.phone}</span>
                </span>
              )}
            </div>
          </div>

          <div className="px-5 mt-16 text-center">
            <Divider>Cấu hình mạng xã hội</Divider>
            {listContact?.socials?.map((contact, index) => (
              <div className={`input-wrap`} key={index}>
                <div className={'label-wrap text-left'}>
                  Mạng xã hội {index + 1} <span className={'required'}>*</span>
                </div>
                <div className={styles.contactWrap}>
                  <Tooltip placement="bottom" title="Tải ảnh lên">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="contact-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={(info) => {
                        handleChangeImg(info, index, 'icon');
                      }}
                      onClick={() => onFocusInput('icon', index)}
                      customRequest={() => {}}
                    >
                      {contact.icon ? (
                        <img
                          src={contact.iconUrl ? contact.iconUrl : contact.icon}
                          alt="avatar"
                          style={{
                            width: '80%',
                            height: 'auto',
                            maxHeight: '90%',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Tooltip>
                  <Input
                    className={`main-input`}
                    placeholder={'Nhập liên kết'}
                    value={contact.link}
                    onChange={(e) => onChangeLink(e.target.value, index, 'link')}
                    onFocus={() => onFocusInput('link', index)}
                  />

                  <Tooltip placement="bottom" title={'Xóa'}>
                    <div className='btn-table-action'>
                      <div
                        className={`btn-delete cursor-pointer ${styles.btnDelete}`}
                        onClick={() => removeContact(index)}
                      >
                        <InlineSVG src={Delete} width={14} />
                      </div>
                    </div>
                  </Tooltip>
                </div>
                {errorContact && errorContact[`socials.${index}.icon`] && (
                  <span className={`error`}>
                    <div className={`icon`}>
                      <InlineSVG src={IconWarning} width={14} height={14} />
                    </div>
                    <span>{errorContact[`socials.${index}.icon`]}</span>
                  </span>
                )}
                {errorContact && errorContact[`socials.${index}.link`] && (
                  <span className={`error`}>
                    <div className={`icon`}>
                      <InlineSVG src={IconWarning} width={14} height={14} />
                    </div>
                    <span>{errorContact[`socials.${index}.link`]}</span>
                  </span>
                )}
              </div>
            ))}
            <Button className="main-btn-primary" size={'large'} onClick={addContact} icon={<PlusOutlined />}>
              Thêm mạng xã hội
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ConfigContact;
