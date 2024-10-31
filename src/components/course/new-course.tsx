import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { UploadFile } from "antd/es/upload/interface";
import { getAuth } from "../../util/auth";

import useCategory from "../../hook/useCategory";
import { Course } from "../../type/courseType";
import { apiCourse } from "../../api/backendRoute";

interface Prop {
  open: boolean;
  name?: string;
  id?: number;
  course?: Course | null;
  close: () => void;
  formData: () => void;
  mode: "add" | "update";
}

const NewCourse = ({ open, close, formData, id, name, course, mode }: Prop) => {
  const [form] = useForm<Course>();
  const { categories } = useCategory();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const token = getAuth();

  useEffect(() => {
    if (course) {
      form.setFieldsValue({
        courseName: course.courseName,
        teacherName: course.teacherName,
        description: course.description,
        price: course.price,
        categoryId: categories.find(
          (c) => c.categoryName === course.categoryName
        )?.id,
      });

      if (course.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: course.imageUrl.split("/").pop() || "",
            status: "done",
            url: course.imageUrl,
            thumbUrl: course.imageUrl,
          },
        ]);
      }
    } else {
      setFileList([]);
    }
  }, [course, categories, form]);

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (str: string) => {
    messageApi.open({
      type: "success",
      content: str,
      duration: 5,
    });
  };

  const errorMessage = (error: any) => {
    const errorMsg =
      error.response?.data?.message || "An unexpected error occurred.";
    messageApi.open({
      type: "error",
      content: errorMsg,
      duration: 5,
    });
  };

  const prepareFormData = (values: Course) => {
    const data = {
      ...values,
      id: id || undefined,
      imageUrl: course?.imageUrl || null,
    };

    const newFormData = new FormData();

    if (fileList.length > 0 && fileList[0].originFileObj) {
      newFormData.append("file", fileList[0].originFileObj);
      data.imageUrl = null;
    }

    newFormData.append(
      "course",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    return newFormData;
  };

  const addData = async (values: Course) => {
    const newFormData = prepareFormData(values);

    setLoading(true);
    try {
      const res = await axios.post(apiCourse, newFormData, {
        headers: { Authorization: "Bearer " + token.token },
      });
      successMessage(res.data.msg);
      formData();
      close();
    } catch (error) {
      console.error("Error saving course:", error);
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={mode === "update" ? `Update Course Id: ${name}` : "Add New Course"}
      onCancel={handleCancel}
      open={open}
      footer={null}
    >
      {contextHolder}
      <Form
        onFinish={addData}
        form={form}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item>
          <Upload
            listType="picture-circle"
            beforeUpload={() => false}
            maxCount={1}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            accept=".jpeg,.png,.gif,.jpg"
          >
            {fileList.length < 1 && "Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Course Name"
          name="courseName"
          labelAlign="left"
          hasFeedback
          rules={[
            { required: true, message: "Please enter a course name" },
            { min: 3, message: "Name must be at least 3 characters long" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Teacher Name"
          name="teacherName"
          hasFeedback
          rules={[{ required: true, message: "Please enter a teacher name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Description"
          name="description"
          hasFeedback
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Price"
          name="price"
          hasFeedback
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Category"
          name="categoryId"
          hasFeedback
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            showSearch
            options={categories.map((category) => ({
              value: category.id,
              label: category.categoryName,
            }))}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCourse;
