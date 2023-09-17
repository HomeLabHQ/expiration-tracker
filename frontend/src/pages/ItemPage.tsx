import { Layout } from "antd"
import ItemTable from "../components/ItemTable"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function ItemPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <ItemTable />
      <Footer />
    </Layout>
  )
}
