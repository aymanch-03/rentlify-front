import { ThemeProvider } from "./components/theme-provider";
// import Example from "./pages/cus-pag";
// import {Content} from "./pages/cus-pag";
// import TaskPage from "./pages/page";
// import AuthenticationPage from "./pages/Login";
import Routers from "./routes/routeconfig"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <Example />
      <Content /> */}
      <Routers />
    </ThemeProvider>
  );
}

export default App;
