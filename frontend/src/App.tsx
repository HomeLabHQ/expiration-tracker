import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "./redux/hooks";
import ItemPage from "./pages/ItemPage";
const PUBLIC_URL = process.env.PUBLIC_URL;
export default function App() {
  const { mode } = useAppSelector((state) => state.auth);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  return (
    <ConfigProvider theme={{ algorithm: mode == "dark" ? darkAlgorithm : defaultAlgorithm }}>
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ItemPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
