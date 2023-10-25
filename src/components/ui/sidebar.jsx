import { useState } from "react";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div className="h-screen max-w-[16rem] overflow-hidden">
      <nav className="h-full flex flex-col shadow-md">
        <div className="p-4 "></div>
        <div className="p-4 flex-1 bg-background">
          <span className="capitalize text-sm text-foreground/70">
            Main menu
          </span>
          <ul></ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
