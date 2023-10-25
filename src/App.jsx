import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/ui/sidebar";
import AuthenticationPage from "./pages/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <AuthenticationPage /> */}
      <Sidebar />
    </ThemeProvider>
  );
}

export default App;
