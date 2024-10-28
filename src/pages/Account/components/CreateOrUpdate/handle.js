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
import { getNotification, handleCheckValidateConfirm, VALIDATE_PHONE_REGEX_RULE } from '../../../../utils/helper.js';
import { setErrorCreateOrUpdate, setInForAdmin } from '../../../../states/modules/user/index.js';
import { createUser, updateUser } from '../../../../api/user/index.js';
import { validate } from '@/utils/validates/validate.js';
import Joi from 'joi';
import { initErrInfoAdmin } from '@/states/modules/user/initialState.js';

export default function Handle(props) {
  const { isTypeModalCreate, detailUser } = props;

  const dispatch = useDispatch();

  const isLoadingBtnCreateOrUpdate = useSelector((state) => state.user.isLoadingBtnCreateOrUpdate);
  const errorCreateOrUpdate = useSelector((state) => state.user.errorCreateOrUpdate);
  const isLoadingDetailUser = useSelector((state) => state.user.isLoadingDetailUser);
  const inForAdmin = useSelector((state) => state.user.inForAdmin);
  const configModalAdmin = useSelector((state) => state.user.configModalAdmin);

  const handleReloadError = () => {
    dispatch(setErrorCreateOrUpdate(initErrInfoAdmin));
  };

  const handleChangeInput = (e, type) => {
    handleReloadError();
    let data = _.cloneDeep(inForAdmin);

    if (type === 'role_ids') {
      dispatch(setInForAdmin({ ...data, role_ids: e }));
    }
    if (type !== 'role_ids') {
      let value = e.target.value;
      data[type] = value;
      dispatch(setInForAdmin(data));
    }
  };

  const handleChangeSwitch = (isChecked, type) => {
    handleReloadError();
    let data = _.cloneDeep(inForAdmin);
    data[type] = isChecked ? STATUS_USER['ACTIVE'] : STATUS_USER['DE_ACTIVE'];
    dispatch(setInForAdmin(data));
  };

  const handleConfirm = (type, dataForm) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(createAdminSchema, dataForm, {
        onSuccess: () => dispatch(createUser(inForAdmin)),
        onError: (error) => dispatch(setErrorCreateOrUpdate(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(updateAdminSchema, dataForm, {
        onSuccess: (data) => dispatch(updateUser(inForAdmin._id, data)),
        onError: (error) => dispatch(setErrorCreateOrUpdate(error)),
      });
    }
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorCreateOrUpdate);
    dataError[type] = '';
    dispatch(setErrorCreateOrUpdate(dataError));
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
        let dataCloneDeep = _.cloneDeep(inForAdmin);
        dataCloneDeep['avatar'] = currentFile;
        dataCloneDeep['avatarUrl'] = fileUrl;
        dispatch(setInForAdmin(dataCloneDeep));
      }
    }
  };

  const createAdminSchema = Joi.object({
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

  const updateAdminSchema = Joi.object({
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
    inForAdmin,
    errorCreateOrUpdate,
    isLoadingBtnCreateOrUpdate,
    isLoadingDetailUser,
    configModalAdmin,
    handleChangeInput,
    handleChangeSwitch,
    handleConfirm,
    handleFocus,
    handleChangeAvatar,
  };
}
