import { BellIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/Logo/blackLogo.svg";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          <div className="flex items-center gap-2">
            <img className="h-8 w-auto" src={Logo} alt="RENTLIFY" />
            <p className="uppercase font-bold logo">RENTLIFY</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://lh3.googleusercontent.com/ogw/AKPQZvzU-OONl4AGnE3JMzBq0nMeBq1brMlVt3yTTB1k2A=s32-c-mo"
              alt=""
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
