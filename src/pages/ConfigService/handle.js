import { handleUpdateInfoConfigServices } from '@/api/configService';
import { setErrorInfoConfigServices, setInfoConfigServices } from '@/states/modules/configService';
import { validate } from '@/utils/validateJoi';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

export default function Handle() {
  const dispatch = useDispatch();
  const infoConfigServices = useSelector((state) => state.configService.infoConfigServices);
  const errorInfoConfigServices = useSelector((state) => state.configService.errorInfoConfigServices);
  const configServiceNames = useSelector((state) => state.configService.configServiceNames);


  const handleFocus = (key) => {
    let dataError = _.cloneDeep(errorInfoConfigServices);
    dataError[key] = '';
    dispatch(setErrorInfoConfigServices(dataError));
  };

  const handleChangeInputInfo = (value, key, index) => {
    let data = _.cloneDeep(infoConfigServices);
    let arrData = _.cloneDeep(infoConfigServices.config_services);
    let dataError = _.cloneDeep(errorInfoConfigServices);
    arrData[index][key] = value;
    dataError[`config_services.${index}.${key}`] = '';
    dispatch(
      setInfoConfigServices({
        ...data,
        config_services: arrData,
      })
    );
    dispatch(setErrorInfoConfigServices(dataError));
  };

  const handleSubmit = (scheme, data) => {
    validate(scheme, data, {
      onSuccess: (data) => dispatch(handleUpdateInfoConfigServices(data)),
      onError: (error) => dispatch(setErrorInfoConfigServices(error)),
    });
  };

  return {
    infoConfigServices,
    errorInfoConfigServices,
    configServiceNames,
    handleFocus,
    handleChangeInputInfo,
    handleSubmit,
  };
}
