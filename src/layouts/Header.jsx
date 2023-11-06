import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
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
          <Icon
            icon="solar:bell-line-duotone"
            width={26}
            className="pt-1 cursor-pointer hover:text-gray-600 transition-all"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://github.com/aymanch-03.png"
                    alt="@aymanch-03"
                  />
                  <AvatarFallback>AE</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Ayman ECHAKAR
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    ayman003@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
