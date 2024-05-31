import { Flex } from "antd";
import Button from "antd/es/button";
import TableStudent from "../components/TableStudent";
import { StudentType, urlStu } from "../util/student";

import { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "../components/AddStudent";

const StudentPage = () => {


    const [data, setData] = useState<StudentType[]>([]);

    useEffect(() => {


        axios.get(urlStu)
            .then((res) => {
                const newData = res.data.map((item: StudentType, index: number) => ({
                    ...item,
                    key: index,
                }));
                setData(newData);
            })
            .catch((error) => console.error(error))// Use console.error for better visibility of errors
    }, []);
    const [active, setActive] = useState(false);
    const addStudent = (newStudent: StudentType) => {
        setData((prevData) => [...prevData, { ...newStudent, key: data.length }]);
    };

    return (
        <div style={{ width: "100%", height: "100%" ,overflow:"hidden"  }}>
            <Flex
                justify="space-between"
                style={{ position: "sticky", top: 0, zIndex: 10, marginBottom: 10 }}
            >
                <Button onClick={() => setActive(true)} type="primary">
                    New Student
                </Button>
            </Flex>
            <AddStudent open={active} close={() => setActive(false)} formData={(value: StudentType) => addStudent(value)} />
            <div style={{ width: "100%", height: '100%', }}>
                <TableStudent studentData={data} onDelete={(id) => setData(data.filter((dt) => dt.id != id))} />
            </div>
        </div>
    );
};

export default StudentPage;
