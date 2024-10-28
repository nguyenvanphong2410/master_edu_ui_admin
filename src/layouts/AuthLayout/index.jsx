import React, { useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import theme from '../../assets/images/theme/theme.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { goToPageSuccess } from '../../states/modules/app/index.js';

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  title: '',
  description: '',
};

function AuthLayout(props) {
  const { children, title, description } = props;
  const goToPage = useSelector((state) => state.app.goToPage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
      dispatch(goToPageSuccess());
      navigate(goToPage.path);
    }
  }, [goToPage, navigate, dispatch]);

  return (
    <div className={styles.authLoginWrap}>
      <div className={styles.contentWrap}>
        <div className={styles.contentContainer}>
          <div className={styles.formWrap}>
            <div className={styles.content}>
              <div className={styles.header}>{title}</div>
              <div className={styles.headerDetail}>{description}</div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.viewWrap} style={{ backgroundImage: `url(${theme})` }}></div>
    </div>
  );
}

export default AuthLayout;
