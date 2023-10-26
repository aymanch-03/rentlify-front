/* eslint-disable react/prop-types */
import { ChevronFirstIcon } from "lucide-react";
import { createContext, useContext, useState } from "react";
import Logo from "../../assets/Logo/singLogoBlack.svg";
const SidebarContx = createContext();
export const SidebarLinks = ({ itemIcon, active, itemTitle }) => {
  const { sidebar } = useContext(SidebarContx);
  return (
    <li
      className={`flex items-center gap-2 rounded-md cursor-pointer ${
        active ? "bg-slate-400" : null
      }`}
    >
      {itemIcon}
      <span className={`text-sm ${sidebar ? null : "hidden"}`}>
        {itemTitle}
      </span>
    </li>
  );
};

const Sidebar = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <div
      className={`h-screen transition-all  ${
        sidebar ? "w-[16rem]" : "w-[4rem]"
      } overflow-hidden`}
    >
      <nav className="h-full p-5 space-y-5 flex flex-col transition-all shadow-md border-r">
        <div className="flex items-center gap-5 justify-between transition-all">
          {sidebar ? (
            <div className="flex items-center gap-2">
              <img className="h-8 w-auto" src={Logo} alt="RENTLIFY" />
              <p className="uppercase font-bold logo">RENTLIFY</p>
            </div>
          ) : null}{" "}
          <ChevronFirstIcon
            onClick={handleSidebar}
            className={`transition-all cursor-pointer ${
              sidebar ? null : "-rotate-180"
            }`}
          />
        </div>
        <div className="flex-1 bg-background transition-all space-y-2">
          <span
            className={`capitalize text-xs text-foreground/70 whitespace-nowrap ${
              sidebar ? null : "invisible"
            }`}
          >
            Main menu
          </span>
          <SidebarContx.Provider value={{ sidebar }}>
            <ul className="space-y-3">{children}</ul>
          </SidebarContx.Provider>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
