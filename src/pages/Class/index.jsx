import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FloatButton, Input, Select } from 'antd';
import InlineSVG from 'react-inlinesvg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';
import ModalDefault from '@/components/Modal';
import Handle from '@/pages/Class/handle';
import { PlusOutlined } from '@ant-design/icons';
import { PERMISSIONS, TYPE_SUBMIT } from '@/utils/constants';
import TableClass from '@/pages/Class/components/ClassItem/components/TableClass';
import { hasPermission } from '@/utils/helper';
import ModalCreateOrUpdateClass from '@/pages/Class/components/ClassItem/components/ModalCreateOrUpdateClass';
import './styles.scss';
import MainLayout from '@/layouts/MainLayout';
import styles from './styles.module.scss';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import ModalDeleteDefault from '@/components/ModalDelete';
import { setDataFilter, setShowModalDeleteClass } from '@/states/modules/class';
import { getListClasses, handleDeleteClass } from '@/api/class';
import { useDebounce } from '@/utils/hooks/useDebounce.js';

function ClassCpn() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.class.dataFilter);
  const configModal = useSelector((state) => state.class.configModal);
  const visibleModalCreateOrUpdateClass = useSelector((state) => state.class.visibleModalCreateOrUpdateClass);
  const visibleModalDeleteClass = useSelector((state) => state.class.visibleModalDeleteClass);
  const isLoadingBtnDeleteClass = useSelector((state) => state.class.isLoadingBtnDeleteClass);
  const classSelected = useSelector((state) => state.class.classSelected);
  const debouncedQuery = useDebounce(dataFilter.keySearch, 500);
  const dataListCourse = useSelector((state) => state.course.allCourse);
  const [courseOption, setCourseOption] = useState([]);

  const { handleShowModalCreateClass, handleCancelModalCreateOrUpdateClass, handleChangeTableClass, infoClass } =
    Handle();

  const handleCancelModalDeleteCourse = () => {
    dispatch(setShowModalDeleteClass(false));
  };

  const handleSubmitDeleteCourse = () => {
    dispatch(handleDeleteClass(classSelected._id));
  };

  const handleFilterSelect = (e, val) => {
    dispatch(setDataFilter({ ...dataFilter, courseName: val?.label, courseId: e }));
    dispatch(getListClasses());
  };

  useEffect(() => {
    dispatch(setDataFilter({ ...dataFilter, keySearch: debouncedQuery }));
    dispatch(getListClasses());
  }, [debouncedQuery]);

  useEffect(() => {
    setCourseOption(
      dataListCourse?.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }, [dataListCourse]);

  return (
    <MainLayout>
      <div className={`${styles.containerClass}`}>
        <div className={`md:px-7 md:py-5 s:p-[10px]`}>
          <div className={`flex justify-between mb-2.5`}>
            <div className="flex">
              <div className={`md:w-96 s:w-full`}>
                <Input
                  prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                  className={`main-input`}
                  placeholder={'Tìm kiếm khóa học theo mã hoặc tên'}
                  value={dataFilter.keySearch}
                  onChange={(e) =>
                    dispatch(
                      setDataFilter({
                        ...dataFilter,
                        keySearch: e.target.value,
                      })
                    )
                  }
                />
              </div>

              <Select
                className={`main-select w-60 ml-5`}
                value={dataFilter?.courseName || null}
                allowClear
                placeholder="Chọn khóa học"
                onChange={(e, val) => handleFilterSelect(e, val)}
                options={courseOption}
                filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
              />
            </div>

            <div className="flex">
              {hasPermission([PERMISSIONS.ADD.ADD_CLASS]) && (
                <>
                  <Button
                    icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
                    className={`md:flex items-center main-btn-primary h-full s:hidden`}
                    size={'large'}
                    onClick={handleShowModalCreateClass}
                  >
                    Tạo mới
                  </Button>
                  <FloatButton
                    onClick={handleShowModalCreateClass}
                    className={`md:hidden bottom-[55px]`}
                    icon={<PlusOutlined />}
                    type="primary"
                  />
                </>
              )}
            </div>
          </div>

          <TableClass handleChangeTableClass={handleChangeTableClass} />

          <ModalDefault
            isModalOpen={visibleModalCreateOrUpdateClass}
            handleCancel={handleCancelModalCreateOrUpdateClass}
            title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
            width={900}
          >
            <ModalCreateOrUpdateClass />
          </ModalDefault>

          <ModalDeleteDefault
            content={
              <span>
                Bạn có chắc chắn muốn xóa lớp <strong>{classSelected?.name}</strong> không?
              </span>
            }
            contentBtn={'Xóa lớp học'}
            isModalOpen={visibleModalDeleteClass}
            handleCancel={handleCancelModalDeleteCourse}
            handleConfirm={handleSubmitDeleteCourse}
            loading={isLoadingBtnDeleteClass}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default ClassCpn;
