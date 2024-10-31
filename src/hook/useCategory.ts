import { useEffect, useState } from "react";

import axios from "axios";
import { getAuth, removeAuth } from "../util/auth";
import { notification } from "antd";
import { Category } from "../type/categoryType";
import { apiAllCategory, apiCategory } from "../api/backendRoute";

const useCategory = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const token = getAuth();
  const listCate = () => {
    axios
      .get(apiAllCategory, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => setCategories(res.data.data))
      .catch((e) => console.error("Error fetching categories:", e));
  };
  const fetchData = async (
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
      .get(`${apiCategory}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      })
      .then((res) => {
        const { data, pagination } = res.data.data;
        setData(data);
        setTotalRecords(pagination.totalElements);
      })
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get categories ",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Error Fetching Data",
            description:
              error.response?.data?.message ||
              "An error occurred while get categories.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    listCate();
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!id) return;

    await axios
      .delete(`${apiCategory}/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      })
      .then(() => {
        notification.success({ message: "Category deleted successfully" });
        fetchData();
      })
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't get categories ",
          });
          removeAuth();
        }
        notification.error({
          message: "Error Deleting Category",
          description:
            error.response?.data?.message ||
            "An error occurred while deleting the category.",
        });
      });
  };
  return { data, loading, totalRecords, fetchData, handleDelete, categories };
};
export default useCategory;
