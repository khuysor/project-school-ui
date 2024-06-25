import {
  Button,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Course, courseUrl } from "../../util/course";
import axios from "axios";

import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { getAuth } from "../../util/auth";
import { classApi, classType } from "../../util/class";

interface Prop {
  open: boolean;
  close: () => void;
  formData: (dt: Course) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AddCourse = ({ open, close, formData }: Prop) => {
  const [form] = useForm<Course>();
  const [code, setCode] = useState("");
  const [classed, setClass] = useState<classType[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = getAuth();
  const handleCancel = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    axios
      .get(classApi, { headers: { Authorization: `Bearer ${token.token}` } })
      .then((res) => setClass(res.data))
      .catch((e) => console.log(e));
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Subject Created",
      duration: 5,
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleFile = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setFileList(fileList);
  };

  const addData = async (value: Course) => {
    const data = {
      courseName: value.courseName,
      teacherName: value.teacherName,
      description: value.description,
      price: value.price,
      cateId: value.cateId,
    };

    const newFormData = new FormData();
    if (fileList.length > 0) {
      newFormData.append("file", fileList[0].originFileObj as File);
    }
    newFormData.append(
      "course",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post(courseUrl, newFormData, {
        headers: { Authorization: "Bearer " + token.token },
      })
      .then((res) => {
        success();
        formData(res.data);
        setFileList([]);
      })
      .catch((e) => console.log(e));
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <Modal title="New Course" onCancel={handleCancel} open={open} footer={null}>
      {contextHolder}
      <Form
        onFinish={(value) => {
          addData(value);
          close();
        }}
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
            onChange={handleFile}
            onPreview={handlePreview}
            accept=".jpeg,.png,.gif,.jpg"
          >
            {fileList.length < 1 && uploadButton}
          </Upload>
          <Image
            style={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
            }}
            src={previewImage}
          />
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
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Teacher Name"
          name="teacherName"
          hasFeedback
          rules={[{ required: true, message: "Please enter a Teacher name" }]}
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
          rules={[{ required: true, message: "Please enter a Price" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Class"
          name="cateId"
          hasFeedback
          rules={[{ required: true, message: "Please select a class" }]}
        >
          <Select>
            {classed.map((ct, index) => (
              <Select.Option key={index} value={ct.id}>
                {ct.name}
              </Select.Option>
            ))}
          </Select>
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

export default AddCourse;
