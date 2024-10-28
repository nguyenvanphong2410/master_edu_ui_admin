import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import _ from "lodash";
import { BANK_TEMPLATE_OPTIONS, CONFIG_TYPE } from "../../utils/constants";
import {
  setErrorInfoBank,
  setErrorInfoLark,
  setErrorInfoSMS,
  setErrorService,
  setUpdateInfoBank,
  setUpdateInfoLark,
  setUpdateInfoSMS,
  setUpdateService,
} from "../../states/modules/config";
import { validate } from "../../utils/validateJoi";
import { handleUpdateInfoBanks, handleUpdateInfoLarks, handleUpdateInfoOtp, handleUpdateService } from "../../api/config";
import { Tooltip } from "antd";
import compact from "@/assets/images/qr/compact.jpg"
import compact2 from "@/assets/images/qr/compact2.jpg"
import print from "@/assets/images/qr/print.jpg"
import qrOnly from "@/assets/images/qr/qr-only.jpg";

export default function Handle() {
  const dispatch = useDispatch();
  const updateInfoBank = useSelector((state) => state.config.updateInfoBank);
  const updateInfoLark = useSelector((state) => state.config.updateInfoLark);
  const updateInfoSMS = useSelector((state) => state.config.updateInfoSMS);
  const errorInfoBank = useSelector((state) => state.config.errorInfoBank);
  const errorInfoLark = useSelector((state) => state.config.errorInfoLark);
  const errorInfoSMS = useSelector((state) => state.config.errorInfoSMS);
  const updateService = useSelector((state) => state.config.updateService);
  const errorService = useSelector((state) => state.config.errorService);
  const banks = useSelector((state) => state.config.banks);

  const handleFocus = (type, key) => {
    if (type === CONFIG_TYPE.BANK) {
      let dataError = _.cloneDeep(errorInfoBank);
      dataError[key] = "";
      dispatch(setErrorInfoBank(dataError));
    } else if (type === CONFIG_TYPE.LARK) {
      let dataError = _.cloneDeep(errorInfoLark);
      dataError[key] = "";
      dispatch(setErrorInfoLark(dataError));
    } else if (type === CONFIG_TYPE.OTP) {
      let dataError = _.cloneDeep(errorInfoSMS);
      dataError[key] = "";
      dispatch(setErrorInfoSMS(dataError));
    } else if (type === CONFIG_TYPE.SERVICE) {
      let dataError = _.cloneDeep(errorService);
      dataError[key] = "";
      dispatch(setErrorService(dataError));
    }
  };

  const handleChangeInputInfo = (type, value, key) => {
    if (type === CONFIG_TYPE.BANK) {
      let data = _.cloneDeep(updateInfoBank);
      let dataError = _.cloneDeep(errorInfoBank);
      data[key] = value;
      dataError[key] = "";
      dispatch(setUpdateInfoBank(data));
      dispatch(setErrorInfoBank(dataError));
    } else if (type === CONFIG_TYPE.LARK) {
      let data = _.cloneDeep(updateInfoLark);
      let dataError = _.cloneDeep(errorInfoLark);
      data[key] = value;
      dataError[key] = "";
      dispatch(setUpdateInfoLark(data));
      dispatch(setErrorInfoLark(dataError));
    } else if (type === CONFIG_TYPE.OTP) {
      let data = _.cloneDeep(updateInfoSMS);
      let dataError = _.cloneDeep(errorInfoSMS);
      data[key] = value;
      dataError[key] = "";
      dispatch(setUpdateInfoSMS(data));
      dispatch(setErrorInfoSMS(dataError));
    } else if (type === CONFIG_TYPE.SERVICE) {
      let data = _.cloneDeep(updateService);
      let dataError = _.cloneDeep(errorService);
      data[key] = value;
      dataError[key] = "";
      dispatch(setUpdateService(data));
      dispatch(setErrorService(dataError));
    }
  };

  const handleSubmit = (type, scheme, data) => {
    if (type === CONFIG_TYPE.BANK) {
      validate(scheme, data, {
        onSuccess: (data) => dispatch(handleUpdateInfoBanks(data)),
        onError: (error) => dispatch(setErrorInfoBank(error)),
      });
    } else if (type === CONFIG_TYPE.LARK) {
      validate(scheme, data, {
        onSuccess: (data) => dispatch(handleUpdateInfoLarks(data)),
        onError: (error) => dispatch(setErrorInfoLark(error)),
      });
    } else if (type === CONFIG_TYPE.OTP) {
      validate(scheme, data, {
        onSuccess: (data) => dispatch(handleUpdateInfoOtp(data)),
        onError: (error) => dispatch(setErrorInfoSMS(error)),
      });
    } else if (type === CONFIG_TYPE.SERVICE) {
      validate(scheme, data, {
        onSuccess: (data) => dispatch(handleUpdateService(data)),
        onError: (error) => dispatch(setErrorService(error)),
      });
    }
  };

  const optionTemplate = [
    {
      value: BANK_TEMPLATE_OPTIONS.COMPACT,
      label: <Tooltip 
        title={
          <div >
            <img src={compact} alt="img-compact"/>
          </div>
        } 
        placement="right" 
        color="#fff"
      >
      <div className="w-[calc(100%_+_26px)] h-full">Compact</div>
    </Tooltip>,
    },
    {
      value: BANK_TEMPLATE_OPTIONS.COMPACT2,
      label: <Tooltip 
      title={
        <div>
          <img src={compact2} alt="img-compact2"/>
        </div>
      } 
      placement="right" 
      color="#fff"
    >
    <div className="w-[calc(100%_+_26px)] h-full">Compact2</div>
  </Tooltip>,
    },
    {
      value: BANK_TEMPLATE_OPTIONS.PRINT,
      label: <Tooltip 
      title={
        <div>
          <img src={print} alt="img-print"/>
        </div>
      } 
      placement="right" 
      color="#fff"
    >
    <div className="w-[calc(100%_+_26px)] h-full">Print</div>
  </Tooltip>,
    },
    {
      value: BANK_TEMPLATE_OPTIONS.QR_ONLY,
      label: <Tooltip 
      title={
        <div>
          <img src={qrOnly} alt="img-qr-only"/>
        </div>
      } 
      placement="right" 
      color="#fff"
    >
    <div className="w-[calc(100%_+_26px)] h-full">Qr only</div>
  </Tooltip>,
    },
  ];

  const optionBank = banks?.map(item => ({
    value: item.code, 
    label: <span>{`${item.code} - ${item.name}`}</span>
  }))

  return {
    updateInfoBank,
    updateInfoLark,
    updateInfoSMS,
    updateService,
    errorInfoBank,
    errorInfoLark,
    errorInfoSMS,
    errorService,
    optionTemplate,
    optionBank,
    handleFocus,
    handleChangeInputInfo,
    handleSubmit,
  };
}
