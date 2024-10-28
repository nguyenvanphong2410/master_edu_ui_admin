import { handleUpdateConfigContact } from '@/api/configContact';
import { setConfigContact, setErrorConfigContact } from '@/states/modules/configContact';
import { validate } from '@/utils/validateJoi';
import { message } from 'antd';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
export default function Handle() {
    const dispatch = useDispatch();
    const listContact = useSelector((state) => state.configContact.listContact);
    const errorContact = useSelector((state) => state.configContact.errorContact);
    const isLoadingUpdateConfigContact = useSelector((state) => state.configContact.isLoadingUpdateConfigContact);
    const addContact = () => {
        dispatch(setConfigContact({
            ...listContact,
            socials: [
                ...listContact.socials,
                {
                    link: "",
                    icon: ""
                }
            ]
        }));
    }

    const removeContact = (index) => {
        let newSocials = [...listContact.socials]; 
        if (index >= 0 && index < newSocials.length) {
            newSocials.splice(index, 1); 
        }
        dispatch(setConfigContact({
            ...listContact,
            socials: newSocials
        }));

        let data = _.cloneDeep(errorContact);
        data[`socials.${index}.link`] = '';
        data[`socials.${index}.icon`] = '';
        dispatch(setErrorConfigContact(data));   
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/svg+xml" ||
            file.type === "image/webp" ||
            file.type === "image/gif";
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên các tệp JPG/PNG/SVG+XML/WEBP/GIF!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    
    const handleChangeImg = (info, index, key) => {
        getBase64(info.file.originFileObj, (url) => {
            let data = _.cloneDeep(listContact)
            data.socials[index][key] = info.file.originFileObj;
            data.socials[index].iconUrl = url;
            dispatch(setConfigContact(data));
        });
    };

    const onChangeLink = (value, index, key) => {
        let data = _.cloneDeep(listContact)
        data.socials[index][key] = value;
        dispatch(setConfigContact(data));
    }

    const onChangeInput = (value, key) => {
        let data = _.cloneDeep(listContact)
        data[key] = value;
        dispatch(setConfigContact(data));
    }

    const handleUpdateContact = (scheme, data) => {
        validate(scheme, data, {
            onSuccess: (data) => dispatch(handleUpdateConfigContact(data)),
            onError: (error) => dispatch(setErrorConfigContact(error)),
        });
    };

    const onFocusInput =  (key, index = null) => {
        let data = _.cloneDeep(errorContact);
        if (index === null) {
            data[key] = '';
        } else {
            if (key === 'link' && data[`socials.${index}.link`]) {
                data[`socials.${index}.link`] = '';
            }
            if (key === 'icon' && data[`socials.${index}.icon`]) {
                data[`socials.${index}.icon`] = '';
            }
        }
        dispatch(setErrorConfigContact(data));
    }
    
    return {
        listContact,
        isLoadingUpdateConfigContact,
        addContact,
        removeContact,
        handleChangeImg,
        beforeUpload,
        onChangeLink,
        onChangeInput,
        handleUpdateContact,
        errorContact,
        onFocusInput,
    };
}
