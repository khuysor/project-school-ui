import { routes } from "../../routes/routes";
import { MdOutlineHome } from "react-icons/md";
import {
  FolderOpenOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { PiStudentDuotone } from "react-icons/pi";
import { FaRegIdCard } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
export const sidebar = [
  {
    path: routes.dashboard,
    key: routes.dashboard,
    name: "Dashboard",
    icon: <MdOutlineHome />,
  },

  {
    path: routes.student,
    key: routes.student,
    name: "Students",
    icon: <PiStudentDuotone />,
  },
  {
    path: routes.category,
    key: routes.category,
    name: "Class",
    icon: <FolderOpenOutlined />,
  },
  {
    path: routes.course,
    key: routes.course,
    name: "Course",
    icon: <MdMenuBook />,
  },
  {
    path: routes.register,
    key: routes.register,
    name: "Student Registration",
    icon: <FaRegIdCard />,
  },
  {
    path: routes.staff,
    key: routes.staff,
    name: "Staff",
    icon: <TeamOutlined />,
  },
  {
    path: routes.setting,
    key: routes.setting,
    name: "Setting",
    icon: <SettingOutlined />,
  },
];
