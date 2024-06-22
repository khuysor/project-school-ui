import { Button, Flex, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { classType } from "../../util/class";
import { useState } from "react";
import { ThunderboltOutlined } from "@ant-design/icons";
import axios from "axios";
import { getTokenFromStorage } from "../../util/auth";
import {
  ProForm,
  ProFormText,
  useBreakpoint,
} from "@ant-design/pro-components";
interface Prop {
  open: boolean;
  close: () => void;
  formData: (dt: classType) => void; // Assuming formData doesn't require specific type
}

const AddClass = ({ open, close, formData }: Prop) => {
  const [form] = useForm<classType>(); // Generic type for form data
  const [code, setCode] = useState("");
  const handleCancel = () => {
    form.resetFields();
    close();
  };
  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 7); // Generate random alphanumeric string
    form.setFieldsValue({ code: newCode });
    setCode(newCode);
  };
  const addData = async (value: classType) => {
    const newCategory = {
      code: value.code,
      name: value.name,
    };

    await axios
      .post("http://localhost:8080/api/category", newCategory, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      })
      .then((res) => formData(res.data))
      .catch((e) => console.log(e));
    success();
    setCode("");
    form.resetFields();
  };
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Subject Created",
      duration: 5,
    });
  };
  const isbreakPoint = useBreakpoint();
  return (
    <Modal
      title="New Class"
      onCancel={handleCancel}
      open={open}
      footer={true}
      width={800}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={(value) => {
          addData(value);
        }}
        labelCol={{ span: 4 }}
        layout={"horizontal"}
      >
        <Form.Item
          label="Code"
          name="code"
          labelAlign="left"
          hasFeedback
          rules={[
            { required: true, message: "Please enter a code" },
            { min: 3, message: "Code must be at least 3 characters long" },
          ]}
          style={{ width: "100%" }}
        >
          <Input
            style={{ width: "89%" }}
            size={isbreakPoint == "xs" ? "small" : "middle"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button
            onClick={generateCode}
            size={isbreakPoint == "xs" ? "small" : "middle"}
            style={
              isbreakPoint == "xs" || isbreakPoint == "sm"
                ? { marginLeft: "1%" }
                : isbreakPoint == "md"
                ? { marginLeft: "2.1%" }
                : { marginLeft: "3%" }
            }
          >
            <ThunderboltOutlined />
          </Button>
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Class Name"
          name="name"
          hasFeedback
          rules={[{ required: true, message: "Please enter a category name" }]}
        >
          <Input size={isbreakPoint == "xs" ? "small" : "middle"} />
        </Form.Item>
        <Flex justify="flex-end" gap={5} align="center">
          <Button type="default" onClick={handleCancel}>
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

export default AddClass;
