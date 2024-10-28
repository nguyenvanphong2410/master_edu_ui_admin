import React, { useState } from 'react';
import { Button, Col, Radio, Row, Space } from 'antd';
import styles from './style.module.scss';
import { FieldTimeOutlined, HighlightOutlined, PicLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import { setClassRegisterOfCourse } from '@/states/modules/package';
import { dayjsFormatSort, formatMoney } from '@/utils/helper';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { setCourseSelectedToOrder } from '@/states/modules/order';

const InfoDetailsDocForUser = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const courseDetails = useSelector((state) => state.detailsCourse.courseDetails);
  // const authUser = useSelector((state) => state.auth.authUser);

  // const [selectedClassId, setSelectedClassId] = useState(null);

  // const handleChangeRadioSelectClass = (classId) => {
  //   setSelectedClassId(classId);
  //   dispatch(setClassRegisterOfCourse(classId));
  // };

  // const handleClickRegisterCourse = (courseDetails) => {
  //   navigate('/order');
  //   dispatch(setCourseSelectedToOrder(courseDetails));
  // };

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Mã khóa học:
            </span>
            <span className={styles.info}>{courseDetails?.code}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <FieldTimeOutlined />
            </span>
            <span className={styles.info}>{dayjsFormatSort(courseDetails?.created_at)}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={`${styles.infoItem} flex`}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Giá:
            </span>
            <div className="text-[13px] font-normal block ml-1">
              <del className="text-[#bb2a2a] italic">{formatMoney(courseDetails.original_price)}</del> |{' '}
              <span className="text-green-45 font-bold">{formatMoney(courseDetails.current_price)}</span>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <FieldTimeOutlined /> Thời gian học:
            </span>
            <span className={`${styles.content} ml-1`}>
              {moment(courseDetails.start_time).format('DD/MM/YYYY')} - {moment(courseDetails.end_time).format('DD/MM/YYYY')}
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            {/* {!authUser.userPackages.some((itemPkg) => itemPkg?._id === courseDetails?._id) && (
              <div className={`${styles.infoItem}`}>
                <span className={styles.titleOrigin}>
                  <HighlightOutlined /> Lớp
                </span>
                <span className={`${styles.nameField}`}></span>
                <Radio.Group
                  className="ml-[20px]"
                  onChange={(e) => handleChangeRadioSelectClass(e.target.value)}
                  value={selectedClassId}
                >
                  <Space direction="vertical">
                    {courseDetails?.classes?.map((classItem) => (
                      <Radio key={classItem?._id} value={classItem?._id}>
                        {classItem?.name}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            )} */}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          {/* <div className={styles.infoItem}>
            {!authUser.userPackages.some((itemPkg) => itemPkg?._id === courseDetails?._id) && selectedClassId && (
              <Button
                type="primary"
                size="large"
                className="main-btn-primary-register"
                onClick={() => handleClickRegisterCourse(courseDetails)}
              >
                Đăng ký ngay
              </Button>
            )}
          </div> */}
        </Col>
      </Row>
    </>
  );
};

export default InfoDetailsDocForUser;
