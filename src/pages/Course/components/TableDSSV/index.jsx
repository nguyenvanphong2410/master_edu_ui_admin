import TableDefault from '@/components/Table';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Avatar, Tag, Tooltip } from 'antd';
import InlineSVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import graduation from '@/assets/images/icons/solid/graduation.svg';
import { GENDER_USER } from '@/utils/constants';

const TableDSSV = ({dataDSSV}) => {
  const windowWidth = useWindowSize().width;
  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span className="font-semibold text-[#4d7ca8]">{text}</span>,
    },
    {
      title: <span className="title-table">Họ và tên</span>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 300,
      sorter: (a, b) => a.age - b.age,
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
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) =>
        text ? <span>{handleDisplayGender(text)}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>,
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text ? <span>{text}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 180,
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
      render: (text) => (text ? <span>{text}</span> : <i className={`text-gray-60`}>Đang cập nhật</i>),
    },
  ];

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
          dataSource={dataDSSV}
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

export default TableDSSV;
