import { Tabs } from "antd";
import MainLayout from "../../layouts/MainLayout";
import styles from './styles.module.scss'
import React from "react";
import SearchHistory from "./SearchHistory";
import PointDepositHistory from "./PointDepositHistory";

export default function CustomerDetail() {
  const items = [
    {
      key: '1',
      label: 'Lịch sử tra cứu',
      children: <SearchHistory />,
    },
    {
      key: '2',
      label: 'Lịch sử mua khóa học',
      children: <PointDepositHistory />,
    },
  ];

  return (
    <MainLayout>
      <Tabs 
        defaultActiveKey="1" 
        items={items}
        className={`${styles.infoTab}`}
      />
    </MainLayout>
  )
}