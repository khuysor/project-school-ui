import { Button, BreadcrumbProps, Space, DatePicker } from "antd";
import { useState } from "react";
import { routes } from "../routes/routes";
import { Link } from "react-router-dom";
import Container from "../components/PageContainer";
import NewCategory from "../components/category/new-category";
import TableComponent from "../components/table/TableComponent";
import CategoryColumns from "../components/category/category-column";
import useCategory from "../hook/useCategory";
import { formatDate } from "../util/helper";
import { Category } from "../type/categoryType";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: routes.dashboard,
      title: <Link to={routes.home}>Dashboard</Link>,
    },
    {
      key: "categories",
      title: <Link to={routes.category}>Categories</Link>,
    },
  ],
};

function CategoryPage() {
  const [active, setActive] = useState(false);
  const { data, loading, fetchData, handleDelete, totalRecords } =
    useCategory();

  const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [dateRange, setDateRange] = useState([null, null]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
    // Fetch data with the current page, page size, and date range
    fetchData(dateRange[0], dateRange[1], page, pageSize || 25);
  };

  const handleUpdateClick = (category: Category) => {
    setCategoryToUpdate(category);
    setActive(true);
  };

  const handleChange = (dates) => {
    if (dates && dates.length === 2) {
      const formattedStart = formatDate(dates[0]);
      const formattedEnd = formatDate(dates[1]);
      setDateRange([formattedStart, formattedEnd]);
      fetchData(formattedStart, formattedEnd, 1, pageSize);
      setCurrentPage(1); // Reset to the first page
    }
  };

  const { RangePicker } = DatePicker;

  return (
    <Container breadcrumb={breadcrumb}>
      <Space direction={"horizontal"} size={12}>
        <Button
          className="bg-blue-600 my-1"
          onClick={() => {
            setActive(true);
            setCategoryToUpdate(null);
          }}
          type="primary"
        >
          New Category
        </Button>
        <RangePicker
          id={{
            start: "startInput",
            end: "endInput",
          }}
          onChange={handleChange}
        />
      </Space>
      <NewCategory
        open={active}
        close={() => {
          setActive(false);
          setCategoryToUpdate(null);
        }}
        fetchData={fetchData}
        category={categoryToUpdate}
      />

      <TableComponent
        data={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalRecords,
          onChange: handlePageChange,
        }}
        columns={[
          ...CategoryColumns({
            onDeleteClick: (id: number) => handleDelete(id),
            onUpdateClick: handleUpdateClick,
          }).columns,
        ]}
      />
    </Container>
  );
}

export default CategoryPage;
