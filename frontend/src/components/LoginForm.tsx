import { LockOutlined, UserOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from "antd"
import React from "react"
import { useLoginMutation } from "../app/api"
import { useNavigate } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
const { Title } = Typography
export default function LoginForm() {
  const [login] = useLoginMutation()
  const [msg, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const onFinish = (values: LoginValues) => {
    login({ email: values.email, password: values.password })
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        msg.error(
          `Error while logging in ${error.status} ${JSON.stringify(
            error.data,
          )}`,
        )
      })
  }

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Row
        justify={"center"}
        style={{
          height: "100vh",
        }}
      >
        <Col
          span={12}
          offset={6}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {contextHolder}
          <Card style={{ width: 500 }}>
            <ThemeToggle />
            <Title level={2}>Expiration tracker</Title>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
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
                Signup <a href="">sign up</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}
