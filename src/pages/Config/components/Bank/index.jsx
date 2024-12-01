import { Button, Card, Input, Select } from 'antd';
import React from 'react';
import styles from '../../styles.module.scss';
import '../../styles.scss';
import Handle from '../../handle';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../../../assets/images/icons/light/warning.svg';
import { BANK_TEMPLATE_OPTIONS, CONFIG_TYPE, PERMISSIONS } from '../../../../utils/constants';
import { bankSchema } from '../../schema';
import { hasPermission } from '@/utils/helper';

function Bank() {
  const {
    updateInfoBank,
    errorInfoBank,
    optionTemplate,
    optionBank,
    handleFocus,
    handleChangeInputInfo,
    handleSubmit,
  } = Handle();

  return (
    <Card
      title="Tài khoản ngân hàng"
      extra={
        <>
          {hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_BANK]) && (
            <Button
              className={`main-btn-primary`}
              size={'small'}
              onClick={() => handleSubmit(CONFIG_TYPE.BANK, bankSchema, updateInfoBank)}
            >
              Lưu
            </Button>
          )}
        </>
      }
      className={`${styles.boxItem} h-full`}
    >
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Ngân hàng <span className={'required'}>*</span>
        </div>
        <Select
          className={`main-select w-full temmpalte-select`}
          placeholder={'Nhập ngân hàng'}
          value={updateInfoBank?.bank_id || null}
          onFocus={() => handleFocus(CONFIG_TYPE.BANK, 'bank_id')}
          onChange={(value) => handleChangeInputInfo(CONFIG_TYPE.BANK, value, 'bank_id')}
          options={optionBank}
          showSearch={true}
        />
        {errorInfoBank && errorInfoBank.bank_id && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoBank.bank_id}</span>
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Template <span className={'required'}>*</span>
        </div>
        <Select
          className={`main-select w-full temmpalte-select`}
          placeholder={'Chọn template'}
          defaultValue={BANK_TEMPLATE_OPTIONS.COMPACT2}
          value={updateInfoBank?.template}
          onFocus={() => handleFocus(CONFIG_TYPE.BANK, 'template')}
          onChange={(value) => handleChangeInputInfo(CONFIG_TYPE.BANK, value, 'template')}
          options={optionTemplate}
        />
        {errorInfoBank && errorInfoBank.template && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoBank.template}</span>
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Tên chủ sở hữu <span className={'required'}>*</span>
        </div>
        <Input
          className={`main-input`}
          placeholder={'Nhập tên chủ sở hữu'}
          value={updateInfoBank?.account_name}
          onFocus={() => handleFocus(CONFIG_TYPE.BANK, 'account_name')}
          onChange={(e) => handleChangeInputInfo(CONFIG_TYPE.BANK, e.target.value, 'account_name')}
        />
        {errorInfoBank && errorInfoBank.account_name && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoBank.account_name}</span>
          </span>
        )}
      </div>

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Số tài khoản <span className={'required'}>*</span>
        </div>
        <Input
          className={`main-input`}
          placeholder={'Nhập số tài khoản'}
          value={updateInfoBank?.account_no}
          onFocus={() => handleFocus(CONFIG_TYPE.BANK, 'account_no')}
          onChange={(e) => handleChangeInputInfo(CONFIG_TYPE.BANK, e.target.value, 'account_no')}
        />
        {errorInfoBank && errorInfoBank.account_no && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoBank.account_no}</span>
          </span>
        )}
      </div>
    </Card>
  );
}

export default Bank;
