import { Flex, Button } from "antd";
import { useEffect, useState } from "react";
import TableCategory from "../components/category/TableCategory";
import { CategoryType } from "../util/category";
import axios from "axios";
import AddCategory from "../components/category/AddCategory";
import { getTokenFromSessionStorage } from "../util/auth";

function CategoryPage() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState<CategoryType[]>([])

  useEffect(() => {
    const token = getTokenFromSessionStorage()
    const controller = new AbortController()
    axios.get('http://localhost:8080/api/category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal
    }).then((res) => setData(res.data)).catch((e) => console.log(e.data))
  }, [])


  return <div style={{ width: "100%", height: "100%", overflow: 'hidden' }}>

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
  </div>
}

export default CategoryPage;
