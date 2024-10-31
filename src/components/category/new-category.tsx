import { Button, Flex, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState, useEffect } from "react";
import { ThunderboltOutlined } from "@ant-design/icons";
import axios from "axios";
import { getAuth } from "../../util/auth";
import { useBreakpoint } from "@ant-design/pro-components";
import { Category } from "../../type/categoryType";
import { apiCategory } from "../../api/backendRoute";

interface Prop {
  open: boolean;
  close: () => void;
  fetchData: () => void;
  category?: Category | null; // Prop for updating a category
}

const NewCategory = ({ open, close, fetchData, category }: Prop) => {
  const [form] = useForm<Category>();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (open) {
      if (category) {
        form.setFieldsValue({
          code: category.code,
          categoryName: category.categoryName,
        });
        setCode(category.code);
      } else {
        form.resetFields();
        generateCode(); // Generate a new code when creating a category
      }
    }
  }, [open, category, form]);

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 7);
    form.setFieldsValue({ code: newCode });
    setCode(newCode);
  };

  const addData = async (value: Category) => {
    const categoryData = {
      id: category ? category.id : null, // Set ID if updating, null if creating
      code: value.code,
      categoryName: value.categoryName,
    };

    try {
      // Send the request body; backend should handle create/update logic
      await axios.post(apiCategory, categoryData, {
        headers: { Authorization: "Bearer " + getAuth()?.token },
      });

      if (category) {
        showMessage("Category updated successfully!");
      } else {
        showMessage("Category created successfully!");
      }

      fetchData();
    } catch (error) {
      console.error(error);
      showMessage("Error saving category.");
    } finally {
      setCode("");
      form.resetFields();
      close(); // Close the modal after saving
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
      duration: 5,
    });
  };

  const isbreakPoint = useBreakpoint();

  return (
    <Modal
      title={category ? "Edit Category" : "New Category"}
      onCancel={handleCancel}
      open={open}
      footer={false}
      width={800}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={addData}
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              style={{ width: "89%" }}
              size={isbreakPoint === "xs" ? "small" : "middle"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              onClick={generateCode}
              size={isbreakPoint === "xs" ? "small" : "middle"}
              style={{
                marginLeft: isbreakPoint === "xs" ? "1%" : "3%",
              }}
            >
              <ThunderboltOutlined />
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Category Name"
          name="categoryName"
          hasFeedback
          rules={[{ required: true, message: "Please enter a category name" }]}
        >
          <Input size={isbreakPoint === "xs" ? "small" : "middle"} />
        </Form.Item>
        <Flex justify="flex-end" gap={5} align="center">
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {category ? "Update" : "Save"}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default NewCategory;
