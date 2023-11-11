/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const SidebarProviderContext = createContext();

const SidebarProvider = ({ children, ...props }) => {
  const [sidebar, setSidebar] = useState(false);
  const handelSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <SidebarProviderContext.Provider
      {...props}
      value={{ sidebar, handelSidebar }}
    >
      {children}
    </SidebarProviderContext.Provider>
  );
};

export default SidebarProvider;

export const useSidebar = () => {
  const context = useContext(SidebarProviderContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
