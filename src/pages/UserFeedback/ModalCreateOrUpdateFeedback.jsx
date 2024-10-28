import React from 'react';
import Handle from './handle';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../assets/images/icons/light/warning.svg';
import { Button, Input, Upload } from 'antd';
import { TYPE_MODAL_FEEDBACK } from '@/utils/constants';
import { feedbackSchema } from './schems';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './styles.module.scss';

const ModalCreateOrUpdateFeedback = () => {
  const {
    infoFeedback,
    errorInfoFeedback,
    handleCancelModalCreateOrUpdateFeedback,
    isLoadingBtnCreateOrUpdateFeedback,
    handleSubmit,
    configModalFeedback,
    handleChangeInputInfo,
    handleFocus,
    beforeUpload,
  } = Handle();
  const uploadButton = (
    <button className="border-0 bg-[none] flex flex-col items-center" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-plus"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      <div className="mt-[8px]">Tải lên</div>
    </button>
  );
  return (
    <>
      <div className="flex items-center justify-center mx-auto gap-2">
        <div className="input-wrap flex flex-col items-center">
          <div className="label-wrap">
            Ảnh bìa <span className={'required'}>*</span>
          </div>
          <Upload
            name="cover"
            className={styles.coverWrap}
            listType="picture-card"
            showUploadList={false}
            multiple={false}
            accept="image/jpeg image/png"
            beforeUpload={(file) => beforeUpload(file, 'cover')}
          >
            {infoFeedback.cover.url ? (
              <img
                src={infoFeedback.cover.url}
                alt="avatar"
                className="w-full h-[inherit] object-contain rounded-[8px]"
              />
            ) : (
              uploadButton
            )}
          </Upload>
          {!!(errorInfoFeedback.cover || errorInfoFeedback['cover.url']) && (
            <span className="error">
              <div className="icon">
                <InlineSVG src={IconWarning} width={14} height={14} />
              </div>
              <span>{errorInfoFeedback.cover || errorInfoFeedback['cover.url']}</span>
            </span>
          )}
        </div>
        <div className="input-wrap flex flex-col items-center">
          <div className="label-wrap">
            Ảnh đại diện <span className={'required'}>*</span>
          </div>
          <Upload
            name="avatar"
            className={styles.avatarWrap}
            listType="picture-circle"
            showUploadList={false}
            multiple={false}
            accept="image/jpeg image/png"
            beforeUpload={(file) => beforeUpload(file, 'avatar')}
          >
            {infoFeedback.avatar.url ? (
              <img
                src={infoFeedback.avatar.url}
                alt="avatar"
                className="w-full h-[inherit] rounded-[50%] object-cover"
              />
            ) : (
              uploadButton
            )}
          </Upload>
          {!!(errorInfoFeedback.avatar || errorInfoFeedback['avatar.url']) && (
            <span className="error">
              <div className="icon">
                <InlineSVG src={IconWarning} width={14} height={14} />
              </div>
              <span>{errorInfoFeedback.avatar || errorInfoFeedback['avatar.url']}</span>
            </span>
          )}
        </div>
      </div>

      <div className="input-wrap">
        <div className="label-wrap">
          Tên học viên<span className={'required'}>*</span>
        </div>
        <Input
          value={infoFeedback.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
          className={`main-input`}
          placeholder={'Nhập tên học viên'}
        />
        {!!errorInfoFeedback.name && (
          <span className="error">
            <div className="icon">
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoFeedback.name}</span>
          </span>
        )}
      </div>
      <div className="input-wrap">
        <div className="label-wrap">
          Nhận xét <span className={'required'}>*</span>
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: 'Nhập nhận xét...',
            shouldNotGroupWhenFull: true,
          }}
          data={infoFeedback.content}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleChangeInputInfo(data, 'content');
          }}
          onFocus={() => handleFocus('content')}
        />
        {!!errorInfoFeedback.content && (
          <span className="error">
            <div className="icon">
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            <span>{errorInfoFeedback.content}</span>
          </span>
        )}
      </div>
      <div className={`flex justify-center`}>
        <Button className={`main-btn-close mr-[10px]`} size={'large'} onClick={handleCancelModalCreateOrUpdateFeedback}>
          Đóng
        </Button>
        <Button
          className={`main-btn-primary`}
          type={'primary'}
          size={'large'}
          loading={isLoadingBtnCreateOrUpdateFeedback}
          onClick={() => handleSubmit(configModalFeedback.type, feedbackSchema, infoFeedback)}
        >
          {configModalFeedback.type === TYPE_MODAL_FEEDBACK.CREATE ? 'Tạo mới' : 'Cập nhật'}
        </Button>
      </div>
    </>
  );
};

export default ModalCreateOrUpdateFeedback;
