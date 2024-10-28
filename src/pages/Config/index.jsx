import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import Bank from './components/Bank/index.jsx';
import { hasPermission } from '@/utils/helper.js';
import { PERMISSIONS } from '@/utils/constants.js';

function Home() {
  return (
    <MainLayout>
      <div className={styles.generalWrap}>
        <Row gutter={10} className="h-full justify-center">
          {hasPermission([PERMISSIONS.LIST.LIST_CONFIG_BANK]) && (
            <Col span={12}>
              <Bank />
            </Col>
          )}
        </Row>
      </div>
    </MainLayout>
  );
}

export default Home;
