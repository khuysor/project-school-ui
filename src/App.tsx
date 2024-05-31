import { Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/LayoutCompoent";
import StudentPage from "./pages/StudentPage";
import CategoryPage from "./pages/CategoryPage";
import SettingPage from "./pages/SettingPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/course" element={<CategoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/register" element={<SettingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
