import { ThemeProvider } from "./components/theme-provider";
import CustomerPage from "./pages/page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CustomerPage />
    </ThemeProvider>
  );
}

export default App;
