import { Button, Flex, Form, Modal, Select, message } from "antd";
import Input from "antd/es/input/Input";
import { StudentType, urlStu } from "../../util/student";

import TextArea from "antd/es/input/TextArea";

import { useForm } from "antd/es/form/Form";
import axios from "axios";

interface Prop {
    open: boolean;
    close: () => void;
    formData: (dt: StudentType) => void;
}

const AddStudent = ({ open, close, formData }: Prop) => {

    const [form] = useForm<StudentType>()
    const clearForm = () => {
        form.resetFields();
    };
    const createData = (data: StudentType) => {
        const newStudent = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            age: data.age,
            email: data.email,
            phone: data.phone,
            address: data.address
        };

        axios.post(urlStu, newStudent).then((res) => formData(res.data)).catch((e) => console.log(e))
        success()
    }
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Student Created',
            duration: 5,
        });
    };
    return (
        <Modal title="New Student" onCancel={() => { clearForm(); close() }} open={open} footer={true} >
            {contextHolder}
            <Form onFinish={(value) => { createData(value); clearForm() }} form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 20 }}  >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    labelAlign={"left"}
                    hasFeedback
                    rules={[
                        { required: true, message: "Please input your First Name!" },

                        {
                            min: 3,
                            message: "Your First Name must be at least 3 char",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelAlign={"left"}
                    label="Last Name"
                    name="lastName"
                    hasFeedback
                    rules={[{ required: true, message: "Please input your Last name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    labelAlign={"left"}
                    label="Age"
                    name="age"
                    hasFeedback
                    rules={[
                        { required: true },
                        {
                            validator: (rule, value) => {
                                if (value === undefined || value === null || value === "") {
                                    return Promise.reject("Please input a number!");
                                }
                                const age = Number(value);
                                if (isNaN(age) || age <= 0) {
                                    return Promise.reject(
                                        "Please input a number bigger than zero!"
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    labelAlign={"left"}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Plase Input Email address",
                        },
                        {
                            type: "email",
                            message: "Invalid email address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    labelAlign={"left"}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Plase select your gender",
                        },

                    ]}
                >
                    <Select
                        defaultValue="Gender"
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    labelAlign={"left"}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Plase Input Email address",
                        },
                        {
                            type: "string",
                            message: "Invalid email address!",
                        },
                    ]}
                >
                    <TextArea
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>
                <Flex justify={"flex-end"} gap={5} align={'center'}  >
                    <Button type={"default"} onClick={() => { clearForm(); close() }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

export default AddStudent;
