import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '../../../../src/assets/images/logos/user_default.png'
import InlineSVG from 'react-inlinesvg';
import barsIcon from '../../../assets/images/icons/duotone/bars.svg'
import { useDispatch, useSelector } from 'react-redux';
import { handleSetIsShowSideBar } from '../../../states/modules/app';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import Breadcrumb from './components/Breadcrumb';

const Header = () => {

const dispatch = useDispatch()

const windowSize = useWindowSize()
const authUser = useSelector((state) => state.auth.authUser);

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerLeftWrap}>
      {
        ((windowSize.width <= 576)) ? 
        <InlineSVG onClick={()=>dispatch(handleSetIsShowSideBar(true))} src={barsIcon} width={20} alt="" className={`cursor-pointer`}/> : ""
      }
      <Breadcrumb/>
      </div>
      <div className={`${styles.headerRightWrap}`}>
        <div className={`${styles.itemHeaderRight}`}>
          <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo} trigger="click">
            <div className={styles.infoWrap}>
              <div className={styles.avatarWrap}>
              <img crossOrigin="anonymous" src={authUser.avatar ? authUser.avatar : ImageUser} alt="" />
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
}

export default Header
