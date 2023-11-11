import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import blackLogo from "../assets/Logo/singLogoBlack.svg";
import { useSidebar } from "../context/SidebarProvider";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
const generalLinks = [
  {
    link: "Dashboard",
    icon: "solar:widget-5-line-duotone",
    path: "/dashboard",
  },
  {
    link: "Customers",
    icon: "solar:users-group-two-rounded-line-duotone",
    path: "/customers",
  },
  {
    link: "Order Management",
    icon: "solar:bill-list-line-duotone",
    path: "/orders",
  },
  {
    link: "Transactions",
    icon: "solar:transfer-horizontal-bold-duotone",
    path: "/payements",
  },
];
const adminLinks = [
  {
    link: "Manage Users",
    icon: "solar:users-group-rounded-line-duotone",
    path: "/users",
  },
  { link: "Admin Roles", icon: "solar:settings-line-duotone", path: "/users" },
];
const Sidebar = () => {
  const { sidebar, handelSidebar } = useSidebar();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleLinkClick = (path) => {
    setCurrentPath(path);
  };

  return (
    <div
      className={`inset-0 z-[9999] h-screen fixed bg-[#fafafa] border-r border-gray-900/10 flex flex-col transition-all ${
        sidebar ? "md:w-72 w-60" : "w-[3.9rem]"
      }`}
    >
      <ChevronRightIcon
        width={22}
        onClick={handelSidebar}
        className={`rounded-full p-1 border absolute -right-3 top-5 z-[60] bg-gray-100 cursor-pointer ${
          sidebar && "rotate-180"
        }`}
      />

      <div className="space-y-5 whitespace-nowrap flex-1  pt-[1.1rem]">
        <div className="flex items-center gap-2 px-4">
          <img
            className="h-8 mix-blend-multiply w-auto"
            src={blackLogo}
            alt="RENTLIFY"
          />
          {sidebar && (
            <p className="uppercase transition-all font-bold">RENTLIFY</p>
          )}
        </div>
        <p
          className={`text-gray-500/40 text-sm transition-all font-medium uppercase px-5 ${
            !sidebar && "opacity-0"
          }`}
        >
          general
        </p>
        <ul className="flex flex-col gap-2.5">
          {generalLinks.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex justify-between  items-center gap-3 py-2 group cursor-pointer transition-all px-5 ${
                  !sidebar && "w-fit hover:bg-primary/10 py-1"
                } ${
                  item.path === currentPath
                    ? "bg-primary/10 border-r-2 border-primary"
                    : null
                }`}
                onClick={() => handleLinkClick(item.path)}
              >
                <div className="flex items-center gap-3 group">
                  <Icon
                    icon={item.icon}
                    width={23}
                    className={!sidebar && "group-hover:text-primary"}
                  />
                  <p
                    className={`text-sm transition-all ${
                      !sidebar && "opacity-0 hidden"
                    }`}
                  >
                    {item.link}
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>
        <p
          className={`text-gray-500/40 text-sm transition-all font-medium uppercase px-5 ${
            !sidebar && "opacity-0"
          }`}
        >
          Admin
        </p>
        <ul className="flex flex-col gap-2.5">
          {adminLinks.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex justify-between items-center gap-3 py-2 px-5 group cursor-pointer transition-all ${
                  !sidebar && "w-fit hover:bg-primary/10 py-1"
                } ${
                  item.path === currentPath
                    ? "bg-primary/10 border-r-2 border-primary"
                    : ""
                }`}
                onClick={() => handleLinkClick(item.path)}
              >
                <div className="flex items-center gap-3 group">
                  <Icon
                    icon={item.icon}
                    width={23}
                    className={`${!sidebar && "group-hover:text-primary"}`}
                  />
                  <p
                    className={`text-sm transition-all ${
                      !sidebar && "opacity-0 hidden"
                    }`}
                  >
                    {item.link}
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;