import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
// import Dashboard from "./pages/Dashboard";
import AuthenticationPage from "./pages/Login";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/dashboard" element={<DashboardRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
