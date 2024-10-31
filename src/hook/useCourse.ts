import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, removeAuth } from "../util/auth";
import { notification } from "antd";
import { Course } from "../type/courseType";
import { apiCourse } from "../api/backendRoute";

const useCourses = (currentPage?: number | 1, pageSize?: number | 25) => {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const token = getAuth();
  const fetchCourses = async (
    startDate = null,
    endDate = null,
    page = 1,
    size = 25
  ) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("_pageIndex", String(page));
    params.append("_pageSize", String(size));
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    await axios
      .get(`${apiCourse}?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          const { data, pagination } = res.data.data;
          setData(data);
          setTotalRecords(pagination.totalElements);
        }
      })
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get course ",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Error Fetching Data",
            description: "Can't get course ",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, pageSize]);

  return { data, loading, totalRecords, fetchCourses };
};

export default useCourses;
