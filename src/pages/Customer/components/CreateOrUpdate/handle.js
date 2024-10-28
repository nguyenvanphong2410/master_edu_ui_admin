import { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_USER, TYPE_FILE, TYPE_SUBMIT } from '../../../../utils/constants.js';
import { getNotification } from '../../../../utils/helper.js';
import { setErrorCreateOrUpdate } from '../../../../states/modules/customer/index.js';
import { createCustomer, updateCustomer } from '../../../../api/customer/index.js';
import { setInForCustomer } from '@/states/modules/customer/index.js';
import { initErrInfoCustomer, initInfoCustomer } from '@/states/modules/customer/initialState.js';
import { validate } from '@/utils/validateJoi/index.js';
import { createCustomerSchema, updateCustomerSchema } from './schema.js';

export default function Handle(props) {
  const { detailCustomer } = props;
  const dispatch = useDispatch();

  const inForCustomer = useSelector((state) => state.customer.inForCustomer);
  const isLoadingBtnCreateOrUpdate = useSelector((state) => state.customer.isLoadingBtnCreateOrUpdate);
  const errorCreateOrUpdate = useSelector((state) => state.customer.errorCreateOrUpdate);
  const visibleModalCreateOrUpdate = useSelector((state) => state.customer.visibleModalCreateOrUpdate);
  const isLoadingDetailCustomer = useSelector((state) => state.customer.isLoadingDetailCustomer);
  const configModal = useSelector((state) => state.customer.configModal);

  useEffect(() => {
    setInForCustomer(initInfoCustomer);
  }, [visibleModalCreateOrUpdate]);

  useEffect(() => {
    if (!_.isEmpty(detailCustomer)) {
      setInForCustomer(initInfoCustomer);
    }
  }, [detailCustomer]);

  const handleReloadError = () => {
    // if (
    //   errorCreateOrUpdate.name.length !== 0 ||
    //   errorCreateOrUpdate.email.length !== 0 ||
    //   errorCreateOrUpdate.password.length !== 0 ||
    //   errorCreateOrUpdate.status.length !== 0
    // ) {
    dispatch(setErrorCreateOrUpdate(initErrInfoCustomer));
    // }
  };

  const handleChangeInput = (e, type) => {
    let data = _.cloneDeep(inForCustomer);

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

    let dataError = _.cloneDeep(errorCreateOrUpdate);
    dataError[type] = '';

    dispatch(setInForCustomer(data));
    dispatch(setErrorCreateOrUpdate(dataError));
  };

  const handleChangeSwitch = (isChecked, type) => {
    handleReloadError();
    let data = _.cloneDeep(inForCustomer);
    data[type] = isChecked ? STATUS_USER['ACTIVE'] : STATUS_USER['DE_ACTIVE'];
    setInForCustomer(data);
  };

  const handleConfirm = (type, dataForm) => {

    if (type === TYPE_SUBMIT.CREATE) {
      validate(createCustomerSchema, dataForm, {
        onSuccess: (data) => dispatch(createCustomer(data)),
        onError: (error) => dispatch(setErrorCreateOrUpdate(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(updateCustomerSchema, dataForm, {
        onSuccess: (data) => dispatch(updateCustomer(inForCustomer._id, data)),
        onError: (error) => dispatch(setErrorCreateOrUpdate(error)),
      })
    }
  }

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
        let dataCloneDeep = _.cloneDeep(inForCustomer);
        dataCloneDeep['avatar'] = currentFile;
        dataCloneDeep['avatarUrl'] = fileUrl;
        dispatch(setInForCustomer(dataCloneDeep));
      }
    }
  };

  return {
    configModal,
    inForCustomer,
    errorCreateOrUpdate,
    isLoadingBtnCreateOrUpdate,
    isLoadingDetailCustomer,
    dispatch,
    handleChangeInput,
    handleChangeSwitch,
    handleConfirm,
    handleFocus,
    handleChangeAvatar,
  };
}
