import { ProfileForm } from "./components/AddUser/AddUser";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProfileForm />
    </ThemeProvider>
  );
}

export default App;
