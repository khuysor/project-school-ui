import { Input, Button, Form } from "antd";

const Register = () => {
  return (
    <>
      <h1 className=" text-2xl font-bold leading-tight tracking-tight md:text-2xl text-left mb-6 text-blue-500 text-opacity-90">
        Admin Register
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        name="login"
        layout={"vertical"}
        requiredMark={false}
      >
        <Form.Item
          name="username"
          label={
            <p className="block text-sm font-medium text-gray-900">
              First Name
            </p>
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
          name="username"
          label={
            <p className="block text-sm font-medium text-gray-900">Last Name</p>
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

        <div className="text-center">
          <Button
            className="mt-4 bg-primary"
            block
            type="primary"
            size="large"
            htmlType={"submit"}
          >
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Register;
