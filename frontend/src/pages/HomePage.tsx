import { Layout } from "antd"
import React from "react"
import ItemPage from "../components/ItemTable"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function HomePage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <ItemPage />
      <Footer />
    </Layout>
  )
}
