import { Button, Form, Input, Typography, message } from "antd"
import { createSession, login } from "../../util/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Login = () => {
    const nav = useNavigate()
    message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm()
    const auth = async (values: { username: string; password: string }) => {
        setLoading(true)
        await login(values.username, values.password).then((res: any) => {
            createSession(res.data.token)
            message.success("Login Success")
            nav('/')
        }).catch((e) => {
            message.error("Invalid User name or Password")
            setLoading(false)
        })
    };

    return (<>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-left text-opacity-30 ">
            Admin Login
        </h1>
        <Form
            className="space-y-4 md:space-y-6"
            form={form}
            name="login"
            onFinish={auth}
            layout={'vertical'}
            requiredMark={false}
        >
            <div>
                <Form.Item
                    name="username"
                    label={
                        <p className="block text-sm font-medium text-gray-900">Email</p>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email',
                        },
                        {
                            type: 'string',
                        },
                    ]}
                >
                    <Input
                        className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                    />
                </Form.Item>
            </div>
            <div>
                <Form.Item
                    name="password"
                    label={
                        <p className="block text-sm font-medium text-gray-900">
                            Password
                        </p>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ]}
                >
                    <Input.Password

                        visibilityToggle={false}
                        className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
                    />
                </Form.Item>
            </div>

            <div className="text-center">
                <Button
                    className="mt-4 bg-primary"
                    block
                    loading={loading}
                    type="primary"
                    size="large"
                    htmlType={'submit'}
                >
                    Login
                </Button>
            </div>
        </Form>
    </>
    )
}

export default Login

