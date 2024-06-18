import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutComponent from "./components/LayoutComponent";
import StudentPage from "./pages/StudentPage";
import CategoryPage from "./pages/CategoryPage";
import SettingPage from "./pages/SettingPage";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import Login from "./pages/Login";
import { getTokenFromSessionStorage } from "./util/auth";

const App = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    token: getTokenFromSessionStorage(),
  });

  useEffect(() => {
    const token = getTokenFromSessionStorage();
    if (!token) {
      navigate("/login");
      setLogin({token:''});
    } else {
      setLogin({ token });
    }
  }, [navigate]); 
  return (
    <Routes>
      {login.token ? (
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<Dashboard />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
};

export default App;
