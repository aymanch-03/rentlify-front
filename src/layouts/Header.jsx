/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);
  const handleLogout = () => {
    removeCookie("userToken", { path: "/" });
    window.localStorage.clear("persist:root");
  };
  const user = useSelector((state) => state.auth.user);

  if (user) {
    const fullName = `${user.first_name} ${user.last_name}`;
    const [firstNameInitial, lastNameInitial] = fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase());
    const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;
    return (
      <header className="flex h-16 border-b border-gray-900/10 sticky transition-all top-0 z-50 bg-white">
        <div className="mx-auto container flex w-full items-center justify-between">
          <div className="flex flex-1 items-center gap-x-6">
            {/* <div className="flex items-center gap-2">
              <img className="h-8 w-auto" src={Logo} alt="RENTLIFY" />
              <p className="uppercase font-bold logo">RENTLIFY</p>
            </div> */}
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9 border border-black/20">
                    <AvatarFallback>{fallbackAvatar}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-between"
                  onClick={handleLogout}
                >
                  <span>Log out</span>
                  <Icon
                    icon="solar:logout-2-line-duotone"
                    className="w-4 h-4"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
  } else if (!user) {
    <Navigate to="/auth/login" />;
  }
};

export default Header;
