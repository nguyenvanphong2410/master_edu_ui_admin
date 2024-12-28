import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import TableOfCollapseCourse from './components/TableOfCollapseCourse';
import NoData from '@/pages/Permission/NoData';

const CourseAndClassOfStudent = ({ dataCourseAndClassOfStudent }) => {
  const { token } = theme.useToken();

  const getItems = (panelStyle) =>
    dataCourseAndClassOfStudent?.map((item, index) => ({
      key: `${index + 1}`,
      label: (
        <p>
          Khóa học: <span className="font-semibold">{item?.course?.name}</span>
        </p>
      ),
      children: (
        <TableOfCollapseCourse
          listClassOfCourse={item?.class}
          startTime={item?.course?.start_time}
          endTime={item?.course?.end_time}
        />
      ),
      style: panelStyle,
    }));

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <>
      {dataCourseAndClassOfStudent.length > 0 ? (
        <Collapse
          className="mt-4"
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      ) : (
        <NoData description={'Không có dữ liệu!'} />
      )}
    </>
  );
};

export default CourseAndClassOfStudent;
