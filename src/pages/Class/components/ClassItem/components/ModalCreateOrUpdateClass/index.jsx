import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import { Button, Col, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import Handle from '@/pages/Class/handle';
import { TYPE_SUBMIT } from '@/utils/constants';
import { createClassSchema, updateClassSchema } from '@/pages/Class/schema';
import './styles.scss';
import styles from './styles.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

function ModalCreateOrUpdateClass() {
  const errorInfoClass = useSelector((state) => state.class.errorInfoClass);
  const isLoadingBtnCreateClass = useSelector((state) => state.class.isLoadingBtnCreateClass);
  const isLoadingBtnUpdateClass = useSelector((state) => state.class.isLoadingBtnUpdateClass);
  const infoClass = useSelector((state) => state.class.infoClass);
  const configModal = useSelector((state) => state.class.configModal);

  const {
    courseOption,
    teacherOption,
    studentOption,
    fileName,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateClass,
    handleSubmit,
    handleChangeImage,
    handleClickUpload,
    handleChangeImageFeatured,
    handleRemoveImage,
    handleRemoveFile,
  } = Handle();

  const { TextArea } = Input;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>
          <label htmlFor="" className={`label-input`}>
            Ảnh mô tả lớp học
          </label>
        </div>
        <div>
          <div className={`flex justify-center gap-2 ${styles.uploadImage}`}>
            <input
              onChange={(file) => handleChangeImage(file)}
              accept="image/*"
              id="inputFile"
              type="file"
              multiple
              hidden
            />
            {infoClass.images.map((file) => {
              return (
                <div key={file.id} className={`${styles.previewImage}`}>
                  <img src={file.url} alt={file.name} />
                  <Tooltip placement="top" title="Xoá">
                    <div onClick={() => handleRemoveImage(file.id)} className={`${styles.removeWrap}`}>
                      <InlineSVG src={IconRemove} width={14} height={14} />
                    </div>
                  </Tooltip>
                  <Tooltip placement="top" title="Nổi bật">
                    <div
                      onClick={() => handleChangeImageFeatured(file.id)}
                      className={`${styles.featuredWrap} ${!file.is_featured ? styles.noFeaturedWrap : ''}`}
                    >
                      <InlineSVG src={IconStar} width={14} height={14} />
                    </div>
                  </Tooltip>
                </div>
              );
            })}
            {infoClass.images.length < 3 ? (
              <div onClick={() => handleClickUpload()} className={`${styles.uploadButton}`}>
                <InlineSVG src={IconPlus} width={14} height={14} />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className="layout-info">
        <Row gutter={20}>
          <Col sm={12} xs={24}>
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Tên lớp học <span className={'required'}>*</span>
              </div>
              <Input
                value={infoClass.name}
                onFocus={() => handleFocus('name')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                className={`main-input ${errorInfoClass && errorInfoClass.name ? 'error-input' : ''}`}
                placeholder={'Nhập tên lớp học'}
              />
              {errorInfoClass && errorInfoClass.name && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoClass.name}
                </span>
              )}
            </div>

            {/* <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`required label-input`}>Thời gian</label>
              </div>
              <DatePicker.RangePicker
                showTime
                inputReadOnly={true}
                picker="date"
                format="DD/MM/YYYY"
                className={`main-input`}
                placeholder={['Bắt đầu', 'Kết thúc']}
                value={[
                  infoClass.start_time ? dayjs(infoClass.start_time) : null,
                  infoClass.end_time ? dayjs(infoClass.end_time) : null,
                ]}
                onChange={(startTime) => handleChangeInputInfo(startTime, 'time')}
                onFocus={() => handleFocus('time')}
              />
              {errorInfoClass && errorInfoClass.start_time && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoClass.start_time}
                </span>
              )}
              {errorInfoClass && errorInfoClass.end_time && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoClass.end_time}
                </span>
              )}
            </div> */}

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`label-input`}>Tài liệu lớp học</label>
              </div>
              <input
                id="pdfFile"
                type="file"
                accept="application/pdf"
                onChange={(e) => handleChangeInputInfo(e, 'file_record')}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  backgroundColor: '#f9f9f9',
                  fontSize: '13px',
                  color: '#c6c6c6',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px dotted #ceced6',
                  height: '44px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <label htmlFor="pdfFile">
                  {infoClass.name_file ? (
                    <div
                      style={{
                        color: 'blue',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px',
                      }}
                    >
                      <Tooltip title={infoClass.name_file}>
                        <span>
                          {infoClass.name_file && infoClass.name_file !== 'null' ? (
                            infoClass.name_file
                          ) : (
                            <span className="text-gray-55">+ Tải lên tệp</span>
                          )}
                        </span>
                      </Tooltip>
                    </div>
                  ) : fileName ? (
                    <div
                      style={{
                        color: 'blue',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px',
                      }}
                    >
                      <Tooltip title={fileName}>
                        <span>{fileName}</span>
                      </Tooltip>
                    </div>
                  ) : (
                    '+ Tải tệp ở đây'
                  )}
                </label>
                {fileName ? (
                  <Tooltip title={'Xóa lớp học'}>
                    <span
                      style={{ color: isHovered ? 'red' : 'gray', cursor: 'pointer' }}
                      onClick={handleRemoveFile}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <DeleteOutlined />
                    </span>
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24}>
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Khóa học <span className={'required'}>*</span>
              </div>
              <Select
                className={'main-select w-full'}
                value={infoClass?.course_id || null}
                allowClear
                placeholder="Chọn khóa học"
                onChange={(value) => handleChangeInputInfo(value, 'course_id')}
                options={courseOption}
                filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
                onFocus={() => handleFocus('course_id')}
              />
              {errorInfoClass && errorInfoClass.course_id && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoClass.course_id}
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className="label-wrap">
                <label className={`label-input`}>
                  Số lượng học viên tối đa <span className="italic text-gray-65">(người)</span>
                </label>
              </div>
              <InputNumber
                value={infoClass.max_number_student}
                min={0}
                onFocus={() => handleFocus('max_number_student')}
                onChange={(e) => handleChangeInputInfo(e, 'max_number_student')}
                className={`main-input w-full ${
                  errorInfoClass && errorInfoClass.max_number_student ? 'error-input' : ''
                }`}
                placeholder={'Nhập số lượng'}
              />
              {errorInfoClass && errorInfoClass.max_number_student && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoClass.max_number_student}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className={`input-wrap`}>
        <div className={'label-wrap'}>
          Giáo viên <span className={'required'}>*</span>
        </div>
        <Select
          className={'main-select w-full'}
          value={infoClass?.teacher_id || null}
          allowClear
          placeholder="Chọn giáo viên"
          onChange={(value) => handleChangeInputInfo(value, 'teacher_id')}
          options={teacherOption}
          filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
          onFocus={() => handleFocus('teacher_id')}
        />
        {errorInfoClass && errorInfoClass.teacher_id && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoClass.teacher_id}
          </span>
        )}
      </div>
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label className={`label-input`}>Học viên</label>
        </div>
        <Select
          className={'main-select w-full'}
          value={infoClass?.student_ids}
          allowClear
          placeholder="Chọn học viên"
          mode="multiple"
          onChange={(value) => handleChangeInputInfo(value, 'student_ids')}
          options={studentOption}
          filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
          onFocus={() => handleFocus('student_ids')}
        />
        {errorInfoClass && errorInfoClass.student_ids && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoClass.student_ids}
          </span>
        )}
      </div>

      <div className={'input-wrap'}>
        <div className="label-wrap">
          <label className={`label-input`}>Ghi chú</label>
        </div>
        <TextArea
          value={infoClass.notes}
          onFocus={() => handleFocus('notes')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'notes')}
          className={`main-input ${errorInfoClass && errorInfoClass.notes ? 'error-input' : ''}`}
          placeholder={'Nhập mô tả lớp học'}
        />
        {errorInfoClass && errorInfoClass.notes && (
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
            {errorInfoClass.notes}
          </span>
        )}
      </div>

      <div className={`flex justify-center mt-8`}>
        <Button className={`ant-btn-close mx-[5px]`} size={'large'} onClick={handleCancelModalCreateOrUpdateClass}>
          Đóng
        </Button>
        {configModal.type === TYPE_SUBMIT.CREATE ? (
          <Button
            loading={isLoadingBtnCreateClass}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createClassSchema, infoClass)}
          >
            Tạo mới
          </Button>
        ) : (
          <Button
            loading={isLoadingBtnUpdateClass}
            className={`ant-btn-primary mx-[5px]`}
            size={'large'}
            onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateClassSchema, infoClass)}
          >
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalCreateOrUpdateClass;
