import {
  setClassSelected,
  setConfigModal,
  setDataFilter,
  setErrorInfoClass,
  setInfoClass,
  setShowModalDeleteClass,
  setVisibleModalCreateOrUpdateClass
} from '@/states/modules/class'
import {useDispatch, useSelector} from 'react-redux'
import { getListClasses } from '@/api/class'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.class.dataFilter)
  
  const handleShowModalUpdateClass = (item, type) => {
    dispatch(setConfigModal({
      title: "Thông tin lớp học",
      type
    }));

    let imageClasses = [];
    item.images_src.forEach(function(image,index){
      imageClasses.push({
        id: index+1,
        name: image,
        url: image,
        is_featured: item.image_featured === image,
        file: item.images[index]
      })
    })
    dispatch(setInfoClass({
      ...item,
      images: imageClasses,
    }))
    dispatch(
      setErrorInfoClass({
        name: "",
        images: "",
        sale_price: "",
        wholesale_price: "",
        cost_price: "",
        unit: "",
        quantity: "",
        description: "",
        course_id: "",
      })
    )
    dispatch(setVisibleModalCreateOrUpdateClass(true));
  }
  
  const handleChangePaginationClass = (event) => {
    dispatch(
      setDataFilter({
        ...dataFilter,
        page: event,
      })
    )
    dispatch(getListClasses())
  }
  
  const handleDeleteClassAlert = (record) => {
    dispatch(setShowModalDeleteClass(true))
    dispatch(setClassSelected(record))
  };

  return {
    handleShowModalUpdateClass,
    handleDeleteClassAlert,
    handleChangePaginationClass
  }
}
