import React from "react"
import { Menu, Button } from "antd"
import { CalendarTwoTone } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { AppName } from "../../settings/settings"
import { logout } from "../../app/authSlice"
import { useDispatch } from "react-redux"
export default function Header() {
  const dispatch = useDispatch()
  const items: MenuProps["items"] = [
    {
      label: AppName,
      key: "mail",
      icon: <CalendarTwoTone />,
    },
    {
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
      key: "logout",
    },
  ]
  return <Menu items={items} selectable={false} mode="horizontal"></Menu>
}
