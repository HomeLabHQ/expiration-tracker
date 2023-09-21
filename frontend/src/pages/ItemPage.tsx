import { Layout } from "antd";
import ItemTable from "../components/Items/ItemTable";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function ItemPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <ItemTable />
      <Footer />
    </Layout>
  );
}
