import { Menu, Button } from "antd"
import { CalendarTwoTone } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { AppName } from "../../settings/settings"
import { logout } from "../../app/authSlice"
import { useDispatch } from "react-redux"
import ThemeToggle from "../ThemeToggle"
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
    {
      label: <ThemeToggle />,
      key: "theme",
    },
  ]
  return <Menu items={items} selectable={false} mode="horizontal"></Menu>
}
