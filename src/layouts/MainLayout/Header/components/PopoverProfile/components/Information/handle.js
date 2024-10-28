import {useEffect, useState} from "react";
import _ from "lodash";
import {getNotification, VALIDATE_NAME_REGEX, VALIDATE_PHONE_REGEX_RULE} from "@/utils/helper.js";
import {setErrorInformation, setInfoProfile} from "@/states/modules/profile";
import { updateInformation} from "@/api/profile/index.js";
import {useDispatch, useSelector} from "react-redux";
import { GENDER_USER, TYPE_FILE } from "@/utils/constants";
import { validate } from "@/utils/validateJoi";
import Joi from "joi";

export default function Handle(props) {
  const {handleResetError} = props;

  const dispatch = useDispatch();
  
  const [imageUrl, setImageUrl] = useState(null);

  const infoProfile = useSelector(state => state.profile.infoProfile);
  const errorInformation = useSelector(state => state.profile.errorInformation);
  const isLoadingBtnInformation = useSelector(state => state.profile.isLoadingBtnInformation);
  const authUser = useSelector(state => state.auth.authUser);

  useEffect(() => {
    if (authUser) {
      dispatch(setInfoProfile({
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone,
        avatar: authUser.avatar ? authUser.avatar : null,
        address: authUser.address,
        gender: authUser.gender,
      }))
    }
  }, [authUser])

  useEffect(() => {
    if (authUser) {
      setImageUrl(authUser.avatar)
    }
  }, [authUser])

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(infoProfile);
    data[type] = value
    dispatch(setInfoProfile(data))
  }

  const handleKeyDown = () => {
    handleResetError()
  }

  const updateProfileValidateSchema = Joi.object({
    name: Joi.string()
      .regex(VALIDATE_NAME_REGEX)
      .trim()
      .max(255)
      .required()
      .label("Họ và tên"),
    email: Joi.string()
      .trim()
      .lowercase()
      .email({tlds: {allow: false}})
      .max(255)
      .required()
      .label("Email"),
    phone: Joi.string()
      .trim()
      .allow("", null)
      .pattern(VALIDATE_PHONE_REGEX_RULE)
      .label("Số điện thoại"),
    gender: Joi.string()
      .valid(...Object.values(GENDER_USER))
      .label("Giới tính"),
    address: Joi.string()
      .max(255)
      .allow("", null)
      .label("Địa chỉ"),
    avatar: Joi.any()
  })

  const handleConfirmUpdateInformation = () => {
    validate(updateProfileValidateSchema, infoProfile, {
      onSuccess: () => {
        dispatch(updateInformation(infoProfile));
      },
      onError: (err) => {
        dispatch(setErrorInformation({...errorInformation, ...err}));
      }
    })
  }

  const handleChangeInputAvatar = () => {
    dispatch(setInfoProfile({...infoProfile, avatar: "delete"}));
    setImageUrl("")
  }
  
  const handleChangeAvatar = (file) => {
    if (file.target.files[0]) {
      let dataError = ''
      let currentFile = file.target.files[0]
      let fileUrl = URL.createObjectURL(file.target.files[0])
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không vượt quá 2MB.'
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh đại diện chỉ được hỗ trợ kiểu jpg, jpeg, png, svg, webp.'
      }
      
      if (dataError) {
        getNotification('error', dataError)
      } else {
        dispatch(setInfoProfile({...infoProfile, avatar: currentFile}));
        setImageUrl(fileUrl)
      }
    }
  };

  return {
    infoProfile, errorInformation, isLoadingBtnInformation,
    handleChangeInput, handleConfirmUpdateInformation, handleKeyDown,
    handleChangeInputAvatar,
    handleChangeAvatar,
    imageUrl
  }
}
