import { ThemeProvider } from "./components/theme-provider";
import OrderPage from "./pages/Order";
import CustomerPage from "./pages/page";
import UsersPage from "./pages/Users";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CustomerPage />
      <UsersPage />
      <OrderPage />
    </ThemeProvider>
  );
}

export default App;
