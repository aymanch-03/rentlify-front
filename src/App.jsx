import { Toaster } from "./components/ui/toaster";
import SidebarProvider from "./context/SidebarProvider";
import Routers from "./routes/routesConfig";
function App() {
  return (
    <SidebarProvider>
      <Routers />
      <Toaster />
    </SidebarProvider>
  );
}

export default App;
