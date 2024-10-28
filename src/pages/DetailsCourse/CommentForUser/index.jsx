import _ from 'lodash';
import {
  setErrorInfoComment,
  setInfoComment,
  setIsShowModalUpdateComment,
  setVisibleModalDeleteComment,
} from '@/states/modules/comment';
import {
  requestCommentByIdCourse,
  requestCreateComment,
  requestDeleteComment,
  requestUpdateComment,
} from '@/api/comment';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { Avatar, Button, Input, Popover, Tooltip } from 'antd';
import styles from './styles.module.scss';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import { DeleteOutlined, EditOutlined, FieldTimeOutlined, MoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalDefault from '@/components/Modal';
import { TYPE_SUBMIT } from '@/utils/constants';
import { validate } from '@/utils/validates/validate';
import { dayjsFormatFromNow } from '@/utils/helper';
import ModalDeleteDefault from '@/components/ModalDelete';

import shield from '@/assets/images/icons/solid/shield.svg';
import shieldExclamation from '@/assets/images/icons/solid/shield-exclamation.svg';
import teacher from '@/assets/images/icons/solid/chalkboard-user.svg';
import graduation from '@/assets/images/icons/solid/graduation.svg';
import InlineSVG from 'react-inlinesvg';

const CommentForUser = () => {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [idCommentSelected, setIdCommentSelected] = useState('');
  const infoComment = useSelector((state) => state.comment.infoComment);
  const errorInfoComment = useSelector((state) => state.comment.errorInfoComment);
  const isLoadingBtnCreateComment = useSelector((state) => state.comment.isLoadingBtnCreateComment);
  const isShowModalUpdateComment = useSelector((state) => state.comment.isShowModalUpdateComment);
  const isLoadingBtnUpdateComment = useSelector((state) => state.comment.isLoadingBtnUpdateComment);
  const visibleModalDeleteComment = useSelector((state) => state.comment.visibleModalDeleteComment);
  const isLoadingBtnDeleteComment = useSelector((state) => state.comment.isLoadingBtnDeleteComment);

  const authUser = useSelector((state) => state.auth.authUser);
  const courseDetails = useSelector((state) => state.detailsCourse.courseDetails);

  const listComment = useSelector((state) => state.comment.listComment);
  const [itemDelete, setItemDelete] = useState(null);

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoComment);
    dataError[type] = '';
    dispatch(setErrorInfoComment(dataError));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoComment);
    let dataError = _.cloneDeep(errorInfoComment);
    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoComment({ ...data }));
    dispatch(setErrorInfoComment(dataError));
  };

  const handleSubmit = (type, scheme, dataComment) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataComment, {
        onSuccess: (data) => dispatch(requestCreateComment(data, courseDetails._id)),
        onError: (error) => dispatch(setErrorInfoComment(error)),
      });
    }
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataComment, {
        onSuccess: (data) => dispatch(requestUpdateComment(idCommentSelected, data)),
        onError: (error) => dispatch(setErrorInfoComment(error)),
      });
    }
  };

  const handleCancelModalUpdateComment = () => {
    dispatch(setErrorInfoComment({ content: '' }));
    dispatch(setInfoComment({ content: '' }));
    dispatch(setIsShowModalUpdateComment(false));
  };

  const handleShowModalUpdateComment = (item) => {
    setIdCommentSelected(item._id);
    dispatch(setIsShowModalUpdateComment(true));
    dispatch(setInfoComment({ content: item.content }));
  };

  const handleShowModalDeleteComment = (item) => {
    dispatch(setVisibleModalDeleteComment(true));
    setItemDelete(item);
  };

  const handleConfirmDelete = () => {
    dispatch(requestDeleteComment(itemDelete._id));
  };

  const commentSchema = Joi.object({
    content: Joi.string().trim().max(1000).label('Nội dung bình luận'),
  });

  const handleDisplayTypeUser = (user_type, protectedValue, is_admin) => {
    console.log(
      '🌈 ~ handleDisplayTypeUser ~ user_type, protectedValue, is_admin:',
      user_type,
      protectedValue,
      is_admin
    );
    if (protectedValue === 1 && is_admin === null && user_type === null) {
      return (
        <Tooltip title="SuperAdmin">
          <InlineSVG src={shieldExclamation} className="ml-1 mt-[2px]w-4 h-4 text-red-45" />
        </Tooltip>
      );
    } else if (protectedValue === null && is_admin === true && user_type === 'ADMIN') {
      return (
        <Tooltip title="Quản trị viên">
          <InlineSVG src={shield} className="ml-1 mt-[2px]w-4 h-4 text-blue-500" />
        </Tooltip>
      );
    } else if (protectedValue === null && is_admin === null && user_type === 'TEACHER') {
      return (
        <Tooltip title="Giáo viên">
          <InlineSVG src={teacher} className="ml-1 mt-[2px]w-4 h-4 text-yellow-500" />
        </Tooltip>
      );
    } else if (protectedValue === null && is_admin === null && user_type === null) {
      return (
        <Tooltip title="Học viên">
          <InlineSVG src={graduation} className="ml-1 mt-[2px]w-4 h-4 text-gray-500" />
        </Tooltip>
      );
    }
  };

  useEffect(() => {
    dispatch(requestCommentByIdCourse(courseDetails._id));
  }, [courseDetails._id]);

  return (
    <>
      <div className={`${styles.commentTitle}`}>Bình luận về khóa học</div>
      <div className={`${styles.commentWrap}`}>
        {listComment?.comment?.map((item, index) => (
          <>
            <div className={`flex mt-3`}>
              <Avatar
                className={`avatar-user shadow`}
                crossOrigin="anonymous"
                src={item.avatar ? item.avatar : avatarDefault}
                key={index}
              />
              <div className={`mt-1 ml-[10px] font-medium ${styles.commentText}`}>
                <div className={`${styles.nameUserComment}`}>
                  <div className="flex">
                    {item.name}
                    {handleDisplayTypeUser(item.user_type, item.protected, item.is_admin)}

                    <span className="ml-[5px] font-normal italic text-gray-35 text-[12px]">
                      <FieldTimeOutlined />
                      {dayjsFormatFromNow(item.created_at)}
                    </span>
                  </div>
                </div>
                <span className={`text-gray-35 ml-2`}>{item.content}</span>
              </div>
              {(authUser._id === item.creator_id || authUser.is_admin == true) && (
                <Popover
                  className="popover-comment"
                  placement="right"
                  content={
                    <div className={`${styles.contentPopoverComment}`}>
                      <p className={`${styles.actionComment}`} onClick={() => handleShowModalUpdateComment(item)}>
                        <EditOutlined /> Chỉnh sửa
                      </p>
                      <p className={`${styles.actionComment}`} onClick={() => handleShowModalDeleteComment(item)}>
                        <DeleteOutlined /> Xóa
                      </p>
                    </div>
                  }
                >
                  <MoreOutlined className="ml-1 cursor-pointer" />
                </Popover>
              )}
            </div>
          </>
        ))}
      </div>
      <div className={`${styles.createComment}`}>
        <Avatar
          className={`avatar-user-comment shadow ư`}
          crossOrigin="anonymous"
          src={authUser.avatar ? authUser.avatar : avatarDefault}
        />
        <TextArea
          value={infoComment.content}
          onFocus={() => handleFocus('content')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'content')}
          className={`main-input`}
          placeholder={`Bình luận với vai trò ${authUser?.name}`}
        />
        <Button
          type="primary"
          loading={isLoadingBtnCreateComment}
          className={`main-btn-primary-register mx-[5px] ml-[10px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, commentSchema, infoComment)}
        >
          Gửi
        </Button>
      </div>
      <ModalDefault
        isModalOpen={isShowModalUpdateComment}
        handleCancel={handleCancelModalUpdateComment}
        title={'Chỉnh sửa bình luận'}
        width={700}
      >
        <div className={`${styles.createComment}`}>
          <Avatar
            className={`avatar-user-comment shadow`}
            crossOrigin="anonymous"
            src={authUser.avatar ? authUser.avatar : avatarDefault}
          />
          <TextArea
            value={infoComment.content}
            onFocus={() => handleFocus('content')}
            onChange={(e) => handleChangeInputInfo(e.target.value, 'content')}
            className={`main-input`}
            placeholder={`Chỉnh sửa bình luận với vai trò ${authUser?.name}`}
          />
          <Button
            loading={isLoadingBtnUpdateComment}
            type="primary"
            className={`main-btn-primary-register mx-[5px] ml-[10px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, commentSchema, infoComment)}
          >
            Sửa
          </Button>
        </div>
      </ModalDefault>
      <ModalDeleteDefault
        content={`Bạn có chắc chắn muốn xóa bình luận này !`}
        contentBtn={'Xóa'}
        isModalOpen={visibleModalDeleteComment}
        handleOk={() => dispatch(setVisibleModalDeleteComment(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteComment(false))}
        handleConfirm={() => handleConfirmDelete()}
        loading={isLoadingBtnDeleteComment}
      />
    </>
  );
};

export default CommentForUser;
