import { BreadcrumbProps, Flex } from "antd";
import Button from "antd/es/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "../components/PageContainer";
import useStudent from "../hook/useStudent";
import TableComponent from "../components/table/TableComponent";
import StudentColumn from "../components/student/student-columns";
import NewStudent from "../components/student/new-student";
import { Student } from "../type/studentType";

const beadcrumb: BreadcrumbProps = {
  items: [
    {
      key: routes.dashboard,
      title: <Link to={routes.home}>Dashboard</Link>,
    },
    {
      key: "studen",
      title: <Link to={routes.student}>Students</Link>,
    },
  ],
};
const StudentPage = () => {
  const [active, setActive] = useState(false);
  const { data, loading, fetchData } = useStudent();
  const [selectedStudent, setSelectedStudent] = useState<Student>(null);
  const [mode, setMode] = useState<string>();
  const updateStudent = (value: Student) => {
    setMode("update");
    setActive(true)
    setSelectedStudent(value);
  };
  const newStudent = () => {
    setMode("New");
    setActive(true);
  };
  return (
    <Container breadcrumb={beadcrumb}>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button onClick={newStudent} type="primary">
          New Student
        </Button>
      </Flex>
      <TableComponent
        columns={[
          ...StudentColumn({
            onDeleteClick: () => console.log("deleted"),
            onUpdateClick: (value) => updateStudent(value),
          }).columns,
        ]}
        data={data}
        loading={loading}
      />
      <NewStudent
        student={selectedStudent}
        id={selectedStudent?.id}
        name={selectedStudent?.firstName + " " + selectedStudent?.lastName}
        formData={fetchData}
        open={active}
        close={() => setActive(false)}
        mode={mode}
      />
    </Container>
  );
};

export default StudentPage;
