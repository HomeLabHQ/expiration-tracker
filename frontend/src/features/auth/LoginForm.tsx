import { useLoginMutation } from "../../app/api"
import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

interface Values {
  email: string
  password: string
}

const { Title } = Typography
export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const onFinish = (values: Values) => {
    login({ email: values.email, password: values.password })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Expiration tracker</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
            {/* <a style={{ float: "right" }} href="">
              Forgot password
            </a> */}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            Don't have an account <a href="">sign up</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
