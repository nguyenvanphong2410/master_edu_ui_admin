import '../styles.scss'
import imageDefaultClass from '@/assets/images/class/image-default.png'
import IconEditClass from '@/assets/images/icons/duotone/pencil.svg'
import Close from '@/assets/images/icons/duotone/xmark.svg'
import { Tooltip } from 'antd'
import { setInfoClass } from '@/states/modules/class'
import { useDispatch, useSelector } from 'react-redux'
import Handle from '@/pages/Class/handle'
import InlineSVG from 'react-inlinesvg'

function PicturesClass({ type, dataImage }) {
    const dispatch = useDispatch()
    const infoClass = useSelector((state) => state.class.infoClass)
    const {
        handleChangePicturesClass
    } = Handle()

    return (
        <>
            <div className={`flex relative ml-2 mr-5`} >
                <input
                    id={type}
                    type="file"
                    accept="image/*"
                    className={`hidden`}
                    onChange={(file) => handleChangePicturesClass(file, type)}
                />
                <Tooltip title="Chỉnh sửa ảnh phòng">
                    <label
                        className={`icon-img-class icon-edit-img-class`}
                        htmlFor={type}
                    >
                        <InlineSVG src={IconEditClass} alt="" className={`icon-action`} />
                    </label>
                </Tooltip>
                <Tooltip title="Xóa ảnh phòng">
                    <div
                        className={`icon-img-class icon-remove-img-class`}
                        onClick={() => dispatch(setInfoClass({ ...infoClass, [`${type}Url`]: '', [`${type}`]: '' }))}
                    >
                        <InlineSVG src={Close} alt="" className={`icon-action`} />
                    </div>
                </Tooltip>
                <div className={``}>
                    <img
                        src={dataImage ? dataImage : imageDefaultClass}
                        crossOrigin="anonymous"
                        alt="img-class"
                        className={`img-avt-class`}
                    />
                </div>
            </div>
        </>
    )
}

export default PicturesClass