import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import iconLink from '@/assets/images/icons/duotone/link.svg';
import iconContact from '@/assets/images/icons/duotone/contact.svg';
import iconReview from '@/assets/images/icons/duotone/customer-review.svg';
import InlineSVG from 'react-inlinesvg';
import { hasPermission } from '@/utils/helper.js';
import { PERMISSIONS } from '@/utils/constants.js';

export default function GeneralConfiguration() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className={styles.generalConfigurationWrap}>
        <div className={styles.general}>
          {hasPermission([
            PERMISSIONS.LIST.LIST_CONFIG_BANK,
            PERMISSIONS.LIST.LIST_CONFIG_CONTACT,
            PERMISSIONS.LIST.LIST_CONFIG_FEEDBACK,
          ]) && (
            <div className={styles.configWrap} onClick={() => navigate('link')}>
              <div className={styles.svg}>
                <InlineSVG src={iconLink} />
              </div>

              <div className={styles.content}>
                <label> Cấu hình ngân hàng</label>
                <p>Quản lý cấu hình thanh toán với ngân hàng </p>
              </div>
            </div>
          )}

            {hasPermission([PERMISSIONS.LIST.LIST_CONFIG_CONTACT]) && (
          <div className={styles.configWrap} onClick={() => navigate('contact')}>
            <div className={styles.svg}>
              <InlineSVG src={iconContact} />
            </div>
            <div className={styles.content}>
              <label> Cấu hình liên hệ</label>
              <p>Quản lý các thông tin liên hệ</p>
            </div>
          </div>
          )}
          {hasPermission([PERMISSIONS.LIST.LIST_CONFIG_FEEDBACK]) && (
            <div className={styles.configWrap} onClick={() => navigate('user-feedback')}>
              <div className={styles.svg}>
                <InlineSVG src={iconReview} />
              </div>
              <div className={styles.content}>
                <label>Nhận xét từ học viên</label>
                <p>Quản lý các nhận xét của học viên</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
