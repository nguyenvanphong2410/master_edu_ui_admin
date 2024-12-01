import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import styles from './styles.module.scss';
import Handle from './handle';
import { Button, Divider, Input, InputNumber, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { updateConfigService } from './schema';
import IconInfo from '@/assets/images/icons/duotone/circle-info.svg';
import { hasPermission } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/constants';

function ConfigService() {
  const {
    infoConfigServices,
    errorInfoConfigServices,
    configServiceNames,
    handleFocus,
    handleChangeInputInfo,
    handleSubmit,
  } = Handle();

  return (
    <MainLayout>
      <div className={styles.generalWrap}>
        <div className="border-b flex justify-between items-center">
          <h2 className="text-lg font-bold pb-3">Dịch vụ</h2>
          <div className="pb-3">
          {
            hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_SERVICE_INFORMATION]) && <Button
              onClick={() => handleSubmit(updateConfigService, infoConfigServices)}
              className={`main-btn-primary`}
              size={'large'}
            >
              Lưu
            </Button>
          }
          
          </div>
        </div>
        <div className={styles.content}>
          {infoConfigServices?.config_services?.map((item, index) => {
            return (
              <div className="px-5" key={index}>
                <div className="mt-10">
                  <Divider>{configServiceNames[index].name ? configServiceNames[index].name : <i>Đang cập nhật</i>}</Divider>
                </div>
                <div className={`input-wrap`}>
                  <div className={'label-wrap'}>
                    Tên dịch vụ <span className={'required'}>*</span>
                  </div>
                  <Input
                    disabled={!hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_SERVICE_INFORMATION])}
                    className={`main-input`}
                    placeholder={'Nhập tên dịch vụ'}
                    value={item?.name}
                    onFocus={() => handleFocus(`config_services.${index}.name`)}
                    onChange={(e) => handleChangeInputInfo(e.target.value, 'name', index)}
                  />
                  {errorInfoConfigServices && errorInfoConfigServices[`config_services.${index}.name`] && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      <span>{errorInfoConfigServices[`config_services.${index}.name`]}</span>
                    </span>
                  )}
                </div>

                <div className={`input-wrap`}>
                  <div className={'label-wrap flex items-center'}>
                    Điểm <span className={'required'}>*</span>
                    <Tooltip title="Số điểm trừ khi sử dụng dịch vụ."><InlineSVG className='inline-block ml-[5px]' src={IconInfo} width={14} height={14} /></Tooltip>
                  </div>
                  <InputNumber
                    disabled={!hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_SERVICE_INFORMATION])}
                    min={0}
                    className={`main-input w-full`}
                    placeholder={'Nhập điểm'}
                    value={item.point}
                    onFocus={() => handleFocus(`config_services.${index}.point`)}
                    onChange={(value) => handleChangeInputInfo(value === null ? '' : value, 'point', index)}
                  />
                  {errorInfoConfigServices && errorInfoConfigServices[`config_services.${index}.point`] && (
                    <span className={`error`}>
                      <div className={`icon`}>
                        <InlineSVG src={IconWarning} width={14} height={14} />
                      </div>
                      <span>{errorInfoConfigServices[`config_services.${index}.point`]}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end"></div>
      </div>
    </MainLayout>
  );
}

export default ConfigService;
