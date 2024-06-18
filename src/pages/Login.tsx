import { Button, Form, Input, Typography, message } from "antd"
import { createSession, login } from "../util/auth"
import { useNavigate } from "react-router-dom"
const { Title } = Typography
const Login = () => {
    const nav = useNavigate()
    const { contextHolder } = message.useMessage();
    const auth = async (values: { username: string; password: string }) => {
        await login(values.username, values.password).then((res: any) => {
            createSession(res.data.token)
            message.success("Login Success")
            nav('/')
        }).catch(() => {
            message.error("Login Failed")
        })
    };

    return (
        <div className="body">
            <div className="left">
                <div style={{
                    width: '500px', height: '500px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ color: '#FAFAFA', fontSize: 130 }}>
                        Login
                    </h1>
                </div>
                <h1 style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    color: 'white'
                }}>
                    Huysor
                </h1>
            </div>
            <div className="right">
                <div className="login">
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 50 }}
                        style={{ width: '80%' }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        size={"large"}
                        layout="vertical"
                        onFinish={(values) => auth(values)}
                    >
                        {
                            contextHolder
                        }

                        <Form.Item
                            label={<Title level={5} style={{
                                color: 'white'
                            }} >First Name</Title>}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<Title level={5} style={{
                                color: 'white'
                            }}>Passoword</Title>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 19,
                                span: 20,
                            }}
                        >
                            <Button type={"default"} htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login

