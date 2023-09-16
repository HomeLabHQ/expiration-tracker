import React from "react"
import { Switch } from "antd"
import { switchTheme } from "../app/authSlice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
export default function ThemeToggle() {
  const { mode } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()
  return (
    <Switch
      checkedChildren="Dark"
      unCheckedChildren="Light"
      defaultChecked={mode == "dark" ? true : false}
      onChange={() => dispatch(switchTheme())}
    />
  )
}
