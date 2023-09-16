import * as React from "react"
import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import { store } from "../app/store"
import ItemModalForm from "../components/ItemModalForm"

describe("LoginPage", () => {
  it("renders LoginPage component", () => {
    render(
      <Provider store={store}>
        <ItemModalForm />
      </Provider>,
    )
  })
})
