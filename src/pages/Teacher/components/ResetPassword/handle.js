import {useDispatch, useSelector} from "react-redux";
import {setErrorResetPasswordTeacher} from "../../../../states/modules/teacher/index.js";
import _ from "lodash";
import {useEffect, useState} from "react";
import {handleCheckValidateConfirm} from "../../../../utils/helper.js";
import {resetPasswordTeacher} from "../../../../api/teacher/index.js";

export default function Handle(){
  const idTeacher = useSelector(state => state.teacher.idTeacher);
  const visibleModalResetPassword = useSelector(state => state.teacher.visibleModalResetPassword);
  const errorResetPassword = useSelector(state => state.teacher.errorResetPassword);
  const isLoadingBtnResetPassword = useSelector(state => state.teacher.isLoadingBtnResetPassword);
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
      dispatch(setErrorResetPasswordTeacher({
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
    dispatch(setErrorResetPasswordTeacher(validate.dataError))
    if (!validate.isError) {
      dispatch(resetPasswordTeacher(idTeacher, dataResetPassword))
    }
  }

  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorResetPassword);
    dataError[type] = '';
    dispatch(setErrorResetPasswordTeacher(dataError));
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