import axios from "axios";
import { useEffect, useState } from "react";
import { apiStudent } from "../api/backendRoute";
import { getAuth } from "../util/auth";
import { Student } from "../type/studentType";

const useStudent = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const token = getAuth();
  const fetchData = () => {
    setLoading(true);
    axios
      .get(apiStudent, {
        headers: {
          Authorization: "Bearer " + token?.token,
        },
      })
      .then((res) => {
        const { data } = res.data.data;
        setData(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { fetchData, data, loading };
};
export default useStudent;
