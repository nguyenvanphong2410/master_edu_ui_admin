import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import SideBar from './SiderBar';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { goToPageSuccess, handleSetIsShowSideBar } from '../../states/modules/app';
import useWindowSize from '../../utils/hooks/useWindowSize';

function MainLayout(props) {
  const { children } = props;
  const isShowSideBar = useSelector((state) => state.app.isShowSideBar);
  const isThemeLight = useSelector((state) => state.app.isThemeLight);
  const titlePage = useSelector((state) => state.app.title);
  const goToPage = useSelector((state) => state.app.goToPage);
  const breadcrumb = useSelector((state) => state.app.breadcrumb);
  const location = useSelector((state) => state.app.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
      dispatch(goToPageSuccess());
      navigate(goToPage.path);
    }
  }, [goToPage, navigate, dispatch]);

  useEffect(() => {
    if (windowSize.width <= 576) {
      setTimeout(() => dispatch(handleSetIsShowSideBar(false)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // const handleRenderItemBreadCrumb = (index, item) => {
  //   switch (index) {
  //     case 0:
  //       return (
  //         <>
  //           <Link to={'/'}>
  //             <span className={`${styles.text}`}>Trang chủ</span>
  //           </Link>{' '}
  //           {breadcrumb?.length !== 1 && '-'}{' '}
  //         </>
  //       );
  //     case breadcrumb.length - 1:
  //       return (
  //         <Link to={item.path}>
  //           <span className={`${styles.text}`}>{item.name}</span>
  //         </Link>
  //       );
  //     default:
  //       return (
  //         <>
  //           <Link to={item.path}>
  //             <span className={`${styles.text}`}>{item.name}</span>
  //           </Link>{' '}
  //           -{' '}
  //         </>
  //       );
  //   }
  // };

  return (
    <div className={`${styles.boxMainLayout}`}>
      <div className={styles.headerBox}></div>
      <div className={styles.mainLayoutWrap}>
        <SideBar isThemeLight={isThemeLight} isShowSideBar={isShowSideBar} />
        <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
          <Header isShowSideBar={isShowSideBar} />
          <main className={styles.mainContentWrap}>
            <div id="contentOfMainLayout" className={`${styles.content} relative px-[22px]`}>
              {/* <div className="mb-5">
                {titlePage ? (
                  <div className={styles.headerMainWrap}>
                    <div className={styles.titleWrap}>{titlePage}</div>
                  </div>
                ) : (
                  ''
                )}
                {breadcrumb?.length > 0 ? (
                  <div className={styles.breadcrumbWrap}>
                    {breadcrumb.map((item, index) => {
                      return <span key={index}>{handleRenderItemBreadCrumb(index, item)}</span>;
                    })}
                  </div>
                ) : (
                  ''
                )}
              </div> */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
