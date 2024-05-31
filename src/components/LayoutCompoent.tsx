import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  DesktopOutlined,
  FolderOpenOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Navbar from "./Navbar";
const { Content, Sider } = Layout;
const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const items = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "/",
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to="/category">Category</Link>,
      key: "/category",
      icon: <DesktopOutlined />,
    },
    {
      label: <Link to="/student">Student</Link>,
      key: "/student",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/course">Course</Link>,
      key: "/course",
      icon: <TeamOutlined />,
    },
    {
      label: <Link to="/register">Registration</Link>,
      key: "/register",
      icon: <FolderOpenOutlined />,
    },
    {
      label: <Link to="/setting">Setting</Link>,
      key: "/setting",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "100dvh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[current]}
          items={items}
        />
      </Sider>
      <Layout>
        <Navbar
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
        />

        <Breadcrumb style={{ marginLeft: 10, marginTop: 10 }}>
          <Breadcrumb.Item>        {location.pathname === "/" ? "/dashboard" : location.pathname}</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
