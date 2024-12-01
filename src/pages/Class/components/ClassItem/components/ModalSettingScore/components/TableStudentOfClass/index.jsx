import TableDefault from '@/components/Table';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Avatar, Tooltip } from 'antd';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import { GENDER_USER } from '@/utils/constants';
import { formatPhoneNumber, formatPoint } from '@/utils/helper';
import InlineSVG from 'react-inlinesvg';
import graduation from '@/assets/images/icons/solid/graduation.svg';

const TableStudentOfClass = ({ dataListStudentScoreOfClass }) => {
  const windowWidth = useWindowSize().width;
  const columns = [
    {
      title: <span className="title-table">Họ và tên</span>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 280,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={`flex`}>
            <Avatar
              className={`avatar-user shadow`}
              crossOrigin="anonymous"
              src={record.avatar ? record.avatar : avatarDefault}
            />
            <div className={`ml-[10px] font-medium`}>
              <div className={`name-user cursor-pointer flex`}>
                {text}
                <Tooltip title={`Học viên`}>
                  <InlineSVG src={graduation} className={`w-4 h-4 mt-1 ml-1 text-[#c012f5]`} />
                </Tooltip>
              </div>
              <span className={`email-user`}></span>
              <a className="email" href={`mailto:${record.email}`}>
                {record.email}
              </a>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 110,
      render: (text) =>
        text ? <span>{handleDisplayGender(text)}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>,
    },
    
    {
      title: 'Điểm CC',
      dataIndex: 'attendance_score',
      key: 'attendance_score',
      align: 'center',
      width: 130,
      showSorterTooltip: false,
      render: (text) => <p>{formatPoint(text)}</p>,
    },
    {
      title: 'Điểm cộng',
      dataIndex: 'plus_score',
      key: 'plus_score',
      align: 'center',
      width: 130,
      showSorterTooltip: false,
      render: (text) => <p>{formatPoint(text)}</p>,
    },
    {
      title: 'Điểm GK',
      dataIndex: 'midterm_score',
      key: 'midterm_score',
      align: 'center',
      width: 130,
      showSorterTooltip: false,
      render: (text) => <p>{formatPoint(text)}</p>,
    },
    {
      title: 'Điểm CK',
      dataIndex: 'final_score',
      key: 'final_score',
      align: 'center',
      width: 130,
      showSorterTooltip: false,
      render: (text) => <p>{formatPoint(text)}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 180,
      showSorterTooltip: false,
      render: (text) => (text ? <span>{text}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text ? <span>{formatPhoneNumber(text)}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    {
      title: 'Điểm tổng',
      dataIndex: '',
      key: '',
      align: 'center',
      width: 130,
      fixed: 'right',
      showSorterTooltip: false,
      render: (text, record) => (
        <p className="font-semibold text-blue-25">
          {displayScoreTotal(
            record.attendance_score * 0.1 + record.plus_score + record.midterm_score * 0.3 + record.final_score * 0.6
          )}
        </p>
      ),
    },
  ];

  const displayScoreTotal = (num) => {
    let result = null;
    result = parseFloat(num.toFixed(2));
    return result;
  };

  const handleDisplayGender = (gender) => {
    let genderDisplay = '';
    switch (gender) {
      case GENDER_USER.MALE:
        return (genderDisplay = 'Nam');
      case GENDER_USER.FEMALE:
        return (genderDisplay = 'Nữ');
      case GENDER_USER.OTHER:
        return (genderDisplay = 'Khác');
      default:
        break;
    }
    return genderDisplay;
  };
  return (
    <>
      <div className={'tableWrap h-[calc(100vh-380px)]'}>
        <TableDefault
          dataSource={dataListStudentScoreOfClass}
          isFixed
          extraClassName={'h-[calc(100vh-430px)]'}
          scroll={{
            x: 1000,
            y:
              windowWidth <= 576
                ? 'calc(100vh - 439px)'
                : windowWidth <= 1536
                ? 'calc(100vh - 370px)'
                : 'calc(100vh - 342px)',
          }}
          rowKey={(record) => record._id}
          columns={columns}
          isPagination={false}
        />
      </div>
    </>
  );
};

export default TableStudentOfClass;
