import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Avatar, Button, Col, Collapse, InputNumber, Row, Select, theme, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import InlineSVG from 'react-inlinesvg';
import graduation from '@/assets/images/icons/solid/graduation.svg';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { CaretRightOutlined } from '@ant-design/icons';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import moment from 'moment';
import { setErrorInfoScore, setInfoScore, setStudentToSetScoreSelected } from '@/states/modules/class';
import _ from 'lodash';
import { validate } from '@/utils/validates/validate';
import Joi from 'joi';
import { requestGetListStudentScoreOfClass, requestUpdateScore } from '@/api/class';
import { requestScoreOfStudentOfClass } from '@/api/score';
import TableStudentOfClass from './components/TableStudentOfClass';

function ModalSettingScore() {
  const dispatch = useDispatch();

  const [listStudentOfClassOption, setAllCustomersOption] = useState([]);

  const listStudentOfClass = useSelector((state) => state.class.listStudentOfClass);
  const idStudentToSetScoreSelected = useSelector((state) => state.class.studentToSetScoreSelected);
  const classSelected = useSelector((state) => state.class.classSelected);
  const infoScore = useSelector((state) => state.class.infoScore);
  const errorInfoScore = useSelector((state) => state.class.errorInfoScore);
  const isLoadingUpdateScore = useSelector((state) => state.class.isLoadingUpdateScore);

  const dataListStudentScoreOfClass = useSelector((state) => state.class.dataListStudentScoreOfClass);

  const { token } = theme.useToken();
  const getItems = (panelStyle) => [
    {
      key: '1',
      label: <p className='font-semibold'>Danh sách học viên</p>,
      children: <TableStudentOfClass dataListStudentScoreOfClass={dataListStudentScoreOfClass} />,
      style: panelStyle,
    },
  ];

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const handleSelectedStudent = (value) => {
    dispatch(setStudentToSetScoreSelected(value));
  };

  useEffect(() => {
    if (idStudentToSetScoreSelected && classSelected._id) {
      dispatch(requestScoreOfStudentOfClass(idStudentToSetScoreSelected, classSelected._id));
      dispatch(requestGetListStudentScoreOfClass(classSelected._id));
    }
  }, [idStudentToSetScoreSelected, classSelected._id, dispatch]);

  useEffect(() => {
    setAllCustomersOption(
      listStudentOfClass?.map((item) => ({
        value: item._id,
        label: (
          <div className={`flex`}>
            <Avatar
              className={`w-5 h-5 shadow mt-1`}
              crossOrigin="anonymous"
              src={item.avatar ? item.avatar : avatarDefault}
            />
            <div className={`ml-[5px] font-medium flex mt-[8px]`}>
              <div className={`name-user flex`}>
                {item.name}
                <Tooltip title="Học viên">
                  <InlineSVG src={graduation} className="ml-1 mt-[2px]w-4 h-4 text-blue-500" />
                </Tooltip>
              </div>
              <div className="mt-[-5px]">
                <span className={`text-[#616060] ml-1 mr-1 md:text-sm s:text-xs`}>{item.email}</span>
              </div>
            </div>
          </div>
        ),
      }))
    );
  }, [listStudentOfClass]);

  const handleChangeInput = (e, type) => {
    let data = _.cloneDeep(infoScore);

    switch (type) {
      case 'attendance_score':
      case 'plus_score':
      case 'midterm_score':
      case 'final_score':
        data[type] = e;
        break;
      default:
        data[type] = e.target.value;
        break;
    }

    let dataError = _.cloneDeep(errorInfoScore);
    dataError[type] = '';

    dispatch(setInfoScore(data));
    dispatch(setErrorInfoScore(dataError));
  };

  const handleConfirm = (type, dataForm) => {
      validate(updateScore, dataForm, {
        onSuccess: () => dispatch(requestUpdateScore(idStudentToSetScoreSelected, classSelected._id, infoScore)),
        onError: (error) => dispatch(setErrorInfoScore(error)),
      });
  };

  const updateScore = Joi.object({
    attendance_score: Joi.number().min(0).label('Điểm chuyên cần'),
    plus_score: Joi.number().min(0).label('Điểm cộng'),
    midterm_score: Joi.number().min(0).label('Điểm giữa kì'),
    final_score: Joi.number().min(0).label('Điểm cuối kì'),
  });

  return (
    <>
      <Row gutter={20}>
        <Col sm={14} xs={24}>
          <p className={`${styles.title} mb-4`}>Thông tin lớp học</p>

          <Row gutter={20}>
            <Col span={10}>
              <img
                src={classSelected.image_featured ? classSelected.image_featured : imageDefaultClass}
                crossOrigin="anonymous"
                alt="img-class"
                className={`${styles.pictures} cursor-pointer`}
              />
            </Col>
            <Col span={14}>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName}`}>Thời gian: </span>
                  <span className={`${styles.content}`}>
                    {moment(classSelected.start_time).format('DD/MM/YYYY')} -{' '}
                    {moment(classSelected.end_time).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName}`}>Khóa học: </span>
                  <span className={`${styles.content}`}>{classSelected?.course.name}</span>
                </div>
              </div>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName} mt-3`}>Giáo viên: </span>
                  <div className={`flex`}>
                    <Avatar
                      className={`avatar-user shadow`}
                      crossOrigin="anonymous"
                      src={classSelected?.teacher?.avatar ? classSelected?.teacher?.avatar : ''}
                    />
                    <div className={`ml-[10px] font-medium`}>
                      <div className={`name-user cursor-pointer`}>{classSelected?.teacher?.name}</div>
                      <a className="email-user" href={`mailto:${classSelected?.teacher?.email}`}>
                        {classSelected?.teacher?.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName}`}>Học viên: </span>
                  <span className={`${styles.content}`}>
                    {classSelected?.student_ids?.length ? classSelected?.student_ids?.length : 0} /{' '}
                    {classSelected?.max_number_student} người
                  </span>
                </div>
              </div>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName}`}>Người tạo: </span>
                  <span className={`${styles.content}`}>{classSelected?.creator.name}</span>
                </div>
              </div>
              <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName}`}>Người sửa: </span>
                  <span className={`${styles.content}`}>{classSelected?.updater?.name}</span>
                </div>
              </div>
            </Col>
          </Row>
          <div className={`${styles.contentInfoWrap} mt-4`}>
            <div className={`${styles.classSelectedInfo}`}>
              <p className={`${styles.fieldName}`}>Ghi chú: </p>
              <span className={`${styles.content}`}>{classSelected.notes}</span>
            </div>
          </div>
        </Col>
        <Col sm={10} xs={24}>
          <p className={`${styles.title} mb-4 flex justify-center text-purple-500`}>Xét điểm cho học viên</p>
          <div className={`input-wrap`}>
            <Select
              allowClear
              placeholder="Chọn học viên để xét điểm"
              className={'main-select-set-score w-full mb-3'}
              options={listStudentOfClassOption}
              value={idStudentToSetScoreSelected || null}
              filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
              onChange={(value) => handleSelectedStudent(value)}
            />
          </div>
          <Row gutter={20}>
            <Col span={12}>
              <div className={`input-wrap`}>
                <div className={'label-wrap'}>Điểm chuyên cần</div>
                <InputNumber
                  className={`main-input`}
                  style={{ width: '100%' }}
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder={'Nhập điểm chuyên cần'}
                  value={infoScore.attendance_score}
                  onChange={(e) => handleChangeInput(e, 'attendance_score')}
                />
                {errorInfoScore && errorInfoScore?.attendance_score?.length > 0 ? (
                  <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
                    {errorInfoScore?.attendance_score}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className={`input-wrap`}>
                <div className={'label-wrap'}>Điểm giữa kì</div>
                <InputNumber
                  className={`main-input`}
                  style={{ width: '100%' }}
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder={'Nhập điểm giữa kì'}
                  value={infoScore.midterm_score}
                  onChange={(e) => handleChangeInput(e, 'midterm_score')}
                />
                {errorInfoScore && errorInfoScore?.midterm_score?.length > 0 ? (
                  <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
                    {errorInfoScore?.midterm_score}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <div className={`input-wrap`}>
                <div className={'label-wrap'}>Điểm cuối kì</div>
                <InputNumber
                  className={`main-input`}
                  style={{ width: '100%' }}
                  placeholder={'Nhập điểm cuối kì'}
                  min="0"
                  max="10"
                  step="0.1"
                  value={infoScore.final_score}
                  onChange={(e) => handleChangeInput(e, 'final_score')}
                />
                {errorInfoScore && errorInfoScore?.final_score?.length > 0 ? (
                  <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
                    {errorInfoScore?.final_score}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className={`input-wrap`}>
                <div className={'label-wrap'}>Điểm cộng</div>
                <InputNumber
                  className={`main-input`}
                  style={{ width: '100%' }}
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder={'Nhập điểm cộng'}
                  value={infoScore.plus_score}
                  onChange={(e) => handleChangeInput(e, 'plus_score')}
                />
                {errorInfoScore && errorInfoScore?.plus_score?.length > 0 ? (
                  <span className={'error'}>
                    <div className={'icon'}>
                      <InlineSVG src={IconWarning} width={14} height="auto" />
                    </div>
                    {errorInfoScore?.plus_score}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Col>
          </Row>
          <div className={`flex justify-center`}>
            <Button
              className={`main-btn-primary`}
              size={'large'}
              loading={isLoadingUpdateScore}
              onClick={() => handleConfirm(infoScore)}
            >
              Cập nhật
            </Button>
          </div>
        </Col>
      </Row>
      <Collapse
        className="mt-4"
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </>
  );
}

export default ModalSettingScore;
