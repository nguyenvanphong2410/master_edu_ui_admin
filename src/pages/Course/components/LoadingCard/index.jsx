import React, { useEffect, useState } from 'react';
import {Row, Col, Skeleton} from 'antd';

function LoadingCard() {
  const [countLoading, setCountLoading] = useState(2);

  useEffect(() => {
		if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
			setCountLoading(2)
		}

    if (window.innerWidth >= 576 && window.innerWidth <= 768) {
			setCountLoading(2)
		}

    if (window.innerWidth <= 576 ) {
			setCountLoading(1)
		}
	}, [])

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < countLoading; i++) {
      skeletons.push(
        <Col key={i} lg={12} md={12} sm={12} xs={24}>
          <Row className='flex items-center'>
            <Col className='flex flex-col' span={15}>
              <Skeleton.Input active={true} size={15}/>
              <Skeleton.Input active={true} size={12}/>
            </Col>
            <Col span={9} className='lg:!flex lg:!items-center lg:!justify-end md:!hidden xs:!hidden'>
              <Skeleton.Input active={true} size={10} />
            </Col>
          </Row>
          <Skeleton active/>
        </Col>
      );
    }
    return skeletons;
  };
  
  return (
    <>
      <Row gutter={20} className='mt-[75px]'>
        {renderSkeletons()}
      </Row>
    </>
  );
}

export default LoadingCard;
