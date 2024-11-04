import Joi from "joi";
import {MAX_STRING_SIZE, PACKAGE_TYPE} from "../../utils/constants";

export const courseSchema = Joi.object({
  _id: Joi.any(),
  type: Joi.number().integer(),
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tên khóa học"),
  description: Joi.string().trim().max(1500).required().label("Mô tả"),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  start_time: Joi.any().required().label('Thời gian bắt đầu'),
  end_time: Joi.any().required().label('Thời gian kết thúc'),
  original_price: Joi.any()
    .label("Giá tiền gốc").when("type", {
      is: Joi.valid(PACKAGE_TYPE['NORMALLY']),
      then: Joi.number().integer()
        .min(1)
        .empty("")
        .required()
    }),
  current_price: Joi.any()
    .label("Giá tiền hiện tại").when("type", {
      is: Joi.valid(PACKAGE_TYPE['NORMALLY']),
      then: Joi.number().integer()
        .min(1)
        .empty("")
        .required()
    }),
});
 
export const updateCourseSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên khóa học'),
  description: Joi.string().allow(null, '').label('Mô tả'),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  start_time: Joi.any().required().label('Thời gian bắt đầu'),
  end_time: Joi.any().required().label('Thời gian kết thúc'),
  original_price: Joi.any()
    .label("Giá tiền gốc").when("type", {
      is: Joi.valid(PACKAGE_TYPE['NORMALLY']),
      then: Joi.number().integer()
        .min(1)
        .empty("")
        .required()
    }),
  current_price: Joi.any()
    .label("Giá tiền hiện tại").when("type", {
      is: Joi.valid(PACKAGE_TYPE['NORMALLY']),
      then: Joi.number().integer()
        .min(1)
        .empty("")
        .required()
    }),
});

export const courseGiftSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên khóa học'),
  point: Joi.number().integer().min(1).required().empty('').label('Điểm')
});

