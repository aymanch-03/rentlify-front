import { ThemeProvider } from "./components/theme-provider";

import UsersPage from "./pages/Users";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UsersPage />
    </ThemeProvider>
  );
}

export default App;
