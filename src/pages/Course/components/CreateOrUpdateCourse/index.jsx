import { Button, Col, DatePicker, Input, InputNumber, Row, Tooltip } from 'antd';
import React from 'react';
import Handle from '../../handle';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../../../assets/images/icons/light/warning.svg';
import { PACKAGE_TYPE, TYPE_MODAL_PACKAGE } from '../../../../utils/constants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { courseSchema } from '../../schema';
import './styles.scss';
import styles from './styles.module.scss';
import IconPlus from '@/assets/images/icons/light/plus.svg';
import IconRemove from '@/assets/images/icons/duotone/remove.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import dayjs from 'dayjs';

function ModalCreateOrUpdateCourse() {
  const {
    infoCourses,
    errorInfoCourses,
    isLoadingBtnCreateOrUpdate,
    configModalCourse,
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateOrUpdateCourse,
    handleSubmit,
    handleChangeImage,
    handleRemoveImage,
    handleChangeImageFeatured,
    handleClickUpload
  } = Handle();

  return (
    <div>
      {/* anh start */}
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>
          <label htmlFor="" className={`label-input`}>
            Ảnh mô tả khóa học
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
            {infoCourses.images.map((file) => {
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
            {infoCourses.images.length < 3 ? (
              <div onClick={() => handleClickUpload()} className={`${styles.uploadButton}`}>
                <InlineSVG src={IconPlus} width={14} height={14} />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {/* anh end */}
      <div className="layout-info">
        <Row gutter={20}>
          <Col sm={12} xs={24}>
            {' '}
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Tên khóa học <span className={'required'}>*</span>
              </div>
              <Input
                value={infoCourses.name}
                onFocus={() => handleFocus('name')}
                onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                className={`main-input`}
                placeholder={'Nhập tên khóa học'}
              />
              {errorInfoCourses && errorInfoCourses.name && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  <span>{errorInfoCourses.name}</span>
                </span>
              )}
            </div>
            <div className={`input-wrap mt-[-4px]`}>
              <div className="label-wrap">
              <div className={'label-wrap'}>
                Thời gian <span className={'required'}>*</span>
              </div>
              </div>
              <DatePicker.RangePicker
                showTime
                inputReadOnly={true}
                picker="date"
                format="DD/MM/YYYY"
                className={`main-input w-full`}
                placeholder={['Bắt đầu', 'Kết thúc']}
                value={[
                  infoCourses.start_time ? dayjs(infoCourses.start_time) : null,
                  infoCourses.end_time ? dayjs(infoCourses.end_time) : null,
                ]}
                onChange={(startTime) => handleChangeInputInfo(startTime, 'time')}
              />
              {errorInfoCourses && errorInfoCourses.start_time && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoCourses.start_time}
                </span>
              )}
              {errorInfoCourses && errorInfoCourses.end_time && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  {errorInfoCourses.end_time}
                </span>
              )}
            </div>{' '}
          </Col>
          <Col sm={12} xs={24}>
            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Giá tiền gốc <span className={'required'}>*</span>
              </div>
              <InputNumber
                value={infoCourses.original_price}
                onFocus={() => handleFocus('original_price')}
                onChange={(value) => handleChangeInputInfo(value, 'original_price')}
                className={`main-input-number input-price`}
                placeholder={'Nhập giá tiền gốc'}
                controls={false}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(',', '')}
              />
              {errorInfoCourses && errorInfoCourses.original_price && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  <span>{errorInfoCourses.original_price}</span>
                </span>
              )}
            </div>

            <div className={`input-wrap`}>
              <div className={'label-wrap'}>
                Giá tiền hiện tại <span className={'required'}>*</span>
              </div>
              <InputNumber
                value={infoCourses.current_price}
                onFocus={() => handleFocus('current_price')}
                onChange={(value) => handleChangeInputInfo(value, 'current_price')}
                className={`main-input-number input-price`}
                placeholder={'Nhập giá tiền hiện tại'}
                controls={false}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(',', '')}
              />
              {errorInfoCourses && errorInfoCourses.current_price && (
                <span className={`error`}>
                  <div className={`icon`}>
                    <InlineSVG src={IconWarning} width={14} height={14} />
                  </div>
                  <span>{errorInfoCourses.current_price}</span>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div></div>

      {infoCourses?.type !== PACKAGE_TYPE['NEW_ACCOUNT_GIFT'] ? (
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>
            Mô tả
            {infoCourses.type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? (
              <></>
            ) : (
              <span className={'required ml-[5px]'}>*</span>
            )}
          </div>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: 'Nhập mô tả...',
              shouldNotGroupWhenFull: true,
            }}
            data={infoCourses.description || ''}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleChangeInputInfo(data, 'description');
            }}
            onFocus={() => handleFocus('description')}
          />
          {errorInfoCourses && errorInfoCourses.description && (
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14} />
              </div>
              <span>{errorInfoCourses.description}</span>
            </span>
          )}
        </div>
      ) : (
        ''
      )}

      <div className={`flex justify-center`}>
        <Button className={`main-btn-close mr-[10px]`} size={'large'} onClick={handleCancelModalCreateOrUpdateCourse}>
          Đóng
        </Button>
        <Button
          className={`main-btn-primary`}
          size={'large'}
          loading={isLoadingBtnCreateOrUpdate}
          onClick={() => handleSubmit(configModalCourse.type, courseSchema, infoCourses)}
        >
          {configModalCourse.type === TYPE_MODAL_PACKAGE.CREATE ? 'Tạo mới' : 'Cập nhật'}
        </Button>
      </div>
    </div>
  );
}

export default ModalCreateOrUpdateCourse;
