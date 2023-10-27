import { ThemeProvider } from "./components/theme-provider";
import OrderPage from "./pages/Order";
import CustomerPage from "./pages/page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CustomerPage />
      <OrderPage />
    </ThemeProvider>
  );
}

export default App;
