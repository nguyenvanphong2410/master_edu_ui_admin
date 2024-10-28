import { handleCreateFeedback, handleDeleteFeedback, handleUpdateFeedback } from '@/api/userFeedback';
import store from '@/states/configureStore';
import {
  setConfigModalFeedback,
  setErrorInfoFeedback,
  setInfoFeedback,
  setShowModalCreateOrUpdateFeedback,
  setShowModalDeleteFeedback,
} from '@/states/modules/userFeedback';
import { TYPE_MODAL_FEEDBACK } from '@/utils/constants';
import { getBase64 } from '@/utils/helper';
import { validate } from '@/utils/validateJoi';
import { message } from 'antd';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const Handle = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.userFeedback.feedbacks);
  const isLoadingGetFeedbacks = useSelector((state) => state.userFeedback.isLoadingGetFeedbacks);
  const isLoadingBtnCreateOrUpdateFeedback = useSelector(
    (state) => state.userFeedback.isLoadingBtnCreateOrUpdateFeedback
  );
  const visibleModalCreateOrUpdateFeedback = useSelector(
    (state) => state.userFeedback.visibleModalCreateOrUpdateFeedback
  );
  const configModalFeedback = useSelector((state) => state.userFeedback.configModalFeedback);
  const errorInfoFeedback = useSelector((state) => state.userFeedback.errorInfoFeedback);
  const infoFeedback = useSelector((state) => state.userFeedback.infoFeedback);
  const isLoadingBtnDelete = useSelector((state) => state.userFeedback.isLoadingBtnDelete);
  const visibleModalDeleteFeedback = useSelector((state) => state.userFeedback.visibleModalDeleteFeedback);

  const handleShowModalCreateFeedback = (type) => {
    dispatch(
      setInfoFeedback({
        cover: {
          url: '',
          data: '',
        },
        avatar: {
          url: '',
          data: '',
        },
        name: '',
        content: '',
      })
    );
    dispatch(
      setConfigModalFeedback({
        title: 'Tạo mới nhận xét',
        type,
      })
    );
    dispatch(setShowModalCreateOrUpdateFeedback(true));
  };

  const handleShowModalUpdateFeedback = (value, type) => {
    dispatch(
      setConfigModalFeedback({
        title: 'Cập nhật nhận xét',
        type,
      })
    );
    dispatch(setInfoFeedback(value));
    dispatch(setShowModalCreateOrUpdateFeedback(true));
  };

  const handleChangeInputInfo = (value, type) => {
    const data = _.cloneDeep(store.getState().userFeedback.infoFeedback);
    const dataError = _.cloneDeep(errorInfoFeedback);
    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoFeedback(data));
    dispatch(setErrorInfoFeedback(dataError));
  };

  const handleCancelModalCreateOrUpdateFeedback = () => {
    dispatch(
      setErrorInfoFeedback({
        cover: '',
        avatar: '',
        name: '',
        content: '',
      })
    );
    dispatch(setShowModalCreateOrUpdateFeedback(false));
  };

  const handleFocus = (type) => {
    const dataError = _.cloneDeep(errorInfoFeedback);
    dataError[type] = '';
    dispatch(setErrorInfoFeedback(dataError));
  };

  const handleSubmit = (type, schema, dataFeedback) => {
    if (type === TYPE_MODAL_FEEDBACK.CREATE) {
      validate(schema, dataFeedback, {
        onSuccess: (data) => dispatch(handleCreateFeedback(data)),
        onError: (error) => dispatch(setErrorInfoFeedback(error)),
      });
    } else if (type === TYPE_MODAL_FEEDBACK.UPDATE) {
      validate(schema, dataFeedback, {
        onSuccess: (data) => dispatch(handleUpdateFeedback(data._id, data)),
        onError: (error) => dispatch(setErrorInfoFeedback(error)),
      });
    }
  };

  const handleShowModalDeleteFeedback = (value) => {
    dispatch(setInfoFeedback(value));
    dispatch(setShowModalDeleteFeedback(true));
  };

  const handleCancelModalDeleteFeedback = () => {
    dispatch(setShowModalDeleteFeedback(false));
  };

  const handleSubmitDeleteFeedback = () => {
    dispatch(handleDeleteFeedback(infoFeedback._id));
  };
  const beforeUpload = (file, type) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên tệp JPG/PNG.');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (url) => {
        const data = _.cloneDeep(infoFeedback);
        data[type] = {
          url,
          data: file,
        };
        dispatch(setInfoFeedback(data));
        const dataError = _.cloneDeep(errorInfoFeedback);
        dataError[`${type}.url`] = '';
        dispatch(setErrorInfoFeedback(dataError));
      });
    }
    return false;
  };

  return {
    feedbacks,
    isLoadingGetFeedbacks,
    isLoadingBtnCreateOrUpdateFeedback,
    visibleModalCreateOrUpdateFeedback,
    configModalFeedback,
    errorInfoFeedback,
    infoFeedback,
    isLoadingBtnDelete,
    visibleModalDeleteFeedback,
    handleShowModalCreateFeedback,
    handleShowModalUpdateFeedback,
    handleChangeInputInfo,
    handleCancelModalCreateOrUpdateFeedback,
    handleFocus,
    handleSubmit,
    handleShowModalDeleteFeedback,
    handleCancelModalDeleteFeedback,
    handleSubmitDeleteFeedback,
    beforeUpload,
  };
};

export default Handle;
