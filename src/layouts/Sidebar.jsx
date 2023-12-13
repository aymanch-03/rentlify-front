import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blackLogo from "../assets/Logo/singLogoBlack.png";
import { useSidebar } from "../context/SidebarProvider";

const generalLinks = [
  {
    link: "Dashboard",
    icon: "solar:widget-5-line-duotone",
    path: "/office",
  },
  {
    link: "Customers",
    icon: "solar:users-group-two-rounded-line-duotone",
    path: "/office/customers",
  },
  {
    link: "Reservations",
    icon: "solar:bill-list-line-duotone",
    path: "/office/orders",
  },
  {
    link: "Listings",
    icon: "solar:layers-line-duotone",
    path: "/office/listings",
  },
  {
    link: "Categories",
    icon: "solar:widget-add-line-duotone",
    path: "/office/categories",
  },
];
const adminLinks = [
  {
    link: "Manage Users",
    icon: "solar:users-group-rounded-line-duotone",
    path: "/office/users",
  },
  {
    link: "Settings",
    icon: "solar:settings-line-duotone",
    path: "/office/profile",
  },
];
const Sidebar = () => {
  const { sidebar, handelSidebar } = useSidebar();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleLinkClick = (path) => {
    setCurrentPath(path);
  };
  useEffect(() => {
    const handlePopstate = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <div
      className={`inset-0 z-[99] h-screen fixed bg-[#fafafa] border-r border-gray-900/10 flex flex-col transition-all ${
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
            const isActive =
              currentPath === item.path ||
              (currentPath.startsWith(item.path + "/") &&
                item.link !== "Dashboard");
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex justify-between  items-center gap-3 py-2 group cursor-pointer transition-all px-5 ${
                  !sidebar && "w-fit hover:bg-primary/10 py-1"
                } ${
                  isActive ? "bg-primary/10 border-r-2 border-primary" : null
                }`}
                onClick={() => handleLinkClick(item.path)}
              >
                <div className="flex items-center gap-3 group">
                  <Icon
                    icon={item.icon}
                    width={23}
                    className={`${!sidebar && "group-hover:text-primary"} ${
                      isActive && "text-primary"
                    }`}
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
            const isActive = currentPath.includes(item.path);
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex justify-between items-center gap-3 py-2 px-5 group cursor-pointer transition-all ${
                  !sidebar && "w-fit hover:bg-primary/10 py-1"
                } ${isActive ? "bg-primary/10 border-r-2 border-primary" : ""}`}
                onClick={() => handleLinkClick(item.path)}
              >
                <div className="flex items-center gap-3 group">
                  <Icon
                    icon={item.icon}
                    width={23}
                    className={`${!sidebar && "group-hover:text-primary"} ${
                      isActive && "text-primary"
                    }`}
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
