import axios from "axios";
import { useEffect, useState } from "react";

import { getAuth, removeAuth } from "../util/auth";
import { notification } from "antd";
import { apiCategoryCount, apiCourseCount, apiStudentCount } from "../api/backendRoute";

const useDashboard = () => {
  const [countCourse, setCount] = useState(0);
  const [countCategory, setCountCategory] = useState(0);
  const [countStudent, setCountStudent] = useState(0);
  const token = getAuth();
  const fetchCountCourse = async () => {
    await axios
      .get(apiCourseCount, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => setCount(res.data.data))
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get course",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Something went wrong",
            description: "An error occurred while get course. ",
          });
        }
      });
  };
  const fetchCountStudent = async () => {
    await axios
      .get(apiStudentCount, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => setCountStudent(res.data.data))
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get course",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Something went wrong",
            description: "An error occurred while get course. ",
          });
        }
      });
  };
  const fetchCountCate = async () => {
    await axios
      .get(apiCategoryCount, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => setCountCategory(res.data.data))
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get categories ",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Something went wrong",
            description: "An error occurred while get categories. ",
          });
        }
      });
  };
  useEffect(() => {
    fetchCountCourse();
    fetchCountCate();
    fetchCountStudent();
  }, []);
  return { countCourse, countCategory, countStudent };
};
export default useDashboard;
