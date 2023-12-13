import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import navLogo from "../../assets/Logo/singLogoBlack.png";
import { Separator } from "../ui/separator";
const Footer = () => {
  return (
    <footer className="border-t bg-gray-300/5 border-black/5">
      <main className="mx-auto place-items-start grid max-w-7xl gap-5 items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-between p-6 lg:px-8">
        <div className="flex flex-col gap-3.5 self-start col-span-2 sm:col-span-3 lg:col-span-2">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img className="h-8 w-auto" src={navLogo} alt="Rentlify" />
            <span className="uppercase font-semibold ">RENTLIFY</span>
          </Link>
          <p className="text-sm text-black/80 font-light">
            Welcome to <span className="font-semibold">RENTLIFY</span>, your
            gateway to exceptional homestays. Navigate your travel with ease as
            our web app connects you to a world of distinctive accommodations.
          </p>
        </div>
        <div className="flex flex-col gap-3.5">
          <h1 className="text-sm font-semibold">Discover</h1>
          <ul className="flex flex-col gap-3">
            <Link
              to="/discover/listings"
              className="text-sm group text-black/80 font-light"
            >
              Trends
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
            <Link
              to="/hosting"
              className="text-sm group text-black/80 font-light"
            >
              Host Mode
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
            <Link
              to="/discover/listings"
              className="text-sm group text-black/80 font-light"
            >
              Latest
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
          </ul>{" "}
        </div>
        <div className="flex flex-col gap-3.5 self-start">
          <h1 className="text-sm font-semibold">About</h1>
          <ul className="flex flex-col gap-3">
            <Link to="/" className="text-sm group text-black/80 font-light">
              About RENTLIFY
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
            <Link to="/" className="text-sm group text-black/80 font-light">
              Career
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
          </ul>{" "}
        </div>
        <div className="flex flex-col gap-3.5">
          <h1 className="text-sm font-semibold">Support</h1>
          <ul className="flex flex-col gap-3">
            <Link to="/" className="text-sm group text-black/80 font-light">
              FAQ
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
            <Link to="/" className="text-sm group text-black/80 font-light">
              Cancellation Options
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
            <Link to="/" className="text-sm group text-black/80 font-light">
              Contact
              <span className="text-primary -ml-2 opacity-0 group-hover:ml-1 group-hover:opacity-100 transition-all">
                &rarr;
              </span>
            </Link>
          </ul>{" "}
        </div>
      </main>
      <Separator className=" bg-white" />
      <Separator className=" bg-white" />
      <section className="mx-auto place-items-start flex sm:flex-row flex-col-reverse max-w-7xl items-center justify-center gap-3 sm:justify-between p-6 lg:px-8">
        <p className="text-sm font-extralight">
          © 2023 RENTLIFY. All Rights Reserved
        </p>
        <div className="flex items-center gap-3 text-gray-500/80">
          <Link to="/">
            <Icon icon="fa-brands:facebook" className="h-5 w-5" />
          </Link>
          <Link to="/">
            <Icon icon="fa-brands:instagram" className="h-5 w-5" />
          </Link>
          <Link to="/">
            <Icon icon="fa-brands:twitter" className="h-5 w-5" />
          </Link>
          <Link to="/">
            <Icon icon="fa-brands:youtube" className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
