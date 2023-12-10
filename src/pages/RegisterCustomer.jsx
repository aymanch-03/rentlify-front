import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import compLogo from "../assets/Logo/singLogoBlack.png";
import { RegisterForm } from "../components/AuthCustomer/RegisterForm";
const RegisterCustomer = () => {
  return (
    <>
      <div
        className="containe 
      flex bg-center  bg-cover bg-no-repeat relative min-h-[90vh] items-center justify-center  lg:max-w-none  lg:px-0"
      >
        <Link
          to="/"
          className="absolute group top-0 p-10 left-0 flex items-center gap-2"
        >
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Back Home</span>
        </Link>
        <Link
          to="/login"
          className="absolute group top-0 p-10 right-0 flex items-center gap-2"
        >
          <span className="font-medium text-sm">Login</span>
          <Icon
            icon="solar:arrow-right-line-duotone"
            className="group-hover:ml-2 h-4 w-4 transition-all"
          />
        </Link>
        <div className="absolute opacity-30 -z-10 w-full h-full  inset-0 bg-[url('https://tailwindcss.com/_next/static/media/0.2a25f0af.jpg')] bg-center bg-no-repeat bg-cover"></div>

        <div className="p-8 backdrop-saturate-[180%] backdrop-blur-[9px] bg-white/30 rounded-lg  relative z-20">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <img
                src={compLogo}
                alt=""
                className="mix-blend-multiply h-10 w-10 self-center"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to the entrance <br />
                Register to continue
              </h1>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCustomer;
