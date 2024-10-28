import React from 'react';
import styles from './styles.module.scss';
import { Drawer, Tabs } from 'antd';
import Handle from './handle.js';
import Information from './components/Information';
import ChangePassword from './components/ChangePassword';
import InlineSVG from 'react-inlinesvg';
import Close from '@/assets/images/icons/duotone/times.svg';
import ImageUser from '@/assets/images/logos/user_default.png';
import { useNavigate } from 'react-router-dom';

function PopoverProfile() {
  const navigate = useNavigate();
  const {
    isShowInformation,
    setIsShowInformation,
    authUser,
    handleConfirmLogout,
    handleShowProfile,
    handleResetError,
  } = Handle();

  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: <Information handleResetError={() => handleResetError()} />,
    },
    {
      key: '2',
      label: 'Mật khẩu',
      children: <ChangePassword handleResetError={() => handleResetError()} />,
    },
  ];

  const handleClickMyCourse = () => {
    navigate('/my-courses');
  };

  return (
    <div className={styles.modalInfoWrap}>
      <div className={styles.personalInformationWrap}>
        <img className={styles.avtPopover} src={authUser.avatar ? authUser.avatar : ImageUser} alt="img avt" />
        <div className={styles.name}>{authUser.name}</div>
        <div className={styles.role}>{authUser.email || 'Chưa cập nhật'}</div>
      </div>
      <div className={styles.mainModalInfoWrap}>
        <ul className={styles.menuInfoWrap}>
          <li onClick={() => handleShowProfile()} className={`${styles.itemInfoWrap}`}>
            <div>
              <span className={styles.text}>Thông tin cá nhân</span>
            </div>
          </li>
          
          <li onClick={() => handleConfirmLogout()} className={styles.itemInfoWrap}>
            <div>
              <span className={styles.text}>Đăng xuất</span>
            </div>
          </li>
        </ul>
      </div>

      <Drawer
        title="Thông tin cá nhân"
        placement={'right'}
        closable={true}
        onClose={() => setIsShowInformation(false)}
        open={isShowInformation}
        key={'right'}
        width={520}
        closeIcon={<InlineSVG src={Close} />}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </div>
  );
}

export default PopoverProfile;
