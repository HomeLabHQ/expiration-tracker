import { Layout } from "antd"
import React from "react"
import ItemPage from "../components/ItemPage"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <ItemPage />
      <Footer />
    </Layout>
  )
}
