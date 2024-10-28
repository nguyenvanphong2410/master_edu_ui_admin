import { VALIDATE_EMAIL_REGEX, VALIDATE_PHONE_CONTACT_REGEX_RULE, VALIDATE_URL_REGEX } from '@/utils/helper';
import Joi from 'joi';

export const updateConfigContactSchema = Joi.object({
    email: Joi.string().required().regex(VALIDATE_EMAIL_REGEX).label('Email liên hệ'),
    phone: Joi.string().required().trim().regex(VALIDATE_PHONE_CONTACT_REGEX_RULE).label('Số điện thoại liên hệ'),
    socials: Joi.array()
        .items(
            Joi.object({
                link: Joi.string().regex(VALIDATE_URL_REGEX).required().label('Liên kết'),
                icon: Joi.alternatives().try(
                    Joi.string().required().label('Ảnh'),
                    Joi.object().required().label('Ảnh')
                ).required().label('Ảnh')
            }).custom((value, helpers) => {
                if (!value.link && !value.icon) {
                    return helpers.message('Liên kết và Ảnh không được trống cùng lúc');
                }
                return value;
            })
        )
        .required()
        .label('Mạng xã hội')
});
