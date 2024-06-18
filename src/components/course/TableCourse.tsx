import { SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useState, useRef } from "react";
import { convertUTCDateToString } from "../../util/helper";
import { Course, CourseUpdate } from "../../util/course";
import ModalDeleteCourse from "./ModalDeleteCourse";
import UpdateCourse from "./UpdateCourse";
import logo from '../../assets/course.jpeg'

interface Prop {
    courseData: Course[];
    onDelete: (id: number) => void;
    formData: (dt: Course) => void;
}

const TableCourse = ({ courseData, onDelete, formData }: Prop) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [globalSearchText, setGlobalSearchText] = useState("");
    const searchInput = useRef<InputRef>(null);
    const [open, setOpen] = useState(false);
    console.log(courseData)
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
        setGlobalSearchText("");
    };
    const getColumnSearchProps = (
        dataIndex: string,
        isNested?: boolean
    ): TableColumnType<Course> => ({
        // Ensure dataIndex is not null or undefined before using it
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
        onFilter: (value, record: any) => {
            if (isNested) {
                const nestedKeys = dataIndex.split('.');
                let nestedValue = record;
                nestedKeys.forEach(key => {
                    nestedValue = nestedValue[key];
                });
                return nestedValue
                    ? nestedValue.toString().toLowerCase().includes((value as string).toLowerCase())
                    : '';
            } else {
                return record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
                    : '';
            }
        },
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

    const hasSearchText = (record: Course) => {
        return Object.values(record).some(value =>
            typeof value === 'object'
                ? Object.values(value).some(nestedValue => nestedValue.toString().toLowerCase().includes(globalSearchText.toLowerCase()))
                : value.toString().toLowerCase().includes(globalSearchText.toLowerCase())
        );
    };

    const filteredData = globalSearchText
        ? courseData.filter(hasSearchText)
        : courseData;

    const columns: TableColumnsType<Course> = [
        {
            title: 'No',
            dataIndex: "index",
            width: 100,
            defaultSortOrder: 'descend',
            sortDirections: ["descend", "ascend"],
            render: (dataIndex) => dataIndex,
            sorter: (a, b) => a.index - b.index,
            fixed: 'left'
        },
        {
            title: "Image",
            dataIndex: "imgUrl",
            width: 200,
            fixed: 'left',
            render: (imgUrl) => imgUrl && <img width={50} src={imgUrl} alt="course" /> 
        },
        {
            title: "Course Name",
            dataIndex: "courseName",
            width: 200,
            ...getColumnSearchProps("courseName"),
            sortDirections: ["descend", "ascend"],
            fixed: 'left'
        },
        {
            title: "Teacher Name",
            dataIndex: "teacherName",
            width: 200,
            ...getColumnSearchProps("teacherName"),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Description",
            dataIndex: "description",
            width: 200,
            ...getColumnSearchProps("description"),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Price",
            dataIndex: "price",
            width: 200,
            ...getColumnSearchProps("price"),
            sortDirections: ["descend", "ascend"],
            render: (price: number) => <span>{price} $</span>,
        },
        {
            title: "Category Name",
            dataIndex: ['category', 'name'],
            width: 200,
            ...getColumnSearchProps("category.name", true),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Created Time",
            dataIndex: "createTime",
            width: 200,
            sortDirections: ["descend", "ascend"],
            render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
        },
        {
            title: "Updated Time",
            dataIndex: "updateTime",
            width: 200,
            sortDirections: ["descend", "ascend"],
            render: (date: string) => <span>{convertUTCDateToString(date)}</span>,
        },
        {
            title: "Action",
            dataIndex: "updateTime",
            width: 100,
            render: (_, record) => (
                <Flex justify={'space-around'}>
                    <EditOutlined style={{ color: "blue" }} onClick={() => {
                        setActive(true), setSelectedCourse({ id: record.id, name: record.courseName }); setCourseUpdate({
                            courseName: record.courseName,
                            teacherName: record.teacherName,
                            description: record.description,
                            price: record.price,
                            imgUrl: record.imgUrl,
                            imageName:record.imageName,
                            cateId: record.category.id
                        })
                    }} />
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => { setSelectedCourse({ id: record.id, name: record.courseName }); setOpen(true) }} />
                </Flex>
            ),
        }
    ];
   

    const [selectedCourse, setSelectedCourse] = useState<{ id: number; name: string }>({ id: 0, name: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(13);
    const [showAll, setShowAll] = useState(false);
    const startIndex = showAll ? 0 : (currentPage - 1) * pageSize;
    const endIndex = showAll ? courseData.length : startIndex + pageSize;
    // const displayedData = showAll ? courseData : filteredData.slice(startIndex, endIndex);
    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
        setShowAll(false);
    };
    const [active, setActive] = useState(false)
    const [courseUpdate, setCourseUpdate] = useState<CourseUpdate>({})
    return (
        <>

            <Table
                columns={columns}
                dataSource={courseData.map((course, index) => ({
                    ...course,
                    index: index + 1,
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
            <ModalDeleteCourse ondelete={(id) => onDelete(id)} close={() => setOpen(false)} open={open} name={selectedCourse.name} id={selectedCourse.id} />
            <UpdateCourse id={selectedCourse.id} course={courseUpdate} open={active} close={() => setActive(false)} formData={(dt) => formData(dt)} />
        </>
    );
};

export default TableCourse;
