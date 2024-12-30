import React from 'react';
import {Button, Modal, Row, Col} from "antd";
import styles from './styles.module.scss';
import CircleXmark from "@/assets/images/icons/light/circle-xmark.svg";
import CircleCheck from "@/assets/images/icons/light/circle-check.svg";
import InlineSVG from "react-inlinesvg";
import {ORDER_STATUS} from "@/utils/constants.js";
import {formatMoney} from "@/utils/helper.js";

export default function ModalChangeStatusOrder(props) {
  const {
    isModalOpen, loading, title, contentBtn,
    handleOk, handleCancel, handleConfirm,
    type, orderData
  } = props;
  return(
    <Modal
      className={`general-dialog-wrap`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      closable={false}
      centered
    >
      <div className={styles.mainWrap}>
        <div className={'py-[20px] mb-[5px]'}>
          {
            type === ORDER_STATUS['COMPLETED'] ?
              <InlineSVG className={'fill-green-55'} src={CircleCheck} width={70} height="auto" /> :
              <InlineSVG className={'fill-red-55'} src={CircleXmark} width={70} height="auto" />
          }
        </div>
        <div className={'mb-[20px] text-center w-full'}>
          <div className={`text-lg`}>{title}</div>
          <Row className={`mt-5 px-10`}>
            <Col span={12} className={`font-bold text-left py-3 border-b`}>Mã giao dịch</Col>
            <Col span={12} className={`text-right border-b py-3`}>{orderData.code}</Col>
            <Col span={12} className={`font-bold text-left py-3 border-b`}>Khóa học</Col>
            <Col span={12} className={`text-right border-b py-3`}>{orderData.course_name}</Col>
            <Col span={12} className={`font-bold text-left py-3`}>Tổng tiền</Col>
            <Col span={12} className={`text-right py-3`}>{formatMoney(orderData.course_current_price)}</Col>
          </Row>
        </div>
        <div className={'flex justify-center mb-[20px]'}>
          <Button
            className={`main-btn-close mx-[5px]`}
            size={'large'}
            onClick={() => handleCancel()}
          >
            Đóng
          </Button>
          <Button
            loading={loading}
            className={`main-btn-confirm`}
            size={'large'}
            onClick={() => handleConfirm()}
          >
            {contentBtn}
          </Button>
        </div>
      </div>
    </Modal>
  );
}