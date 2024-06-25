import { BreadcrumbProps, Flex } from "antd";
import Button from "antd/es/button";
import TableStudent from "../components/student/TableStudent";
import { StudentType, urlStu } from "../util/student";

import { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "../components/student/AddStudent";
import { getAuth } from "../util/auth";
import { Link } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "../components/PageContainer";
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
  const [data, setData] = useState<StudentType[]>([]);
  const token = getAuth();
  useEffect(() => {
    axios
      .get(urlStu, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const newData = res.data.map((item: StudentType, index: number) => ({
          ...item,
          key: index,
        }));
        setData(newData);
      })
      .catch((error) => console.error(error)); // Use console.error for better visibility of errors
  }, []);
  const [active, setActive] = useState(false);
  const addStudent = (newStudent: StudentType) => {
    setData((prevData) => [...prevData, { ...newStudent, key: data.length }]);
  };

  return (
    <Container breadcrumb={beadcrumb}>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button onClick={() => setActive(true)} type="primary">
          New Student
        </Button>
      </Flex>
      <AddStudent
        open={active}
        close={() => setActive(false)}
        formData={(value: StudentType) => addStudent(value)}
      />
      <div style={{ width: "100%", height: "100%" }}>
        <TableStudent
          studentData={data}
          onDelete={(id) => setData(data.filter((dt) => dt.id != id))}
        />
      </div>
    </Container>
  );
};

export default StudentPage;
