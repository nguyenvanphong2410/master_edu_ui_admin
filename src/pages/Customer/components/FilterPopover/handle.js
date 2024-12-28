import { getListCustomers } from '@/api/customer';
import { setDataFilter, setVisiblePopoverSelect } from '@/states/modules/customer'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.customer.dataFilter)
  
  const handleFilterTableCustomer = (type, value) => {
    if (type === 'course_id_of_student') {
      dispatch(setDataFilter({...dataFilter, course_id_of_student: value}))
    }
    if (type === 'class_id_of_student') {
      dispatch(setDataFilter({...dataFilter, class_id_of_student: value}))
    }
  }
  
  const handleCancelPopoverSelect = () => {
    dispatch(setVisiblePopoverSelect(false))
  }
  
  const handleFilterCustomer = () => {
    dispatch(setVisiblePopoverSelect(false))
    dispatch(getListCustomers(dataFilter))
  }
  
  return {
    handleFilterTableCustomer,
    handleCancelPopoverSelect,
    handleFilterCustomer,
  }
}
