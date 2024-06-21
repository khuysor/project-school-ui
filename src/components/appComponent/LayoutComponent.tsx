import { useState } from "react";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { routes } from "../../routes/routes";
import { ProLayout, ProLayoutProps } from "@ant-design/pro-components";
import { sidebar } from "./menu";
import logo from "../../assets/th.jpeg";
import { Dropdown } from "antd";
import { RiShieldUserFill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineOpenInFull } from "react-icons/md";
const LayoutComponent = () => {
  enum LayoutType {
    MIX = "mix",
    TOP = "top",
    SIDE = "side",
  }
  const [collapsed, setCollapsed] = useState(true);
  const items: ProLayoutProps = {
    title: `KHS`,
    logo: logo,
    fixedHeader: true,
    fixSiderbar: true,
    route: {
      routes: sidebar,
    },
  };

  const location = useLocation();
  const nav = useNavigate();
  return (
    <div className="h-screen">
      <ProLayout
        {...items}
        token={{
          sider: {
            colorMenuBackground: "#fff",
            colorBgMenuItemSelected: "red",
            colorTextMenuSelected: "white",
          },
        }}
        layout={LayoutType.MIX}
        location={location}
        onMenuHeaderClick={() => nav(routes.home)}
        menuFooterRender={() =>
          collapsed ? (
            <MdOutlineOpenInFull
              className=" m-auto"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MdOutlineClose
              className=" m-auto"
              onClick={() => setCollapsed(!collapsed)}
            />
          )
        }
        menuItemRender={(item, dom) => (
          <Link to={`${item.path}`} key={item.path}>
            {dom}
          </Link>
        )}
        avatarProps={{
          icon: <RiShieldUserFill />,
          className: "bg-opacity-20 text-primary text-opacity-90 bg-red-900",
          size: "small",
          shape: "square",
          title: "Admin",
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Logout",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default LayoutComponent;
