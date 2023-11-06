/* eslint-disable react/prop-types */
import { useSidebar } from "../context/SidebarProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { sidebar } = useSidebar();

  return (
    <>
      <Sidebar />
      <div
        className={`transition-all isolate ${
          sidebar ? "md:pl-72 pl-[3.9rem]" : "pl-[3.9rem]"
        }`}
      >
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
