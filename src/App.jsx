import { AppWindow } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import Sidebar, { SidebarLinks } from "./components/ui/Sidebar.jsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <AuthenticationPage /> */}
      <Sidebar>
        <SidebarLinks
          itemTitle={"Dashboard"}
          itemIcon={<AppWindow size={18} />}
        />
        <SidebarLinks
          itemTitle={"Customers"}
          itemIcon={<AppWindow size={18} />}
        />
        <SidebarLinks
          itemTitle={"Categories"}
          itemIcon={<AppWindow size={18} />}
        />
        <SidebarLinks
          itemTitle={"Transactions"}
          itemIcon={<AppWindow size={18} />}
        />
        <SidebarLinks itemTitle={"Users"} itemIcon={<AppWindow size={18} />} />
      </Sidebar>
    </ThemeProvider>
  );
}

export default App;
