import { ThemeProvider } from "./components/theme-provider";
import AuthenticationPage from "./pages/page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthenticationPage />
    </ThemeProvider>
  );
}

export default App;
