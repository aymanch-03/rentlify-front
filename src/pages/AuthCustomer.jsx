import compLogo from "../assets/Logo/singLogoBlack.png";
import { CustomerAuthForm } from "../components/AuthCustomer/CustomerAuthForm";
const AuthCustomer = () => {
  return (
    <>
      <div
        className="containe bg-[url('src/assets/LoginBg.webp')]
      flex bg-center  bg-cover bg-no-repeat relative min-h-screen items-center justify-center  lg:max-w-none  lg:px-0"
      >
        <div className="absolute inset-0 w-full h-full bg-black/60"></div>
        <div className="p-8  md:border rounded-lg bg-white/100 md:shadow-md relative z-20">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <img
                src={compLogo}
                alt=""
                className="mix-blend-multiply h-10 w-10 self-center"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to the entrance <br />
                Login to continue
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <CustomerAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthCustomer;
