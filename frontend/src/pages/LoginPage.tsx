import { Layout } from "antd";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Layout
      style={{
        height: "100vh"
      }}
    >
      <LoginForm />
    </Layout>
  );
}
