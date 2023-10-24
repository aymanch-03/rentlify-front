import { ThemeProvider } from "./components/theme-provider";
import TaskPage from "./pages/page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TaskPage />
    </ThemeProvider>
  );
}

export default App;
