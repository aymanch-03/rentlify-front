import UserDialog from "./components/AddUser/addUserDialog";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="LIGHT" storageKey="vite-ui-theme">
      <UserDialog />
    </ThemeProvider>
  );
}

export default App;
