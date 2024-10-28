export const STATUS_USER = [];
STATUS_USER['DE_ACTIVE'] = 0;
STATUS_USER['ACTIVE'] = 1;

export const ORDER_STATUS = [];
ORDER_STATUS['PENDING'] = 0;
ORDER_STATUS['COMPLETED'] = 1;
ORDER_STATUS['CANCEL'] = 2;

export const ORDER_STATUS_LABEL = [
  {
    key: ORDER_STATUS['PENDING'],
    label: 'Chờ xác nhận',
    color: 'orange',
  },
  {
    key: ORDER_STATUS['COMPLETED'],
    label: 'Đã xác nhận',
    color: 'green',
  },
  {
    key: ORDER_STATUS['CANCEL'],
    label: 'Đã hủy',
    color: 'red',
  },
];

export const PERMISSIONS = {
  SUPER_ADMIN: 'super_admin',
  LIST: {
    LIST_ADMIN: 'list-admin',
    LIST_COURSE: 'list-course',
    LIST_CLASS: 'list-class',
    LIST_ORDER: 'list-order',
    LIST_STUDENT: 'list-student',
    LIST_TEACHER: 'list-teacher',
    LIST_EMPLOYEE: 'list-employee',
    LIST_ROLE: 'list-role',
    LIST_PERMISSION: 'list-permission',
    LIST_CONFIG: 'list-config',
    LIST_CONFIG_BANK: 'list-config-bank',
    LIST_CONFIG_CONTACT: 'list-config-contact',
    LIST_CONFIG_FEEDBACK: 'list-config-feedback',
  },
  ADD: {
    ADD_COURSE: 'add-course',
    ADD_CLASS: 'add-class',
    ADD_STUDENT: 'add-student',
    ADD_TEACHER: 'add-teacher',
    ADD_EMPLOYEE: 'add-employee',
    ADD_ROLE: 'add-role',
    ADD_CONFIG_FEEDBACK: 'add-config-feedback',
  },
  EDIT: {
    EDIT_COURSE: 'edit-course',
    EDIT_POPULAR_COURSE: 'edit-popular-course',
    EDIT_CLASS: 'edit-class',
    EDIT_CONFIRM: 'edit-confirm',
    EDIT_CANCEL: 'edit-cancel',
    EDIT_STUDENT: 'edit-student',
    EDIT_RESET_PASSWORD_STUDENT: 'edit-reset-password-student',
    EDIT_TEACHER: 'edit-teacher',
    EDIT_RESET_PASSWORD_TEACHER: 'edit-reset-password-teacher',
    EDIT_EMPLOYEE: 'edit-employee',
    EDIT_RESET_PASSWORD_EMPLOYEE: 'edit-reset-password-employee',
    EDIT_ROLE: 'edit-role',
    EDIT_PERMISSION: 'edit-permission',
    EDIT_EMPLOYEE_ROLE: 'edit-employee-role',
    EDIT_CONFIG_BANK: 'edit-config-bank',
    EDIT_CONFIG_CONTACT: 'edit-config-contact',
    EDIT_CONFIG_FEEDBACK: 'edit-config-feedback',
  },
  DELETE: {
    DELETE_COURSE: 'delete-course',
    DELETE_CLASS: 'delete-class',
    DELETE_ORDER: 'delete-delete',
    DELETE_STUDENT: 'delete-student',
    DELETE_TEACHER: 'delete-teacher',
    DELETE_EMPLOYEE: 'delete-employee',
    DELETE_ROLE: 'delete-role',
    DELETE_EMPLOYEE_ROLE: 'delete-employee-role',
    DELETE_CONFIG_FEEDBACK: 'delete-config-feedback',
  },
  RESET_PASSWORD: {
    ADMIN: 'reset-password-admin',
    USER: 'reset-password-user',
  },
  DETAIL: {
    DETAIL_STUDENT: 'detail-student',
    DETAIL_COURSE: 'detail-course',
  },
};

export const CONFIG_TYPE = {
  BANK: 'BANK',
  LARK: 'LARK',
  OTP: 'OTP',
  SERVICE: 'SERVICE',
};

export const BANK_TEMPLATE_OPTIONS = {
  COMPACT: 'compact',
  COMPACT2: 'compact2',
  QR_ONLY: 'qr_only',
  PRINT: 'print',
};

export const TYPE_MODAL_PACKAGE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};
export const TYPE_MODAL_FEEDBACK = {
  CREATE: 'CREATE_FEEDBACK',
  UPDATE: 'UPDATE_FEEDBACK',
};

export const MAX_STRING_SIZE = 255;

export const STATUS_CUSTOMER = [];
STATUS_CUSTOMER['DE_ACTIVE'] = 0;
STATUS_CUSTOMER['ACTIVE'] = 1;

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

export const PACKAGE_TYPE = {
  NORMALLY: 0,
  NEW_ACCOUNT_GIFT: 1,
};

export const OPTION_SELECT_LIMIT = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

export const TYPE_SUBMIT = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

export const PROTECTED = {
  UNPROTECTED: 0,
  PROTECTED: 1,
};

export const PAGE_ERROR = {
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
};

export const CUSTOMER_TYPE = {
  UNCONFIRMED: 'unconfirmed',
  CONFIRMED: 'confirmed',
};

export const TYPE_FILE = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/svg+xml',
  'image/webp',
];

export const TYPE_IMAGE = {
  PICTURE_ONE: 'PICTURE_ONE',
  PICTURE_TWO: 'PICTURE_TWO',
  PICTURE_THREE: 'PICTURE_THREE',
};

export const PRODUCT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const GENDER_USER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

export const STATUS_ACTIVE = {
  INACTIVE: 0,
  ACTIVE: 1,
};