import _ from 'lodash';
import {
  setConfigModalCourse,
  setErrorInfoCourses,
  setInfoCourses,
  setShowModalCreateOrUpdateCourse,
  setShowModalDeleteCourse,
  setShowModalViewClassesOfCourse,
} from '../../states/modules/course/index.js';
import {TYPE_FILE, TYPE_MODAL_PACKAGE} from '../../utils/constants.js';
import useWindowSize from '../../utils/hooks/useWindowSize.js';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../utils/validateJoi/index.js';
import { handleChangeHighlightCourse, handleCreateCourses, handleDeleteCourses, handleUpdateCourses, requestGetClassesOfCourse } from '../../api/course/index.js';
import store from '../../states/configureStore.js';
import { initErrInfoCourse, initInfoCourse } from '@/states/modules/course/initState.js';
import { getNotification } from '@/utils/helper.js';
import { useState } from 'react';

export default function Handle() {
  const windowWidth = useWindowSize().width;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const isLoadingCardCourses = useSelector((state) => state.course.isLoadingCardCourses);
  const isLoadingBtnCreateOrUpdate = useSelector((state) => state.course.isLoadingBtnCreateOrUpdate);
  const visibleModalCreateOrUpdateCourse = useSelector((state) => state.course.visibleModalCreateOrUpdateCourse);
  const configModalCourse = useSelector((state) => state.course.configModalCourse);
  const errorInfoCourses = useSelector((state) => state.course.errorInfoCourses);
  const infoCourses = useSelector((state) => state.course.infoCourses);
  const isLoadingBtnDelete = useSelector((state) => state.course.isLoadingBtnDelete);
  const visibleModalDeleteCourse = useSelector((state) => state.course.visibleModalDeleteCourse);
  const dataFilter = useSelector((state) => state.course.dataFilter);
  const visibleModalViewClassesOfCourse = useSelector((state) => state.course.visibleModalViewClassesOfCourse);
  
  const [dataTimeOfModalClassOfCourse, setDataTimeOfModalClassOfCourse] = useState({start_time: null,end_time: null});

  const handleShowModalCreateCourse = (type) => {
    dispatch(
      setInfoCourses(initInfoCourse)
    );
    dispatch(
      setConfigModalCourse({
        title: 'Tạo mới khóa học',
        type,
      })
    );
    dispatch(setShowModalCreateOrUpdateCourse(true));
  };

  const handleShowModalUpdateCourse = (value, type) => {
    dispatch(
      setConfigModalCourse({
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
    dispatch(setInfoCourses({
      ...value,
      images: imageCourse,
    }))
    dispatch(setErrorInfoCourses(initErrInfoCourse));
    dispatch(setShowModalCreateOrUpdateCourse(true));
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(store.getState().course.infoCourses);
    let dataError = _.cloneDeep(errorInfoCourses);

    if (type === 'time') {
      data['start_time'] = value[0].toDate();
      data['end_time'] = value[1].toDate();
    } else {
      data[type] = value;
    }

    data[type] = value;
    dataError[type] = '';
    dispatch(setInfoCourses(data));
    dispatch(setErrorInfoCourses(dataError));
  };

  const handleCancelModalCreateOrUpdateCourse = () => {
    dispatch(
      setErrorInfoCourses(initErrInfoCourse)
    );
    dispatch(setShowModalCreateOrUpdateCourse(false));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoCourses);
    dataError[type] = '';
    dispatch(setErrorInfoCourses(dataError));
  };

  const handleSubmit = (type, schema, dataCourse) => {
    if (type === TYPE_MODAL_PACKAGE.CREATE) {
      validate(schema, dataCourse, {
        onSuccess: (data) => dispatch(handleCreateCourses(data)),
        onError: (error) => dispatch(setErrorInfoCourses(error)),
      });
    } else if (type === TYPE_MODAL_PACKAGE.UPDATE) {
      validate(schema, dataCourse, {
        onSuccess: (data) => dispatch(handleUpdateCourses(data._id, data)),
        onError: (error) => dispatch(setErrorInfoCourses(error)),
      });
    }
  };

  const handleShowModalDeleteCourses = (value) => {
    dispatch(setInfoCourses(value));
    dispatch(setShowModalDeleteCourse(true));
  };

  const handleCancelModalDeleteCourse = () => {
    dispatch(setShowModalDeleteCourse(false));
  };

  const handleSubmitDeleteCourse = () => {
    dispatch(handleDeleteCourses(infoCourses._id));
  };

  const handleSubmitChangeHighlightCourse = (id) => {
    dispatch(handleChangeHighlightCourse(id));
  }

  //Xử lí ảnh
  const handleChangeImage = (file) => {
    let maxImage = infoCourses.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let course = _.cloneDeep(infoCourses);
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
      dispatch(setInfoCourses(course));
    }
  };

  const handleRemoveImage = (imageId) => {
    let newInfoCourse = _.cloneDeep(infoCourses);
    let featured = false;
    newInfoCourse.images = _.filter(infoCourses.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoCourses(newInfoCourse));
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoCourse = _.cloneDeep(infoCourses);
    newInfoCourse.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoCourses(newInfoCourse));
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  const handleShowModalClassesOfCourse = (item) => {
    dispatch(setInfoCourses(item));
    dispatch(setShowModalViewClassesOfCourse(true))
    dispatch(requestGetClassesOfCourse(item._id))
    setDataTimeOfModalClassOfCourse({start_time: item.start_time, end_time: item.end_time})
  }

  const handleCancelModalClassesOfCourse = () => {
    dispatch(setShowModalViewClassesOfCourse(false))
  }
  return {
    windowWidth,
    courses,
    dataFilter,
    isLoadingCardCourses,
    isLoadingBtnCreateOrUpdate,
    visibleModalCreateOrUpdateCourse,
    configModalCourse,
    infoCourses,
    errorInfoCourses,
    isLoadingBtnDelete,
    visibleModalDeleteCourse,
    visibleModalViewClassesOfCourse,
    dataTimeOfModalClassOfCourse,
    handleCancelModalCreateOrUpdateCourse,
    handleCancelModalDeleteCourse,
    handleShowModalCreateCourse,
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleShowModalUpdateCourse,
    handleShowModalDeleteCourses,
    handleSubmitDeleteCourse,
    handleSubmitChangeHighlightCourse,
    handleChangeImage,
    handleRemoveImage,
    handleChangeImageFeatured,
    handleClickUpload,
    handleShowModalClassesOfCourse,
    handleCancelModalClassesOfCourse
  };
}
