import { theme, Button, Dropdown, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
interface Prop {
  collapsed: boolean;
  setCollapsed: () => void;
}
const Navbar = ({ collapsed, setCollapsed }: Prop) => {
  const items = [
    {
      key: 1,
      label: "Edit Information",
    },
    {
      key: 2,
      label: "Sign out",
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
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
