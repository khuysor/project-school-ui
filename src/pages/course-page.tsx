import { useState } from "react";
import { Button, BreadcrumbProps, DatePicker, Space } from "antd";
import Container from "../components/PageContainer";
import { routes } from "../routes/routes";
import { Link } from "react-router-dom";
import TableComponent from "../components/table/TableComponent";

import useCourses from "../hook/useCourse";
import CourseColumns from "../components/course/course-coloumns";
import NewCourse from "../components/course/new-course";
import { formatDate } from "../util/helper";
import { Course } from "../type/courseType";

const { RangePicker } = DatePicker;
const CoursePage = () => {
  const [updateActive, setUpdateActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [mode, setMode] = useState<"add" | "update">("add");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, loading, totalRecords, fetchCourses } = useCourses();

  const handleUpdateClick = (course: Course) => {
    setSelectedCourse(course);
    setMode("update");
    setUpdateActive(true);
  };

  const handleNewCourseClick = () => {
    setSelectedCourse(null);
    setMode("add");
    setUpdateActive(true);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
    fetchCourses(dateRange[0], dateRange[1], page, pageSize || 25);
  };

  const breadcrumb: BreadcrumbProps = {
    items: [
      {
        key: "dashboard",
        title: <Link to={routes.home}>Dashboard</Link>,
      },
      {
        key: "subjects",
        title: <Link to={routes.category}>Subject</Link>,
      },
      {
        key: "courses",
        title: <Link to={routes.course}>Course</Link>,
      },
    ],
  };
  const [dateRange, setDateRange] = useState([null, null]);

  const handleChange = (dates) => {
    if (dates && dates.length === 2) {
      const formattedStart = formatDate(dates[0]);
      const formattedEnd = formatDate(dates[1]);
      setDateRange([formattedStart, formattedEnd]);
      fetchCourses(formattedStart, formattedEnd, 1, pageSize);
      setCurrentPage(1); // Reset to the first page
    }
  };

  return (
    <Container breadcrumb={breadcrumb}>
      <Space direction={"horizontal"} size={12}>
        <Button onClick={handleNewCourseClick} className="bg-blue-600 my-1">
          New Course
        </Button>
        <RangePicker
          id={{
            start: "startInput",
            end: "endInput",
          }}
          onChange={handleChange}
        />
      </Space>
      <NewCourse
        open={updateActive}
        close={() => {
          setUpdateActive(false);
          setSelectedCourse(null);
        }}
        id={selectedCourse?.id}
        formData={fetchCourses}
        name={selectedCourse?.courseName}
        course={selectedCourse}
        mode={mode}
      />
      <TableComponent
        data={data}
        loading={loading}
        columns={[
          ...CourseColumns({
            onDeleteClick: () => console.log("first"),
            onUpdateClick: handleUpdateClick,
          }).columns,
        ]}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalRecords,
          onChange: handlePageChange,
        }}
      />
      
    </Container>
  );
};

export default CoursePage;
