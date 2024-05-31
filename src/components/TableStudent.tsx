import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Space, Table, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { StudentType } from "../util/student";
import { useState, useRef } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalConfirm from "./ModalDeleteStudent";
interface Prop {
  studentData: StudentType[];
  onDelete: (id: number) => void

}
const TableStudent = ({ studentData, onDelete }: Prop) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const convertUTCDateToString = (utcDateString: string) => {
    const date = new Date(utcDateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: string
  ): TableColumnType<StudentType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<StudentType> = [
    {
      title: "No",
      dataIndex: "index",
      defaultSortOrder: "descend",
      width: 100,
      ...getColumnSearchProps("index"),
      sortDirections: ["descend", "ascend"],
      fixed: "left", // Sort based on "index" field
      render: (dataIndex) => dataIndex,
      sorter: (a, b) => b.index - a.index,
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
      render: (text: string) => (text === null ? "N/A" : text), // Handle null values
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 200,
      ...getColumnSearchProps("gender"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
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
      render: (_, record) => <>
        <Flex justify={'space-around'}>
          <EditOutlined style={{ color: "blue" }} onClick={() => alert(record.id)} />
          <DeleteOutlined style={{ color: 'red' }} onClick={() => { setSelectedStudent({ id: record.id, name: record.firstName }); setOpen(true) }} />
        </Flex>
      </>,
    }
  ];
  const [selectedStudent, setSelectedStudent] = useState<{ id: number; name: string }>({ id: 0, name: "" });
  const [currentPage, setCurrentPage] = useState(1); // Initial page number
  const [pageSize, setPageSize] = useState(13); // Number of items per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1); // Reset page to 1 when page size changes
    setPageSize(size);
  };

  const paginatedData = studentData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (

    <>
      <Table
        columns={columns}
        dataSource={paginatedData.map((student, index) => ({
          ...student,
          index: index + 1,
        }))}
        rowKey="id"
        style={{ height: '100%' }}
        scroll={{
          y: 505,
          x: 1
        }}
        size={'small'}
        pagination={{
          current: currentPage,
          pageSize,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
          total: studentData.length,
          showSizeChanger: true
        }}
      />
      <ModalConfirm ondelete={(id) => onDelete(id)} close={() => setOpen(false)} open={open} name={selectedStudent.name} id={selectedStudent.id} />
    </>
  );
};

export default TableStudent;
