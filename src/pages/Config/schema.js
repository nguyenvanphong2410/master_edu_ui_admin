import Joi from "joi";
import { BANK_TEMPLATE_OPTIONS } from "../../utils/constants";

export const bankSchema = Joi.object({
  bank_id: Joi.string().required().label("Mã ngân hàng"),
  account_no: Joi.string().required().label("Số tài khoản"),
  template: Joi.string()
    .valid(...Object.values(BANK_TEMPLATE_OPTIONS))
    .required()
    .label("Template"),
  account_name: Joi.string().required().label("Tên chủ sở hữu"),
});

export const larkSchema = Joi.object({
  app_id: Joi.string().required().label("App ID"),
  app_secret: Joi.string().required().label("App Secret"),
  group_id: Joi.string().required().label("Group ID"),
  oauth_url: Joi.string().required().label("OAuth Url"),
  message_url: Joi.string().required().label("Message Url"),
});

export const otpSchema = Joi.object({
  url: Joi.string().required().label("URL"),
  app_key: Joi.string().required().label("SMS Secret key"),
  template_register: Joi.string().required().label("Nội dung tin nhắn đăng ký"),
  template_forgot_password: Joi.string()
    .required()
    .label("Nội dung tin nhắn quên mật khẩu"),
});

export const serviceSchema = Joi.object({
  token: Joi.string().required().label("Token"),
  name_based_on_birth_api: Joi.string().required().label("URL gợi ý tên đẹp"),
  compatibility_by_birth_and_name_api: Joi.string().required().label("URL xem tên phù hợp với con"),
});
