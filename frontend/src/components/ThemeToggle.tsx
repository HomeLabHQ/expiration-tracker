import { Switch } from "antd"
import { switchTheme } from "../redux/authSlice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/hooks"
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
