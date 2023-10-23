import { ThemeProvider } from "./components/theme-provider";
import AuthenticationPage from "./pages/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthenticationPage />
    </ThemeProvider>
  );
}

export default App;
