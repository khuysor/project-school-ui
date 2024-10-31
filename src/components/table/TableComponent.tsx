import { Table, TableColumnsType } from "antd";

interface Prop<T> {
  data: T[];
  loading: boolean;
  columns: TableColumnsType<T>;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  scroll?: {
    x?: number | string;
    y?: number;
  };
}

const TableComponent = <T extends { id: number }>({
  data,
  loading,
  columns,
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    onChange: () => {},
  },
  scroll,
}: Prop<T>) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
      scroll={scroll ?? { x: "max-content", y: 505 }}
      size="small"
      locale={{ emptyText: "No data available" }} // Optional empty state message
    />
  );
};

export default TableComponent;
