import { Popconfirm, TableColumnsType, Tag } from "antd";
import { Student } from "../../type/studentType";
import { SearchProp } from "../table/search-props";
import { convertUTCDateToString } from "../../util/helper";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const StudentColumn = ({ onDeleteClick, onUpdateClick }) => {
  const { getColumnSearchProps } = SearchProp<Student>();
  const columns: TableColumnsType<Student> = [
    {
      title: "No",
      dataIndex: "index",
      width: 100,
      render: (_, _record, index) => <span>{index + 1}</span>,
      sorter: (a, b) => a.index - b.index,
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 200,
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
      fixed: "left",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: 200,
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text: string) => (text === null ? "N/A" : text),
      fixed: "left",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 200,
      ...getColumnSearchProps("gender"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        text == "FEMALE" ? (
          <Tag color="magenta">
            {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
          </Tag>
        ) : (
          <Tag color="blue">
            {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
          </Tag>
        ),
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 200,
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      width: 200,
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 200,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created Time",
      dataIndex: "createTime",
      width: 250,
      ...getColumnSearchProps("createTime"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Updated Time",
      dataIndex: "updateTime",
      width: 250,
      ...getColumnSearchProps("updateTime"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Action",
      dataIndex: "updateTime",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => onUpdateClick(record)}
          />
          <Popconfirm
            title="Delete the category"
            description={`Are you sure to delete ${
              record.firstName + " " + record.lastName
            } course?`}
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
export default StudentColumn;
