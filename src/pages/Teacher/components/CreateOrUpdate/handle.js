import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  GENDER_USER,
  MAX_STRING_SIZE,
  STATUS_ACTIVE,
  STATUS_USER,
  TYPE_FILE,
  TYPE_SUBMIT,
} from '../../../../utils/constants.js';
import { getNotification, VALIDATE_PHONE_REGEX_RULE } from '../../../../utils/helper.js';
import { createTeacher, updateTeacher } from '../../../../api/teacher/index.js';
import { validate } from '@/utils/validates/validate.js';
import Joi from 'joi';
import { initErrInfoTeacher } from '@/states/modules/teacher/initialState.js';
import { setErrorCreateOrUpdateTeacher, setInForTeacher } from '@/states/modules/teacher/index.js';

export default function Handle() {

  const dispatch = useDispatch();

  const isLoadingBtnCreateOrUpdate = useSelector((state) => state.teacher.isLoadingBtnCreateOrUpdate);
  const errorCreateOrUpdate = useSelector((state) => state.teacher.errorCreateOrUpdate);
  const isLoadingDetailTeacher = useSelector((state) => state.teacher.isLoadingDetailTeacher);
  const inForTeacher = useSelector((state) => state.teacher.inForTeacher);
  const configModalTeacher = useSelector((state) => state.teacher.configModalTeacher);

  const handleReloadError = () => {
    dispatch(setErrorCreateOrUpdateTeacher(initErrInfoTeacher));
  };

  const handleChangeInput = (e, type) => {
    handleReloadError();
    let data = _.cloneDeep(inForTeacher);

    if (type === 'role_ids') {
      dispatch(setInForTeacher({ ...data, role_ids: e }));
    }
    if (type !== 'role_ids') {
      let value = e.target.value;
      data[type] = value;
      dispatch(setInForTeacher(data));
    }
  };

  const handleChangeSwitch = (isChecked, type) => {
    handleReloadError();
    let data = _.cloneDeep(inForTeacher);
    data[type] = isChecked ? STATUS_USER['ACTIVE'] : STATUS_USER['DE_ACTIVE'];
    dispatch(setInForTeacher(data));
  };

  const handleConfirm = (type, dataForm) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(createTeacherSchema, dataForm, {
        onSuccess: () => dispatch(createTeacher(inForTeacher)),
        onError: (error) => dispatch(setErrorCreateOrUpdateTeacher(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(updateTeacherSchema, dataForm, {
        onSuccess: (data) => dispatch(updateTeacher(inForTeacher._id, data)),
        onError: (error) => dispatch(setErrorCreateOrUpdateTeacher(error)),
      });
    }
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorCreateOrUpdate);
    dataError[type] = '';
    dispatch(setErrorCreateOrUpdateTeacher(dataError));
  };

  const handleChangeAvatar = (file) => {
    if (file.target.files[0]) {
      let currentFile = file.target.files[0];
      let fileUrl = URL.createObjectURL(file.target.files[0]);
      let dataError = '';
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không được vượt quá 2MB.';
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh đại diện chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
      }

      if (dataError) {
        getNotification('error', dataError);
      } else {
        let dataCloneDeep = _.cloneDeep(inForTeacher);
        dataCloneDeep['avatar'] = currentFile;
        dataCloneDeep['avatarUrl'] = fileUrl;
        dispatch(setInForTeacher(dataCloneDeep));
      }
    }
  };

  const createTeacherSchema = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Họ và tên'),
    email: Joi.string().trim().max(MAX_STRING_SIZE).email({ tlds: false }).required().label('Email'),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label('Mật khẩu'),
    avatar: Joi.any(),
    gender: Joi.string()
      .valid(...Object.values(GENDER_USER))
      .label('Giới tính')
      .messages({ 'any.only': 'Giới tính không hợp lệ.' }),
    phone: Joi.string().trim().pattern(VALIDATE_PHONE_REGEX_RULE).allow(null, '').label('Số điện thoại'),
    address: Joi.string().allow(null, '').label('Địa chỉ'),
    status: Joi.string()
      .valid(...Object.values(STATUS_ACTIVE))
      .label('Trạng thái')
      .messages({ 'any.only': 'Trạng thái không hợp lệ.' }),
    role_ids: Joi.any().label('Vai trò'),
  });

  const updateTeacherSchema = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Họ và tên'),
    email: Joi.string().trim().max(MAX_STRING_SIZE).email({ tlds: false }).required().label('Email'),
    avatar: Joi.any(),
    gender: Joi.string()
      .valid(...Object.values(GENDER_USER))
      .label('Giới tính')
      .messages({ 'any.only': 'Giới tính không hợp lệ.' }),
    phone: Joi.string().trim().pattern(VALIDATE_PHONE_REGEX_RULE).allow(null, '').label('Số điện thoại'),
    address: Joi.string().allow(null, '').label('Địa chỉ'),
    status: Joi.string()
      .valid(...Object.values(STATUS_ACTIVE))
      .label('Trạng thái')
      .messages({ 'any.only': 'Trạng thái không hợp lệ.' }),
    role_ids: Joi.any().label('Vai trò'),
  });

  return {
    dispatch,
    inForTeacher,
    errorCreateOrUpdate,
    isLoadingBtnCreateOrUpdate,
    isLoadingDetailTeacher,
    configModalTeacher,
    handleChangeInput,
    handleChangeSwitch,
    handleConfirm,
    handleFocus,
    handleChangeAvatar,
  };
}
