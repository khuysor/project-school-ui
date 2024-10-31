import { Button, Form, Input, Typography, message } from "antd";
import { createSession, login } from "../../util/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { routes } from "../../routes/routes";
import { useForm } from "antd/es/form/Form";
const Login = () => {
  const nav = useNavigate();
  message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const auth = async (values: { username: string; password: string }) => {
    setLoading(true);
    await login(values.username, values.password)
      .then((res: any) => {
        createSession(res.data);
        console.log(res.data);
        message.success("Login Success");
        nav("/");
      })
      .catch(() => {
        message.error("Invalid User name or Password");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className=" text-2xl font-bold leading-tight tracking-tight md:text-2xl text-left mb-6 text-blue-500 text-opacity-90">
        Admin Login
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        form={form}
        name="login"
        onFinish={auth}
        layout={"vertical"}
        requiredMark={false}
      >
        <Form.Item
          name="username"
          label={
            <p className="block text-sm font-medium text-gray-900">User Name</p>
          }
          rules={[
            {
              required: true,
              message: "Please enter your email",
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
            visibilityToggle={false}
            className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
          />
        </Form.Item>

        <div className="text-center ">
          <Button
            className="mt-4 bg-primary"
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType={"submit"}
          >
            Login
          </Button>
          <div className="mt-4">
            <Link
              className=" underline text-blue-700"
              to={`${routes.userregister}`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
