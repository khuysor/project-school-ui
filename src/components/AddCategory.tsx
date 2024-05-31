import { Button, Flex, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { CategoryType } from "../util/category";
import { useState } from "react";
import { ThunderboltOutlined } from "@ant-design/icons";
import axios from "axios";
interface Prop {
    open: boolean;
    close: () => void;
    formData: (dt: CategoryType) => void; // Assuming formData doesn't require specific type
}

const AddCategory = ({ open, close, formData }: Prop) => {
    const [form] = useForm<CategoryType>(); // Generic type for form data
    const [code, setCode] = useState("");
    const handleCancel = () => {
        form.resetFields();
        close();
    };
    const generateCode = () => {
        const newCode = Math.random().toString(36).substring(2, 7); // Generate random alphanumeric string
        form.setFieldsValue({ code: newCode });
        setCode(newCode)
    };
    const addData = async (value: CategoryType) => {
        const newCategory = {
            code: value.code,
            name: value.name
        }

        await axios.post('http://localhost:8080/api/category', newCategory).then((res) => formData(res.data)).catch((e) => console.log(e));
        success()
        setCode('')
        form.resetFields();
    }
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Subject Created',
            duration: 5,
        });
    };
    return (
        <Modal
            title="New Category"
            onCancel={handleCancel}
            open={open}
            footer={true}
        >
            {
                contextHolder
            }
            <Form onFinish={(value) => { addData(value) }} form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 20 }}  >
                <Form.Item
                    label="Code"
                    name="code"
                    labelAlign="left"
                    hasFeedback
                    rules={[
                        { required: true, message: "Please enter a code" },
                        { min: 3, message: "Code must be at least 3 characters long" },
                    ]}
                >
                    <Flex align={'center'}>
                        <Input value={code} onChange={(e) => setCode(e.target.value)} />
                        <Button size="small" onClick={generateCode} >
                            <ThunderboltOutlined style={
                                { fontSize: 15 }
                            } />
                        </Button>
                    </Flex>
                </Form.Item>
                <Form.Item
                    labelAlign="left"
                    label="Category Name"
                    name="name"
                    hasFeedback
                    rules={[{ required: true, message: "Please enter a category name" }]}
                >
                    <Input style={{ width: '90%' }} />
                </Form.Item>
                <Flex justify={"flex-end"} gap={5} align={'center'}  >
                    <Button type={"default"} onClick={() => { close() }}>
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

export default AddCategory;
