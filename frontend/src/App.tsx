import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "./redux/hooks";
import ItemPage from "./pages/ItemPage";

export default function App() {
  const { mode } = useAppSelector((state) => state.auth);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  return (
    <ConfigProvider theme={{ algorithm: mode == "dark" ? darkAlgorithm : defaultAlgorithm }}>
      <BrowserRouter>
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
