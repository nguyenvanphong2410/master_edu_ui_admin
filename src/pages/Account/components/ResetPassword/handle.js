import {useDispatch, useSelector} from "react-redux";
import {setErrorResetPassword} from "../../../../states/modules/user/index.js";
import _ from "lodash";
import {useEffect, useState} from "react";
import {handleCheckValidateConfirm} from "../../../../utils/helper.js";
import {resetPasswordUser} from "../../../../api/user/index.js";

export default function Handle(){
  const idUser = useSelector(state => state.user.idUser);
  const visibleModalResetPassword = useSelector(state => state.user.visibleModalResetPassword);
  const errorResetPassword = useSelector(state => state.user.errorResetPassword);
  const isLoadingBtnResetPassword = useSelector(state => state.user.isLoadingBtnResetPassword);
  const [dataResetPassword, setDataResetPassword] = useState({
    password: '',
    confirm_password: '',
  });
  const dispatch = useDispatch()

  useEffect(() => {
    setDataResetPassword({
      password: '',
      confirmPassword: '',
    })
  }, [visibleModalResetPassword]);

  const handleReloadError = () => {
    if (
      errorResetPassword.password.length !== 0 ||
      errorResetPassword.confirmPassword.length !== 0
    ) {
      dispatch(setErrorResetPassword({
        password: '',
        confirmPassword: '',
      }))
    }
  }

  const handleChangeInput = (e, type) => {
    handleReloadError();
    let value = e.target.value;
    let data = _.cloneDeep(dataResetPassword);
    data[type] = value
    setDataResetPassword(data)
  }

  const handleConfirmReset = () => {
    let validate = handleCheckValidateConfirm(dataResetPassword, errorResetPassword);
    dispatch(setErrorResetPassword(validate.dataError))
    if (!validate.isError) {
      dispatch(resetPasswordUser(idUser, dataResetPassword))
    }
  }

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorResetPassword);
    dataError[type] = '';
    dispatch(setErrorResetPassword(dataError));
  };

  return {
    dataResetPassword,
    errorResetPassword,
    isLoadingBtnResetPassword,
    handleChangeInput,
    handleConfirmReset,
    handleFocus
  }
}