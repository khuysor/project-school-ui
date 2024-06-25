import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import Authentication from "../pages/Auth";
import LayoutComponent from "../components/appComponent/LayoutComponent";
import ClassPage from "../pages/ClassPage";
import RegisterPage from "../pages/RegisterPage";
import CoursePage from "../pages/CoursePage";
import StudentPage from "../pages/StudentPage";
import Errorpage from "../pages/Errorpage";
import Login from "../components/auth/login";
import { routes } from "./routes";
import Redirect from "./redirect";
import RequireAuth from "./requireAuth";
import { getAuth } from "../util/auth";
import UserPage from "../pages/UserPage";
import StaffPage from "../pages/StaffPage";
const errorElement = <Errorpage />;
const auth = getAuth();
export const browserRoute = createBrowserRouter([
  {
    path: routes.home,
    element: <Redirect />,
    errorElement: errorElement,
  },
  {
    element: <Authentication />,
    errorElement: errorElement,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <RequireAuth>
        <LayoutComponent />
      </RequireAuth>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.category,
        element: <ClassPage />,
      },
      {
        path: routes.register,
        element: <RegisterPage />,
      },
      {
        path: routes.course,
        element: <CoursePage />,
      },
      {
        path: routes.student,
        element: <StudentPage />,
      },
      {
        path: routes.staff,
        element: <StaffPage />,
      },
      {
        path: routes.setting,
        element: <UserPage />,
      },
      {
        path: routes.user,
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
