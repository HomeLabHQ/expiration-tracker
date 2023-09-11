import { Layout } from "antd"
import React from "react"
import { useAppSelector } from "./app/hooks"
import LoginForm from "./features/auth/LoginForm"
import Footer from "./features/common/Footer"
import Header from "./features/common/Header"
import ItemPage from "./features/items/ItemPage"
function App() {
  const { auth } = useAppSelector((state) => state)

  return (
    <div className="App">
      <Layout>
        {auth.isAuthenticated || auth.access ? (
          <React.Fragment>
            <Header />
            <ItemPage />
          </React.Fragment>
        ) : (
          <LoginForm />
        )}
        <Footer />
      </Layout>
    </div>
  )
}

export default App
