import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Course, CourseUpdate, courseUrl } from "../../util/course";
import axios from "axios";
import { UploadFile } from "antd/es/upload/interface";
import { getTokenFromStorage } from "../../util/auth";
import { classApi, classType } from "../../util/class";

interface Prop {
  open: boolean;
  id: number;
  course: CourseUpdate;
  close: () => void;
  formData: (dt: Course) => void;
}

const UpdateCourse = ({ open, close, formData, id, course }: Prop) => {
  const [form] = useForm<Course>(); // Generic type for form data
  const [classed, setClass] = useState<classType[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]); // State for file list
  useEffect(() => {
    axios
      .get(classApi, {
        headers: {
          Authorization: `Bearer ${getTokenFromStorage()}`,
        },
      })
      .then((res) => setClass(res.data))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    if (course.imgUrl) {
      setFileList([
        {
          uid: "-1",
          name: course.imageName,
          status: "done",
          url: course.imgUrl,
          thumbUrl: course.imgUrl,
        },
      ]);
    }
  }, [course.imageName]);

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Course Updated",
      duration: 5,
    });
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
      const file = fileList[0].originFileObj;
      console.log(file);
      if (file) {
        console.log("true");
        newFormData.append("file", file);
      } else {
        try {
          const response = await axios.get(course.imgUrl, {
            responseType: "blob",
          });
          const imageBlob = response.data;
          const fileName = course.imageName;
          console.log("fail");
          newFormData.append("file", imageBlob, fileName);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    newFormData.append(
      "course",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .put(`${courseUrl}/${id}`, newFormData, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      })
      .then((res) => {
        success();
        formData(res.data);
        close();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal
      title={`Update Course Id: ${id}`}
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
            onChange={({ fileList }) => {
              setFileList(fileList);
            }}
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
          initialValue={course.courseName}
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
          initialValue={course.teacherName}
          rules={[{ required: true, message: "Please enter a Teacher name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Description"
          name="description"
          hasFeedback
          initialValue={course.description}
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Price"
          name="price"
          hasFeedback
          initialValue={course.price}
          rules={[{ required: true, message: "Please enter a Price" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Class"
          name="cateId"
          hasFeedback
          initialValue={course.cateId}
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
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCourse;
