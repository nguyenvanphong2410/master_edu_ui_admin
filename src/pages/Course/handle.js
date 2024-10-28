import _ from 'lodash';
import {
  setConfigModalPackage,
  setErrorInfoPackages,
  setInfoPackages,
  setShowModalCreateOrUpdatePackage,
  setShowModalDeletePackage,
} from '../../states/modules/package/index.js';
import {TYPE_FILE, TYPE_MODAL_PACKAGE} from '../../utils/constants.js';
import useWindowSize from '../../utils/hooks/useWindowSize.js';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../utils/validateJoi/index.js';
import { handleChangeHighlightPackage, handleCreatePackages, handleDeletePackages, handleUpdatePackages } from '../../api/package/index.js';
import store from '../../states/configureStore.js';
import { initErrInfoCourse, initInfoCourse } from '@/states/modules/package/initState.js';
import { getNotification } from '@/utils/helper.js';

export default function Handle() {
  const windowWidth = useWindowSize().width;
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.package.packages);
  const isLoadingCardPackages = useSelector((state) => state.package.isLoadingCardPackages);
  const isLoadingBtnCreateOrUpdate = useSelector((state) => state.package.isLoadingBtnCreateOrUpdate);
  const visibleModalCreateOrUpdatePackage = useSelector((state) => state.package.visibleModalCreateOrUpdatePackage);
  const configModalPackage = useSelector((state) => state.package.configModalPackage);
  const errorInfoPackages = useSelector((state) => state.package.errorInfoPackages);
  const infoPackages = useSelector((state) => state.package.infoPackages);
  const isLoadingBtnDelete = useSelector((state) => state.package.isLoadingBtnDelete);
  const visibleModalDeletePackage = useSelector((state) => state.package.visibleModalDeletePackage);
  const dataFilter = useSelector((state) => state.package.dataFilter);

  const handleShowModalCreatePackage = (type) => {
    dispatch(
      setInfoPackages(initInfoCourse)
    );
    dispatch(
      setConfigModalPackage({
        title: 'Tạo mới khóa học',
        type,
      })
    );
    dispatch(setShowModalCreateOrUpdatePackage(true));
  };

  const handleShowModalUpdatePackage = (value, type) => {
    dispatch(
      setConfigModalPackage({
        title: 'Cập nhật khóa học',
        type,
      })
    );
    let imageCourse = [];
    value.images_src.forEach(function(image,index){
      imageCourse.push({
        id: index+1,
        name: image,
        url: image,
        is_featured: value.image_featured === image,
        file: value.images[index]
      })
    })
    dispatch(setInfoPackages({
      ...value,
      images: imageCourse,
    }))
    dispatch(setErrorInfoPackages(initErrInfoCourse));
    dispatch(setShowModalCreateOrUpdatePackage(true));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(store.getState().package.infoPackages);
    let dataError = _.cloneDeep(errorInfoPackages);

    if (type === 'time') {
      data['start_time'] = value[0].toDate();
      data['end_time'] = value[1].toDate();
    } else {
      data[type] = value;
    }

    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoPackages(data));
    dispatch(setErrorInfoPackages(dataError));
  };

  const handleCancelModalCreateOrUpdatePackage = () => {
    dispatch(
      setErrorInfoPackages(initErrInfoCourse)
    );
    dispatch(setShowModalCreateOrUpdatePackage(false));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoPackages);
    dataError[type] = '';
    dispatch(setErrorInfoPackages(dataError));
  };

  const handleSubmit = (type, schema, dataPackage) => {
    if (type === TYPE_MODAL_PACKAGE.CREATE) {
      validate(schema, dataPackage, {
        onSuccess: (data) => dispatch(handleCreatePackages(data)),
        onError: (error) => dispatch(setErrorInfoPackages(error)),
      });
    } else if (type === TYPE_MODAL_PACKAGE.UPDATE) {
      validate(schema, dataPackage, {
        onSuccess: (data) => dispatch(handleUpdatePackages(data._id, data)),
        onError: (error) => dispatch(setErrorInfoPackages(error)),
      });
    }
  };

  const handleShowModalDeletePackages = (value) => {
    dispatch(setInfoPackages(value));
    dispatch(setShowModalDeletePackage(true));
  };

  const handleCancelModalDeletePackage = () => {
    dispatch(setShowModalDeletePackage(false));
  };

  const handleSubmitDeletePackage = () => {
    dispatch(handleDeletePackages(infoPackages._id));
  };

  const handleSubmitChangeHighlightPackage = (id) => {
    dispatch(handleChangeHighlightPackage(id));
  }

  //Xử lí ảnh
  const handleChangeImage = (file) => {
    let maxImage = infoPackages.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let course = _.cloneDeep(infoPackages);
      listImage.forEach(function (fileItem) {
        if (maxImage === 3) {
          return false;
        }

        let fileUrl = URL.createObjectURL(fileItem);
        let dataError = '';
        if (fileItem.size / 1024 / 1024 > 10) {
          dataError = 'Kích thước ảnh không vượt quá 10MB.';
        } else if (!TYPE_FILE.includes(fileItem.type)) {
          dataError = 'Ảnh sai định dạng, chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
        }

        if (dataError) {
          getNotification('error', dataError);
        } else {
          course.images.push({
            id: maxImage + 1,
            name: fileItem.name,
            file: fileItem,
            url: fileUrl,
            is_featured: course.images.length === 0,
          });
          maxImage++;
        }
      });
      dispatch(setInfoPackages(course));
    }
  };

  const handleRemoveImage = (imageId) => {
    let newInfoCourse = _.cloneDeep(infoPackages);
    let featured = false;
    newInfoCourse.images = _.filter(infoPackages.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoPackages(newInfoCourse));
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoCourse = _.cloneDeep(infoPackages);
    newInfoCourse.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoPackages(newInfoCourse));
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  return {
    windowWidth,
    packages,
    dataFilter,
    isLoadingCardPackages,
    isLoadingBtnCreateOrUpdate,
    visibleModalCreateOrUpdatePackage,
    configModalPackage,
    infoPackages,
    errorInfoPackages,
    isLoadingBtnDelete,
    visibleModalDeletePackage,
    handleCancelModalCreateOrUpdatePackage,
    handleCancelModalDeletePackage,
    handleShowModalCreatePackage,
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleShowModalUpdatePackage,
    handleShowModalDeletePackages,
    handleSubmitDeletePackage,
    handleSubmitChangeHighlightPackage,
    handleChangeImage,
    handleRemoveImage,
    handleChangeImageFeatured,
    handleClickUpload,
  };
}
