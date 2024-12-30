
import { getListTeachers } from '@/api/teacher';
import { setDataFilterTeacher, setVisiblePopoverSelect } from '@/states/modules/teacher';
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.teacher.dataFilter)
  
  const handleFilterTableCustomer = (type, value) => {
    if (type === 'course_id_of_teacher') {
      dispatch(setDataFilterTeacher({...dataFilter, course_id_of_teacher: value}))
    }
    if (type === 'class_id_of_teacher') {
      dispatch(setDataFilterTeacher({...dataFilter, class_id_of_teacher: value}))
    }
  }
  
  const handleCancelPopoverSelect = () => {
    dispatch(setVisiblePopoverSelect(false))
  }
  
  const handleFilterCustomer = () => {
    dispatch(setVisiblePopoverSelect(false))
    dispatch(getListTeachers(dataFilter))
  } 
  
  return {
    handleFilterTableCustomer,
    handleCancelPopoverSelect,
    handleFilterCustomer,
  }
}
