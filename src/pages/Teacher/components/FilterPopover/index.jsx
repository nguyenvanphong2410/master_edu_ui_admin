import { Button, Select } from 'antd';
import React from 'react';
import Handle from './handle';
import { useSelector } from 'react-redux';

function FilterPopoverTeacher() {
  const dataAllCourse = useSelector((state) => state.course.allCourse)
  const dataAllClass = useSelector((state) => state.class.allClass)

  const optionCourse = dataAllCourse?.map(item => ({value: item._id, label: <span className="item-option">{item.name}</span>}))
  const optionClass = dataAllClass?.map(item => ({value: item._id, label: <span className="item-option">{item.name}</span>}))

  const {
    handleFilterTableCustomer,
    handleCancelPopoverSelect,
    handleFilterCustomer,
  } = Handle();

  const handleSelect = (type, value) => {
    if (type === 'course_id_of_teacher') {
      handleFilterTableCustomer('course_id_of_teacher', value?.value)
    }
    if (type === 'class_id_of_teacher') {
      handleFilterTableCustomer('class_id_of_teacher', value?.value)
    }
  };

  return (
    <div className={`filter-wrap`}>
      <div className={`filter-content`}>
        <div className={`filter-title-wrap`}>
          <div className={`label-filter`}>Khóa học:</div>
          <Select
            allowClear
            className={`main-select w-full`}
            placeholder="Chọn khóa học"
            onChange={(type, value) => handleSelect('course_id_of_teacher', value)}
            options={optionCourse}
          />
        </div>
        <div className={`filter-title-wrap mt-3`}>
          <div className={`label-filter`}>Lớp học:</div>
          <Select
            allowClear
            className={`main-select w-full`}
            placeholder="Chọn lớp học"
            onChange={(type, value) => handleSelect('class_id_of_teacher', value)}
            options={optionClass}
          />
        </div>
        <div className={`flex justify-center mt-7`}>
          <Button
            className={`main-btn-close mr-2.5`}
            size={'large'}
            onClick={handleCancelPopoverSelect}
          >
            Đóng
          </Button>
          <Button
            className={`main-btn-primary`}
            size={'large'}
            onClick={handleFilterCustomer}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopoverTeacher;
