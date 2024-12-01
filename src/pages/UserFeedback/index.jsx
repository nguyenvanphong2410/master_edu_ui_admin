import MainLayout from '@/layouts/MainLayout';
import styles from './styles.module.scss';

import React from 'react';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import ModalDefault from '@/components/Modal';
import ModalDeleteDefault from '@/components/ModalDelete';
import Handle from './handle';
import { PERMISSIONS, TYPE_MODAL_FEEDBACK } from '@/utils/constants';
import InlineSVG from 'react-inlinesvg';
import IconEdit from '../../assets/images/icons/duotone/pencil.svg';
import IconDelete from '../../assets/images/icons/duotone/trash-can.svg';
import ModalCreateOrUpdateFeedback from './ModalCreateOrUpdateFeedback';
import { hasPermission } from '@/utils/helper';
import PlusIcon from '@/assets/images/icons/light/plus.svg';

const UserFeedbackManagement = () => {
  const {
    handleShowModalCreateFeedback,
    visibleModalCreateOrUpdateFeedback,
    handleCancelModalCreateOrUpdateFeedback,
    configModalFeedback,
    infoFeedback,
    visibleModalDeleteFeedback,
    handleCancelModalDeleteFeedback,
    handleSubmitDeleteFeedback,
    isLoadingBtnDelete,
    feedbacks,
    handleShowModalUpdateFeedback,
    handleShowModalDeleteFeedback,
  } = Handle();
  return (
    <MainLayout>
      <section className={styles.listWrap}>
        {hasPermission([PERMISSIONS.ADD.ADD_CONFIG_FEEDBACK]) && (
          <Button
            icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
            className={`main-btn-primary flex items-center absolute top-[33px] right-[22px]`}
            size={'large'}
            onClick={() => handleShowModalCreateFeedback(TYPE_MODAL_FEEDBACK.CREATE)}
          >
            Tạo mới
          </Button>
        )}

        <Row gutter={{ xs: 20, sm: 20, md: 20, lg: 20, xl: 20, xxl: 20 }}>
          {feedbacks.map((item) => (
            <Col className="gutter-row mt-[18px]" key={item._id} span={6}>
              <Card
                className={`${styles.feedbackCard} main-card-course`}
                title={
                  <div
                    className="flex flex-col items-center bg-cover h-[130px]"
                    style={{ backgroundImage: `url(${item.cover.url})`, borderRadius: '8px 8px 0 0' }}
                  >
                    <div className="flex flex-col items-center absolute top-[60px]">
                      <img
                        className="w-[100px] h-[100px] object-cover rounded-[50%]"
                        src={item.avatar.url}
                        alt={item.name}
                      />
                      <p className="text-center mt-3">{item.name}</p>
                    </div>
                  </div>
                }
                actions={(() => {
                  const result = [];
                  if (hasPermission([PERMISSIONS.EDIT.EDIT_CONFIG_FEEDBACK])) {
                    result.push(
                      <Tooltip key="edit" placement="bottom" title={'Cập nhật'}>
                        <div className="btn-table-action">
                          <div
                            className="btn-edit"
                            onClick={() => handleShowModalUpdateFeedback(item, TYPE_MODAL_FEEDBACK.UPDATE)}
                          >
                            <InlineSVG src={IconEdit} width={18} height={20} />
                          </div>
                        </div>
                      </Tooltip>
                    );
                  }
                  if (hasPermission([PERMISSIONS.DELETE.DELETE_CONFIG_FEEDBACK])) {
                    result.push(
                      <Tooltip key="delete" placement="bottom" title={'Xoá'}>
                        <div className="btn-table-action">
                          <div className="btn-delete" onClick={() => handleShowModalDeleteFeedback(item)}>
                            <InlineSVG src={IconDelete} width={16} height={20} />
                          </div>
                        </div>
                      </Tooltip>
                    );
                  }
                  return result;
                })()}
              >
                <div className="h-100 mt-[60px]" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <ModalDefault
        isModalOpen={visibleModalCreateOrUpdateFeedback}
        handleCancel={handleCancelModalCreateOrUpdateFeedback}
        title={configModalFeedback.title}
      >
        <ModalCreateOrUpdateFeedback />
      </ModalDefault>

      <ModalDeleteDefault
        content={
          <span>
            Bạn có chắc chắn muốn xóa nhận xét của <strong>{infoFeedback?.name}</strong> không?
          </span>
        }
        contentBtn={'Xóa nhận xét'}
        isModalOpen={visibleModalDeleteFeedback}
        handleCancel={handleCancelModalDeleteFeedback}
        handleConfirm={handleSubmitDeleteFeedback}
        loading={isLoadingBtnDelete}
      />
    </MainLayout>
  );
};

export default UserFeedbackManagement;
