import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useState, useRef } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalDeleteStudent from "./ModalDeleteStudent";
import { CategoryType } from "../util/category";
import { convertUTCDateToString } from "../util/helper";

interface Prop {
    categoryData: CategoryType[];
    onDelete: (id: number) => void;
}

const TableCategory = ({ categoryData, onDelete }: Prop) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [globalSearchText, setGlobalSearchText] = useState(""); // New state for global search
    const searchInput = useRef<InputRef>(null);
    const [open, setOpen] = useState(false);

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
        setGlobalSearchText(""); // Clear global search text
    };

    const getColumnSearchProps = (
        dataIndex: string
    ): TableColumnType<CategoryType> => {
        return ({
            filterDropdown: ({
                setSelectedKeys, selectedKeys, confirm, clearFilters, close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        style={{ marginBottom: 8, display: "block" }} />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
                            Close
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
                    .includes((value as string).toLowerCase())
            ,
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
            render: (text) => searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""} />
            ) : (
                text
            ),
        });
    };



    // Function to check if any column value contains the search text
    const hasSearchText = (record: CategoryType) => {
        return Object.values(record).some(value =>
            value.toString().toLowerCase().includes(globalSearchText.toLowerCase())
        );
    };

    const filteredData = globalSearchText
        ? categoryData.filter(hasSearchText)
        : categoryData;

    const columns: TableColumnsType<CategoryType> = [
        {
            title: 'No',
            dataIndex: "index",
            defaultSortOrder: "descend",
            width: 100,
            sortDirections: ["descend", "ascend"],
            render: (dataIndex) => dataIndex,
            sorter: (a, b) => b.index - a.index,
            fixed: 'left'
        },

       
        {
            title: "Code",
            dataIndex: "code",
            width: 200,
            ...getColumnSearchProps("code"),
            sorter: (a, b) => a.code.length - b.code.length,
            sortDirections: ["descend", "ascend"],
            
        },
        {
            title: "Subject Name",
            dataIndex: "name",
            width: 200,
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
            fixed: 'left'
        },
        {
            title: "Created Time",
            dataIndex: "createTime",
            width: 200,
            ...getColumnSearchProps("updateTime"),
            sortDirections: ["descend", "ascend"],
            render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
        },
        {
            title: "Updated Time",
            dataIndex: "updateTime",
            width: 200,
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("updateTime"),
            render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
        },
        {
            title: "Action",
            dataIndex: "updateTime",
            width: 100,
            render: (_, record) => (
                <Flex justify={'space-around'}>
                    <EditOutlined style={{ color: "blue" }} onClick={() => alert(record.id)} />
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => { setSelectedStudent(""); setOpen(true) }} />
                </Flex>
            ),
        }
    ];

    const [selectedStudent, setSelectedStudent] = useState<{ id: number; name: string }>({ id: 0, name: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(13);
    const [showAll, setShowAll] = useState(false);
    const startIndex = showAll ? 0 : (currentPage - 1) * pageSize;
    const endIndex = showAll ? categoryData.length : startIndex + pageSize;
    const displayedData = showAll ? categoryData : filteredData.slice(startIndex, endIndex);
    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
        setShowAll(false); // Reset show all option
    };

    return (

        <>
            <Table

                columns={columns}
                dataSource={displayedData.map((student, index) => ({
                    ...student,
                    index: index + 1, // Add the index starting from 1 (optional)
                }))}
                rowKey="id"
                scroll={{
                    x: 1, y: 505
                }}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange: handlePaginationChange,
                    onShowSizeChange: handlePaginationChange,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}

                size={'small'}
            />
            <ModalDeleteStudent ondelete={(id) => onDelete(id)} close={() => setOpen(false)} open={open} name={selectedStudent.name} id={selectedStudent.id} />
        </>
    );
};

export default TableCategory;
