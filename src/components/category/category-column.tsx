import { Popconfirm, TableColumnsType } from "antd";
import { SearchProp } from "../table/search-props";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { convertUTCDateToString } from "../../util/helper";
import { Category } from "../../type/categoryType";

const CategoryColumns = ({ onDeleteClick, onUpdateClick }) => {
  const { getColumnSearchProps } = SearchProp<Category>();

  const columns: TableColumnsType<Category> = [
    {
      title: "No",
      dataIndex: "index",
      defaultSortOrder: "descend",
      width: 100,
      sorter: (a, b) => a.id - b.id,
      fixed: "left",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Code",
      dataIndex: "code",
      width: 200,
      sorter: (a, b) => a.code.localeCompare(b.code),
      render: (_, data) => (
        <span className="text-blue-800" onClick={() => alert(data.id)}>
          {data.code}
        </span>
      ),
    },
    {
      title: "Subject Name",
      dataIndex: "categoryName",
      width: 200,
      ...getColumnSearchProps("categoryName"),
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      fixed: "left",
    },
    {
      title: "Created Time",
      dataIndex: "createTime",
      width: 200,
      sorter: (a, b) =>
        new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Updated Time",
      dataIndex: "updateTime",
      width: 200,
      sorter: (a, b) =>
        new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime(),
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Action",
      dataIndex: "id",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => onUpdateClick(record)}
          />
          <Popconfirm
            title="Delete the category"
            description={`Are you sure to delete ${record.categoryName} category?`}
            onConfirm={() => onDeleteClick(record.id)}
            okText="Yes"
            cancelText="No"
            placement="leftBottom"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return { columns };
};

export default CategoryColumns;
