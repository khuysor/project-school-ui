import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import Authentication from "../pages/Auth";
import LayoutComponent from "../components/appComponent/LayoutComponent";

import RegistertrationPage from "../pages/RegistertrationPage";
import CoursePage from "../pages/course-page";
import StudentPage from "../pages/student-page";
import Errorpage from "../pages/Errorpage";
import Login from "../components/auth/login";
import { routes } from "./routes";
import Redirect from "./redirect";
import RequireAuth from "./requireAuth";
import UserPage from "../pages/UserPage";
import StaffPage from "../pages/StaffPage";
import Register from "../components/auth/register";
import CategoryPage from "../pages/category-page";

const errorElement = <Errorpage />;

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
      {
        path: routes.userregister,
        element: <Register />,
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
        element: <CategoryPage />,
      },
      {
        path: routes.register,
        element: <RegistertrationPage />,
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
