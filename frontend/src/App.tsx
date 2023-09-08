import LoginForm from "./features/auth/LoginForm"
import { useAppSelector } from "./app/hooks"
import ItemPage from "./features/items/ItemPage"
import Header from "./features/common/Header"
import { Layout } from "antd"
import React from "react"
import Footer from "./features/common/Footer"
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
