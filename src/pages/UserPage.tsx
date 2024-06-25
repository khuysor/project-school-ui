import { Button, Flex } from "antd";
import Container from "../components/PageContainer";

const UserPage = () => {
  return (
    <Container>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button type="primary">New User</Button>
      </Flex>
    </Container>
  );
};

export default UserPage;
