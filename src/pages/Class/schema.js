import {MAX_STRING_SIZE} from '@/utils/constants';
import Joi from 'joi';

export const createClassSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên lớp học'),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  file_record: Joi.any().allow(null, '').label('File lớp học'),
  notes: Joi.string().allow(null, '').label('Ghi chú'),
  name_file: Joi.string().trim().allow(null, '').label('Tên file'),
  course_id: Joi.string().trim().label('Khóa học'),
  teacher_id: Joi.string().required().trim().label('Giáo viên'),
  student_ids: Joi.array().items(Joi.string().trim().label('Học viên')).label('khóa học'),
  max_number_student: Joi.number().min(0).allow(null, "").label("Số lượng học viên tối đa").strict(),
});

export const updateClassSchema = Joi.object({
  name: Joi.string().trim().max(MAX_STRING_SIZE).required().label('Tên lớp học'),
  images: Joi.any().allow(null, '').label('Ảnh mô tả'),
  file_record: Joi.any().allow(null, '').label('File lớp học'),
  notes: Joi.string().allow(null, '').label('Ghi chú'),
  name_file: Joi.string().trim().allow(null, '').label('Tên file'),
  course_id: Joi.string().trim().label('Khóa học'),
  teacher_id: Joi.string().required().trim().label('Giáo viên'),
  student_ids: Joi.array().items(Joi.string().trim().label('Học viên')).label('khóa học'),
  max_number_student: Joi.number().min(0).label("Số lượng học viên tối đa"),
});

export const changeStatus = Joi.object({
  // status: Joi.string()
  //   .valid(...Object.values(PRODUCT_STATUS))
  //   .label('Trạng thái')
  //   .messages({'any.only': 'Trạng thái không hợp lệ.'}),
});
