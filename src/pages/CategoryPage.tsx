import { Flex, Button, BreadcrumbProps } from "antd";
import { useEffect, useState } from "react";
import TableCategory from "../components/category/TableCategory";
import { CategoryType } from "../util/category";
import axios from "axios";
import AddCategory from "../components/category/AddCategory";
import { getTokenFromStorage } from "../util/auth";
import { routes } from "../routes/routes";
import { Link } from "react-router-dom";
import Container from "../components/PageContainer";
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
}
function CategoryPage() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState<CategoryType[]>([])

  useEffect(() => {
    const token = getTokenFromStorage()
    const controller = new AbortController()
    axios.get('http://localhost:8080/api/category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal
    }).then((res) => setData(res.data)).catch((e) => console.log(e.data))
  }, [])


  return (
    <Container  breadcrumb={beadcrumb}>
      <Flex
        justify="space-between"
        style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
      >
        <Button onClick={() => setActive(true)} type="primary">
          New Category
        </Button>
      </Flex>
      <AddCategory open={active} close={() => setActive(false)} formData={(value: CategoryType) => setData([...data, value])} />
      <div style={{ width: "100%", height: '100%' }}>
        <TableCategory categoryData={data} onDelete={(id) => setData(data.filter((dt) => dt.id != id))} />
      </div>

    </Container >
  )
}

export default CategoryPage;
