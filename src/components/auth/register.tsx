import { Input, Button, Form, message } from "antd";
import { useState } from "react";
import { createSession, registerUrl, userRegister } from "../../util/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

const Register = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const validatePasswordConfirm = async (_, value: string) => {
    if (value && value !== password) {
      throw new Error("The two passwords that you entered do not match!");
    }
  };
  const nav = useNavigate();
  const register = async (value: userRegister) => {
    const newUser = {
      firstname: value.firstname,
      lastname: value.lastname,
      username: value.username,
      password: value.password,
      role: "ADMIN",
    };

    setLoading(true);
    await axios
      .post(registerUrl, newUser)
      .then((res) => {
        createSession(res.data);
        message.success("Login Success");
        nav("/");
      })
      .catch((e) => {
        setLoading(false);
        message.error("Invalid User name or Password");
        setLoading(false);
        throw new Error(e);
      });
  };
  return (
    <>
      <h1 className=" text-2xl font-bold leading-tight tracking-tight md:text-2xl text-left mb-5 text-blue-500 text-opacity-90">
        Admin Register
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        name="login"
        layout={"vertical"}
        onFinish={register}
        requiredMark={false}
      >
        <Form.Item
          name="firstname"
          label={
            <p className="block text-sm font-medium text-gray-900">
              First Name
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
            {
              type: "string",
            },
          ]}
        >
          <Input className="bg-gray-50 text-gray-900 sm:text-sm py-1.5" />
        </Form.Item>
        <Form.Item
          name="lastname"
          label={
            <p className="block text-sm font-medium text-gray-900">Last Name</p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your ",
            },
            {
              type: "string",
            },
          ]}
        >
          <Input className="bg-gray-50 text-gray-900 sm:text-sm py-1.5" />
        </Form.Item>

        <Form.Item
          name="username"
          label={
            <p className="block text-sm font-medium text-gray-900">User Name</p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
            {
              type: "string",
            },
          ]}
        >
          <Input className="bg-gray-50 text-gray-900 sm:text-sm py-1.5" />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <p className="block text-sm font-medium text-gray-900">Password</p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            visibilityToggle={true}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
          />
        </Form.Item>

        <Form.Item
          name="passwordcf"
          label={
            <p className="block text-sm font-medium text-gray-900">Password</p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              validator: validatePasswordConfirm,
            },
          ]}
        >
          <Input.Password
            visibilityToggle={true}
            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
          />
        </Form.Item>

        <div className="text-center">
          <Button
            className="mt-4 bg-primary"
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType={"submit"}
          >
            Register
          </Button>
          <div className="mt-4">
            <Link className=" underline text-blue-700 " to={`${routes.login}`}>
              Already Have Account
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Register;
