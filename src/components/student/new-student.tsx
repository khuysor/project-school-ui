import { Button, Flex, Form, Modal, Select, message, notification } from "antd";
import Input from "antd/es/input/Input";

import TextArea from "antd/es/input/TextArea";

import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { getAuth, removeAuth } from "../../util/auth";
import { Student } from "../../type/studentType";
import { apiStudent } from "../../api/backendRoute";
import { useEffect, useState } from "react";

interface Prop {
  open: boolean;
  close: () => void;
  formData: () => void;
  mode: string;
  name?: string;
  id?: number;
  student?: Student;
}

const NewStudent = ({
  open,
  close,
  formData,
  mode,
  student,
  name,
  id,
}: Prop) => {
  const [form] = useForm<Student>();
  const clearForm = () => {
    form.resetFields();
  };
  const [loading, setLoading] = useState(false);
  const token = getAuth();
  useEffect(() => {
    if (open) {
      if (student) {
        form.setFieldsValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          gender: student.gender,
          age: student.age,
          phone: student.phone,
          address: student.address,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, student, form]);
  const createData = (data: Student) => {
    const newStudent = {
      id: id || undefined,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      age: data.age,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    setLoading(true);
    axios
      .post(apiStudent, newStudent, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      })
      .then((res) => {
        notification.info({
          message: "Success",
          description: res.data.msg,
        });
        formData();
      })
      .catch((error) => {
        if (error.response.data.code == 401) {
          notification.error({
            message: "Session Expired",
            description: "Can't create new student ",
          });
          removeAuth();
        } else {
          notification.error({
            message: "Error Fetching Data",
            description:
              error.response?.data?.message ||
              "An error occurred while get student.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      title={`${
        mode == "update" ? `Update Student Name: ${name}` : "New Student"
      }`}
      onCancel={() => {
        clearForm();
        close();
      }}
      open={open}
      footer={true}
    >
      <Form
        onFinish={(value) => {
          createData(value);
          clearForm();
        }}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
      >
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
              validator: (_, value) => {
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
          label="Phone Number"
          name="phone"
          labelAlign={"left"}
          hasFeedback
          rules={[
            { required: true, message: "Please input Phone Number!" },
            { pattern: /^[0-9]+$/, message: "Invalid Phone number!" },
          ]}
        >
          <Input />
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
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
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
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Flex justify={"flex-end"} gap={5} align={"center"}>
          <Button
            type={"default"}
            onClick={() => {
              clearForm();
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default NewStudent;
