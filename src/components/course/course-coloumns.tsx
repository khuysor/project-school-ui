import { Image, Popconfirm, TableColumnsType } from "antd";
import { SearchProp } from "../table/search-props";
import { convertUTCDateToString } from "../../util/helper";

import { Course } from "../../type/courseType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const CourseColumns = ({ onDeleteClick, onUpdateClick }) => {
  const { getColumnSearchProps } = SearchProp<Course>();
  const columns: TableColumnsType<Course> = [
    {
      title: "No",
      dataIndex: "index",
      width: 100,
      render: (_, _record, index) => <span>{index + 1}</span>,
      sorter: (a, b) => a.index - b.index,
      fixed: "left",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => <Image height={100} src={record.imageUrl} />,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      width: 200,
      ...getColumnSearchProps("courseName"),
      fixed: "left",
    },

    {
      title: "Price",
      dataIndex: "price",
      width: 200,
      ...getColumnSearchProps("price"),
      render: (price: number) => <span>{price} $</span>,
    },

    {
      title: "Category Name",
      dataIndex: "categoryName",
      width: 200,
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Created Time",
      dataIndex: "createTime",
      width: 200,
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Updated Time",
      dataIndex: "updateTime",
      width: 200,
      render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
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

export default CourseColumns;
