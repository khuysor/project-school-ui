import { useEffect, useState } from "react";
import { Course, courseUrl } from "../util/course";
import axios from "axios";
import TableCourse from "../components/course/TableCourse";
import { Flex, Button } from "antd";
import AddCourse from "../components/course/AddCourse";
import { getTokenFromStorage } from "../util/auth";

const CoursePage = () => {
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    axios.get(courseUrl, {
      headers: {
        Authorization: 'Bearer ' + getTokenFromStorage()
      }
    }).then((res) => setData(res.data)).catch();
  }, []);

  const [active, setActive] = useState(false);

  const updateCourseData = (newCourse: Course) => {
    setData(prevData => {
      const newData = prevData.map(course => {
        if (course.id === newCourse.id) {

          return newCourse;
        }
        return course;
      });
      return newData;
    });
  };
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button onClick={() => setActive(true)} type="primary">
          New Course
        </Button>
      </Flex>
      <AddCourse open={active} close={() => setActive(false)} formData={(dt: Course) => setData([...data, dt])} />
      <div style={{ width: "100%", height: '100%', }}>
        <TableCourse courseData={data} onDelete={(id) => setData(data.filter((dt) => dt.id != id))} formData={(dt: Course) => updateCourseData(dt)} />
      </div>
    </div>
  );
};

export default CoursePage;
