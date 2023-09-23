import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, message } from "antd";
import { useAuthCreateMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./shared/ThemeToggle";
const { Title } = Typography;
export default function LoginForm() {
  const [auth] = useAuthCreateMutation();
  const [msg, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = (values: { email: string; password: string }) => {
    auth({ customTokenObtainPairRequest: { email: values.email, password: values.password } })
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        msg.error(`Error while logging in ${error.status} ${JSON.stringify(error.data)}`);
      });
  };

  return (
    <Row
      justify={"center"}
      style={{
        height: "100vh"
      }}
    >
      <Col
        span={12}
        offset={6}
        xs={{ span: 12, offset: 0 }}
        style={{
          display: "flex",
          alignItems: "center"
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
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
              </Button>
              Signup <a href="">sign up</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
