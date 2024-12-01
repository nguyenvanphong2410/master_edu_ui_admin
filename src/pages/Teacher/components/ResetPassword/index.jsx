import React from 'react';
import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../assets/images/icons/light/warning.svg";
import Handle from "./handle.js";

export default function CreateOrUpdate(props) {
  const { closeModal } = props;
  const {
    dataResetPassword,
    errorResetPassword,
    isLoadingBtnResetPassword,
    handleChangeInput,
    handleConfirmReset,
    handleFocus
  } = Handle(props);

  return(
    <div>
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Mật khẩu mới <span className={'required'}>*</span>
        </div>
        <Input.Password
          className={`main-input`}
          placeholder={'Nhập mật khẩu'}
          value={dataResetPassword.password}
          onFocus={() => handleFocus('password')}
          onChange={(e) => handleChangeInput(e, 'password')}
        />
        {
          errorResetPassword && errorResetPassword.password.length > 0 ?
            <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
              {errorResetPassword.password}
            </span> : ''
        }
      </div>
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Xác nhận mật khẩu mới <span className={'required'}>*</span>
        </div>
        <Input.Password
          className={`main-input`}
          placeholder={'Xác nhận mật khẩu'}
          value={dataResetPassword.confirmPassword}
          onFocus={() => handleFocus('confirmPassword')}
          onChange={(e) => handleChangeInput(e, 'confirmPassword')}
        />
        {
          errorResetPassword && errorResetPassword.confirmPassword.length > 0 ?
            <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
              {errorResetPassword.confirmPassword}
            </span> : ''
        }
      </div>
      <div className={`flex justify-center`}>
        <Button
          className={`main-btn-close mr-[10px]`}
          size={'large'}
          onClick={() => closeModal()}>
          Đóng
        </Button>
        <Button
          className={`main-btn-primary`}
          size={'large'}
          loading={isLoadingBtnResetPassword}
          onClick={() => handleConfirmReset()}>
          Cập nhật
        </Button>
      </div>
    </div>

  )
}
