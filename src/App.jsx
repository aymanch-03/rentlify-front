import SidebarProvider from "./context/SidebarProvider";
import Routers from "./routes/routesConfig";
function App() {
  return (
    <SidebarProvider>
      <Routers />
    </SidebarProvider>
  );
}

export default App;
