import { useSelector } from 'react-redux';
import styles from './styles.module.scss';


import { Col, Row } from 'antd';

import InfoDetailsDocForUser from './InfoDetailsDocForUser';
import PageError from '@/components/Error';
import { PAGE_ERROR } from '@/utils/constants';
import CommentForUser from './CommentForUser';
import MainLayout from '@/layouts/MainLayout';

function DetailsCourse() {

  const courseDetails = useSelector((state) => state.detailsCourse.courseDetails);

  return (
    <MainLayout>
      {!courseDetails._id ? (
        <PageError type={PAGE_ERROR.NOT_FOUND} title={'Không tìm thấy kết quả bạn yêu cầu !'} />
      ) : (
        <div className={`${styles.detailsDocForUser}`}>
          <div className={`${styles.nameDetails}`}>{courseDetails?.name}</div>
          <Row gutter={20}>
            <Col sm={24} xs={24}>
              <div className={`${styles.colFirstWrap}`}>

                <div className={`${styles.viewPdf}`}>
                  <div className={styles.pdfContainer}>
                <InfoDetailsDocForUser />
                  <p className="text-des" dangerouslySetInnerHTML={{ __html: courseDetails?.description }}></p>

                  </div>
                </div>
                <div className={`${styles.imgShow}`}>
                  {courseDetails?.images?.map((item, index) => (
                    <>
                      <img src={item ? item : ''} alt="img" key={index} />
                    </>
                  ))}
                </div>

                <CommentForUser />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </MainLayout>
  );
}

export default DetailsCourse;
