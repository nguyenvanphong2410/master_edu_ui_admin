import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import styles from './styles.module.scss';
import './styles.scss';
import Handle from './handle.js';
import { Badge, Button, Card, Col, Empty, Input, Popover, Row, Tooltip } from 'antd';
import { formatMoney, hasPermission } from '../../utils/helper.js';
import IconEdit from '../../assets/images/icons/duotone/pencil.svg';
import IconDelete from '../../assets/images/icons/duotone/trash-can.svg';
import IconStar from '@/assets/images/icons/duotone/star.svg';
import IconStarSolid from '@/assets/images/icons/duotone/star-solid.svg';
import InlineSVG from 'react-inlinesvg';
import LoadingCard from './components/LoadingCard/index.jsx';
import ModalDefault from '../../components/Modal/index.jsx';
import ModalCreateOrUpdateCourse from './components/CreateOrUpdateCourse/index.jsx';
import { PACKAGE_TYPE, PERMISSIONS, TYPE_MODAL_PACKAGE } from '../../utils/constants.js';
import ModalDeleteDefault from '../../components/ModalDelete/index.jsx';
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import { useDebounce } from '@/utils/hooks/useDebounce.js';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilterCourse } from '@/states/modules/course/index.js';
import { handleGetListDataCourses } from '@/api/course/index.js';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import moment from 'moment';
import PlusIcon from '@/assets/images/icons/light/plus.svg';
import { useNavigate } from 'react-router-dom';

export default function CourseManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFilter = useSelector((state) => state.course.dataFilter);
  const debouncedQuery = useDebounce(dataFilter.keySearch, 500);

  const {
    courses,
    isLoadingCardCourses,
    visibleModalCreateOrUpdateCourse,
    configModalCourse,
    isLoadingBtnDelete,
    visibleModalDeleteCourse,
    infoCourses,
    handleCancelModalCreateOrUpdateCourse,
    handleShowModalCreateCourse,
    handleShowModalUpdateCourse,
    handleShowModalDeleteCourses,
    handleCancelModalDeleteCourse,
    handleSubmitDeleteCourse,
    handleSubmitChangeHighlightCourse,
  } = Handle();

  useEffect(() => {
    dispatch(setDataFilterCourse({ ...dataFilter, keySearch: debouncedQuery }));
    dispatch(handleGetListDataCourses());
  }, [debouncedQuery]);

  const hasAnyPermission = () => {
    return (
      hasPermission([PERMISSIONS.EDIT.EDIT_POPULAR_PACKAGE]) ||
      hasPermission([PERMISSIONS.DELETE.DELETE_PACKAGE]) ||
      hasPermission([PERMISSIONS.EDIT.EDIT_PACKAGE])
    );
  };

  const hanleClickViewDetails = (item) => {
    navigate(`/details-course/${item._id}`);
  };

  return (
    <MainLayout>
      <section className={styles.listWrap}>
        <div className={styles.headlistWrap}>
          <Input
            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
            className={`main-input w-[350px]`}
            placeholder={'Tìm kiếm khóa học theo mã hoặc tên'}
            value={dataFilter.keySearch}
            onChange={(e) =>
              dispatch(
                setDataFilterCourse({
                  ...dataFilter,
                  keySearch: e.target.value,
                })
              )
            }
          />
          {hasPermission([PERMISSIONS.ADD.ADD_COURSE]) && (
            <Button
              icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} />}
              className={`md:flex items-center main-btn-primary h-full s:hidden`}
              size={'large'}
              onClick={() => handleShowModalCreateCourse(TYPE_MODAL_PACKAGE.CREATE)}
            >
              Tạo mới
            </Button>
          )}
        </div>

        {courses?.length === 0 ? (
          isLoadingCardCourses ? (
            <LoadingCard />
          ) : (
            <div className={'no-data-wrap'}>
              <Empty description={'Không có dữ liệu'} />
            </div>
          )
        ) : (
          <Row className="mt-[20px]" gutter={[40, 25]}>
            {courses.map((item, index) => (
              <Col className="gutter-row" key={index} span={12}>
                <Badge.Ribbon text={`${item.is_highlight ? 'Nổi bật' : ''}`} color="#f6c000">
                  <Card
                    className={`${styles.courseCard} main-card-course flex-1 w-full flex flex-col ${
                      item.type === PACKAGE_TYPE.NEW_ACCOUNT_GIFT ? 'gift-card' : ''
                    }`}
                    title={
                      <div className={`h-[46px] grid items-center`}>
                        <div
                          className="cursor-pointer hover:text-[#335b96] text-[#3781d6]"
                          onClick={() => hanleClickViewDetails(item)}
                        >
                          {item.name}
                        </div>

                        {item.type === PACKAGE_TYPE['NORMALLY'] ? (
                          <div className="text-[13px] font-normal block">
                            <span className="mr-2">Giá:</span>
                            <del className="text-[#bb2a2a] italic">{formatMoney(item.original_price)}</del> |{' '}
                            <span className="text-green-45 font-bold">{formatMoney(item.current_price)}</span>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    }
                    extra={<span className="text-blue-65 font-semibold">{item.code}</span>}
                    actions={
                      item.type === PACKAGE_TYPE['NEW_ACCOUNT_GIFT']
                        ? hasPermission([PERMISSIONS.EDIT.EDIT_POPULAR_COURSE]) && [
                            <Tooltip key="edit" placement="top" title={'Cập nhật'}>
                              <div className="btn-table-action">
                                <div
                                  className="btn-edit"
                                  onClick={() => handleShowModalUpdateCourse(item, TYPE_MODAL_PACKAGE.UPDATE)}
                                >
                                  <InlineSVG src={IconEdit} width={18} height={20} />
                                </div>
                              </div>
                            </Tooltip>,
                          ]
                        : [
                            <>
                              {hasPermission([PERMISSIONS.EDIT.EDIT_COURSE]) && (
                                <Tooltip key="edit" placement="top" title={'Cập nhật'}>
                                  <div className="btn-table-action">
                                    <div
                                      className="btn-edit"
                                      onClick={() => handleShowModalUpdateCourse(item, TYPE_MODAL_PACKAGE.UPDATE)}
                                    >
                                      <InlineSVG src={IconEdit} width={18} height={20} />
                                    </div>
                                  </div>
                                </Tooltip>
                              )}
                            </>,
                            <>
                              {hasPermission([PERMISSIONS.DELETE.DELETE_COURSE]) && (
                                <Tooltip key="delete" placement="top" title={'Xoá'}>
                                  <div className="btn-table-action">
                                    <div className="btn-delete" onClick={() => handleShowModalDeleteCourses(item)}>
                                      <InlineSVG src={IconDelete} width={16} height={20} />
                                    </div>
                                  </div>
                                </Tooltip>
                              )}
                            </>,
                            <>
                              {hasPermission([PERMISSIONS.EDIT.EDIT_POPULAR_COURSE]) && (
                                <Tooltip key="highlight" placement="top" title={'Phổ biến'}>
                                  {item.is_highlight ? (
                                    <span className="flex justify-center cursor-default text-[#ffcd39] mt-2">
                                      <InlineSVG src={IconStarSolid} width={25} height={20} />
                                    </span>
                                  ) : (
                                    <span
                                      className="flex justify-center text-[#8c8c8c] hover:text-[#ffcd39] mt-2"
                                      onClick={() => handleSubmitChangeHighlightCourse(item._id)}
                                    >
                                      <InlineSVG src={IconStar} width={25} height={20} />
                                    </span>
                                  )}
                                </Tooltip>
                              )}
                            </>,
                          ]
                    }
                  >
                    <Row gutter={20}>
                      <Col span={10}>
                        <img
                          src={item.image_featured ? item.image_featured : imageDefaultClass}
                          crossOrigin="anonymous"
                          alt="img-class"
                          className={`${styles.pictures} cursor-pointer`}
                          onClick={() => hanleClickViewDetails(item)}
                        />
                      </Col>
                      <Col span={14}>
                        <div className={`${styles.contentInfoWrap}`}>
                          <div className={`${styles.itemInfo}`}>
                            <span className={`${styles.fieldName}`}>Thời gian: </span>
                            <span className={`${styles.content}`}>
                              {moment(item.start_time).format('DD/MM/YYYY')} -{' '}
                              {moment(item.end_time).format('DD/MM/YYYY')}
                            </span>
                          </div>
                        </div>
                        <div className={`${styles.contentInfoWrap}`}>
                          <div className={`${styles.itemInfo}`}>
                            <span className={`${styles.fieldName}`}>Người tạo: </span>
                            <span className={`${styles.content}`}>{item.creator.name}</span>
                          </div>
                        </div>
                        <div className={`${styles.contentInfoWrap}`}>
                          <div className={`${styles.itemInfo}`}>
                            <span className={`${styles.fieldName}`}>Người sửa: </span>
                            <span className={`${styles.content}`}>{item.updater.name}</span>
                          </div>
                        </div>
                        <div className={`${styles.contentInfoWrap}`}>
                          <div className={`${styles.itemInfo}`}>
                            <p className={`${styles.fieldName}`}>Mô tả: </p>
                            <Popover
                              placement="top"
                              title={<span className="p-6">Mô tả</span>}
                              content={
                                <div
                                  className={`${styles.textThreeDot} w-64 p-6`}
                                  dangerouslySetInnerHTML={{ __html: item.description }}
                                ></div>
                              }
                            >
                              <span className={`${styles.content} cursor-pointer`}>
                                <div className={`${styles.textThreeDot}`}>
                                  {item.description.length > 100 ? (
                                    <span
                                      dangerouslySetInnerHTML={{ __html: item.description.substring(0, 88) + '...' }}
                                    ></span>
                                  ) : (
                                    <span dangerouslySetInnerHTML={{ __html: item.description }}></span>
                                  )}
                                </div>
                              </span>
                            </Popover>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        )}
        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateCourse}
          handleCancel={handleCancelModalCreateOrUpdateCourse}
          title={configModalCourse.title}
          width={900}
        >
          <ModalCreateOrUpdateCourse />
        </ModalDefault>

        <ModalDeleteDefault
          content={
            <span>
              Bạn có chắc chắn muốn xóa khóa học <strong>{infoCourses?.name}</strong> không?
            </span>
          }
          contentBtn={'Xóa khóa học'}
          isModalOpen={visibleModalDeleteCourse}
          handleCancel={handleCancelModalDeleteCourse}
          handleConfirm={handleSubmitDeleteCourse}
          loading={isLoadingBtnDelete}
        />
      </section>
    </MainLayout>
  );
}
