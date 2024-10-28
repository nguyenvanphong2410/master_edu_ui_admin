import {useDispatch, useSelector} from 'react-redux';
import {
  setDataFilter,
  setConfigModal,
  setInfoClass,
  setErrorInfoClass,
  setVisibleModalCreateOrUpdateClass,
  setImageList,
} from '@/states/modules/class';
import {getListClasses, handleCreateClass, handleUpdateClass} from '@/api/class';
import {TYPE_FILE, TYPE_IMAGE, TYPE_SUBMIT} from '@/utils/constants';
import {getNotification} from '@/utils/helper';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import { initErrInfoClass, initInfoClass } from '@/states/modules/class/initState';
import avatarDefault from '@/assets/images/user/default-avatar-point.png'
import { Avatar } from 'antd';
import { validate } from '@/utils/validateJoi';
import moment from 'moment';

export default function Handle() {
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState('');
  const [courseOption, setCourseOption] = useState([]);
  const [teacherOption, setTeacherOption] = useState([]);
  const [studentOption, setStudentOption] = useState([]);

  const infoClass = useSelector((state) => state.class.infoClass);
  const errorInfoClass = useSelector((state) => state.class.errorInfoClass);
  const dataFilter = useSelector((state) => state.class.dataFilter);
  const paginationListClass = useSelector((state) => state.class.paginationListClass);
  const dataListCourse = useSelector((state) => state.package.allCourse);
  const dataAllTeacher = useSelector((state) => state.teacher.allTeacher);

  const dataAllStudent = useSelector((state) => state.customer.allCustomers);
  // const dataAllStudent = [];

  useEffect(() => {
    setCourseOption(
      dataListCourse?.map((item) => ({
        value: item._id,
        label: <span>
          <span className='font-semibold'>{item.name}</span> | {moment(item.start_time).format('DD/MM/YYYY')} - {moment(item.end_time).format('DD/MM/YYYY')}
        </span>,
      }))
    );

    setTeacherOption(
      dataAllTeacher?.map((item) => ({
        value: item._id,
        label: <div className={`flex`}>
        <Avatar
          className={`w-5 h-5 shadow mt-1`}
          crossOrigin="anonymous"
          src={item.avatar ? item.avatar : avatarDefault}
        />
        <div className={`ml-[5px] font-medium flex`}>
          <div className={`name-user`}>{item.name}</div>
          <div className='mt-[-1px]'>
            <span className={`text-black-content ml-1 mr-1 md:text-sm s:text-xs`}>-</span>
            <span >{item.email}</span>
          </div>
        </div>
      </div>
      }))
    );

    setStudentOption(
      dataAllStudent?.map((item) => ({
        value: item._id,
        label: <div className={`flex`}>
        <Avatar
          className={`w-5 h-5 shadow`}
          crossOrigin="anonymous"
          src={item.avatar ? item.avatar : avatarDefault}
        />
        <div className={`ml-[5px] font-medium flex`}>
          <div className={`name-user`}>{item.name}</div>
          <div className='mt-[-1px]'>
            <span className={`text-black-content ml-1 mr-1 md:text-sm s:text-xs`}>-</span>
            <span >{item.email}</span>
          </div>
        </div>
      </div>
      }))
    );
  }, []);

  const handleSearchClass = (value) => {
    dispatch(setDataFilter({...dataFilter, keySearch: value}));
    if (!value) {
      dispatch(getListClasses());
    }
  };

  const handleEnterSearchClass = (event) => {
    if (event.key === 'Enter') {
      dispatch(setDataFilter({...dataFilter, page: 1}));
      dispatch(getListClasses());
    }
  };

  const handleChangeSelectClass = (perPage) => {
    dispatch(setDataFilter({...paginationListClass, perPage, page: 1}));
    dispatch(getListClasses());
  };

  const handleChangePicturesClass = (file, type) => {
    if (file.target.files[0]) {
      let currentFile = file.target.files[0];
      let fileUrl = URL.createObjectURL(file.target.files[0]);
      let dataError = '';
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không được vượt quá 2MB.';
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh phòng chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
      }

      if (dataError) {
        getNotification('error', dataError);
      } else {
        let dataCloneDeep = _.cloneDeep(infoClass);
        switch (type) {
          case 'pictures_one':
            dataCloneDeep[`pictures_one`] = currentFile;
            dataCloneDeep[`pictures_one_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_ONE;
            break;
          case 'pictures_two':
            dataCloneDeep[`pictures_two`] = currentFile;
            dataCloneDeep[`pictures_two_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_TWO;
            break;
          case 'pictures_three':
            dataCloneDeep[`pictures_three`] = currentFile;
            dataCloneDeep[`pictures_three_url`] = fileUrl;
            dataCloneDeep[`type_image`] = TYPE_IMAGE.PICTURE_THREE;
            break;
          default:
            break;
        }

        dispatch(setInfoClass(dataCloneDeep));
      }
    }
  };

  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoClass);
    let dataError = _.cloneDeep(errorInfoClass);
    let nameFile = infoClass.name_file;
    if (type === 'time') {
      data['start_time'] = value[0].toDate();
      data['end_time'] = value[1].toDate();
    } else {
      data[type] = value;
    }

    if (type === 'file_record') {
      if (value.target.files.length > 0) {
        nameFile = value.target.files[0].name
        setFileName(nameFile);
        dispatch(setInfoClass({...data, name_file: nameFile}));
      }
    }

    if (type === 'student_ids') {
      data[type] = value;
    } else {
      data[type] = value;
    }
    if (type === 'file_record') {
      data[type] = value.target.files[0];
    }

    dataError[type] = '';
    dispatch(setInfoClass({...data, name_file: nameFile}));
    dispatch(setErrorInfoClass(dataError));
  };

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoClass);
    dataError[type] = '';
    if(type =='time') {
      dataError['start_time'] = '';
      dataError['end_time'] = '';
    }
    dispatch(setErrorInfoClass(dataError));
  };

  const handleSubmit = (type, scheme, dataClass) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataClass, {
        onSuccess: (data) => dispatch(handleCreateClass(data)),
        onError: (error) => dispatch(setErrorInfoClass(error)),
      });
    }

    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataClass, {
        onSuccess: (data) => dispatch(handleUpdateClass(dataClass._id, dataClass)),
        onError: (error) => dispatch(setErrorInfoClass(error)),
      });
    }
  };

  const handleShowModalCreateClass = () => {
    dispatch(
      setConfigModal({
        title: 'Tạo mới lớp học',
        type: TYPE_SUBMIT.CREATE,
      })
    );
    dispatch(
      setInfoClass(initInfoClass)
    );
    dispatch(setVisibleModalCreateOrUpdateClass(true));
    dispatch(setImageList([]));
  };

  const handleCancelModalCreateOrUpdateClass = () => {
    dispatch(
      setErrorInfoClass(initErrInfoClass)
    );
    dispatch(
      setInfoClass(initInfoClass)
    );
    dispatch(setVisibleModalCreateOrUpdateClass(false));
  };

  const handleChangeImage = (file) => {
    let maxImage = infoClass.images.length;
    let listImage = _.values(file.target.files);
    if (listImage.length > 0) {
      let recordClass = _.cloneDeep(infoClass);
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
          recordClass.images.push({
            id: maxImage + 1,
            name: fileItem.name,
            file: fileItem,
            url: fileUrl,
            is_featured: recordClass.images.length === 0,
          });
          maxImage++;
        }
      });
      dispatch(setInfoClass(recordClass));
    }
  };

  const handleClickUpload = () => {
    document.getElementById('inputFile').click();
  };

  const handleChangeImageFeatured = (imageId) => {
    let newInfoClass = _.cloneDeep(infoClass);
    newInfoClass.images.forEach((image) => {
      image.is_featured = image.id === imageId;
    });
    dispatch(setInfoClass(newInfoClass));
  };

  const handleRemoveImage = (imageId) => {
    let newInfoClass = _.cloneDeep(infoClass);
    let featured = false;
    newInfoClass.images = _.filter(infoClass.images, function (o) {
      if (o.id === imageId && o.is_featured) {
        featured = true;
      }
      return o.id !== imageId;
    });
    dispatch(setInfoClass(newInfoClass));
  };

  const handleChangeTableClass = (pagination, filters, sorter) => {
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
      setDataFilter({
        ...dataFilter,
        sort_order: sortOrder,
        column,
      })
    );
    dispatch(getListClasses());
  };

  const handleRemoveFile = () => {
    setFileName('');
  };

  return {
    dispatch,
    courseOption,
    teacherOption,
    studentOption,
    fileName,
    infoClass,
    handleSearchClass,
    handleEnterSearchClass,
    handleChangeSelectClass,
    handleSubmit,
    handleChangePicturesClass,
    handleChangeInputInfo,
    handleFocus,
    handleShowModalCreateClass,
    handleCancelModalCreateOrUpdateClass,
    handleChangeImage,
    handleClickUpload,
    handleChangeImageFeatured,
    handleRemoveImage,
    handleChangeTableClass,
    handleRemoveFile,
  };
}
