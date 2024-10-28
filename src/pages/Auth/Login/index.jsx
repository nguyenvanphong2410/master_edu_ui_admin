import React from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import { Button, Flex, Input } from "antd";
import styles from './styles.module.scss';
import IconWarning from "../../../assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import Handle from "./handle.js";

function Login() {
  const {
    navigate, datFormLogin, errorLogin, isLoadingBtnLogin,
    handleChangeInput, handleKeyDown, handleConfirmLogin
  } = Handle();

  return (
    <AuthLayout title={'Đăng nhập'} description={'Hệ thống Master Edu'}>
      <div className={`input-wrap`}>
        <Input
          className={`base-input ${errorLogin && errorLogin.email?.length > 0 ? 'error-input' : ''}`}
          placeholder={'Email'}
          value={datFormLogin?.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {
          errorLogin && errorLogin.email && errorLogin.email?.length > 0 ?
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height="auto" />
              </div>
              {errorLogin.email}
            </span> : ''
        }
      </div>

      <div className={`input-wrap mt-5`}>
        <Input.Password
          className={`base-input !pt-[9px] !pb-[9px] ${errorLogin && errorLogin.password && errorLogin.password.length > 0 ? 'error-input' : ''}`}
          placeholder={'Mật khẩu'}
          value={datFormLogin.password}
          onChange={(e) => handleChangeInput(e, 'password')}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          errorLogin && errorLogin.password && errorLogin.password.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height="auto" />
              </div>
              {errorLogin.password}
            </span> : ''
        }
      </div>

      <Flex vertical gap="small">
        <Button
          loading={isLoadingBtnLogin}
          type="primary"
          onClick={() => handleConfirmLogin()}
          size={'large'}
          className={`main-btn-primary`}
          block
        >Đăng nhập
        </Button>
      </Flex>

    </AuthLayout>
  );
}

export default Login;
