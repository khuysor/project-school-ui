import { theme, Button, Dropdown, Avatar, List } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface Prop {
  collapsed: boolean;
  setCollapsed: () => void;
}
const Navbar = ({ collapsed, setCollapsed }: Prop) => {
  const nav = useNavigate()
  const logout = () => {
    localStorage.removeItem("auth");
    nav('/login')
  };
  const items = [
    {
      key: 1,
      label: "Edit Information",
    },
    {
      key: 2,
      label: <List.Item onClick={logout}>Logout</List.Item>,
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={setCollapsed}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
