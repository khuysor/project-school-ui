import { Flex, Button, BreadcrumbProps } from "antd";
import { useEffect, useState } from "react";
import TableClass from "../components/class/TableClass";
import { classApi, classType } from "../util/class";
import axios from "axios";
import { getTokenFromStorage } from "../util/auth";
import { routes } from "../routes/routes";
import { Link } from "react-router-dom";
import Container from "../components/PageContainer";
import AddClass from "../components/class/AddClass";
const beadcrumb: BreadcrumbProps = {
  items: [
    {
      key: routes.dashboard,
      title: <Link to={routes.home}>Dashboard</Link>,
    },
    {
      key: "categories",
      title: <Link to={routes.category}>Subject</Link>,
    },
  ],
};
function ClassPage() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<classType[]>([]);
  const token = getTokenFromStorage();
  useEffect(() => {
    setLoading(true);
    axios
      .get(classApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>{ setData(res.data),setLoading(false)})
      .catch(() => setLoading(false));
  }, []);
  return (
    <Container breadcrumb={beadcrumb}>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button onClick={() => setActive(true)} type="primary">
          New Class
        </Button>
      </Flex>
      <AddClass
        open={active}
        close={() => setActive(false)}
        formData={(value: classType) => setData([...data, value])}
      />
      <div style={{ width: "100%", height: "100%" }}>
        <TableClass
          loading={loading}
          categoryData={data}
          onDelete={(id) => setData(data.filter((dt) => dt.id != id))}
        />
      </div>
    </Container>
  );
}

export default ClassPage;
