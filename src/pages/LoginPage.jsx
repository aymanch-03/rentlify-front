import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import blackLogo from "../assets/Logo/blackLogo.svg";
import sideImage from "../assets/loginSideImage.jpeg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <main className="flex w-full overflow-scroll">
      <section className="flex-1 min-h-screen flex flex-col justify-center">
        <div className="xl:p-[90px] lg:p-[50px] md:py-[60px] md:px-[90px] p-[30px]">
          <img src={blackLogo} alt="" className="mb-4" />
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-3">
            Welcome to the entrance <br />
            Login to continue.
          </h1>
          <p className="font-light mb-8 text-black/70 text-lg">
            {"Let's"} get back to your business
          </p>
          <form>
            <div className="mb-6">
              <label htmlFor="" className="text-sm text-black/60 font-light ">
                E-mail
              </label>
              <div className="w-full rounded-full border border-black/30 overflow-hidden px-5">
                <input
                  type="email"
                  name="email"
                  id=""
                  className="flex-1 py-3 w-full outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="" className="text-sm  text-black/60 font-light">
                Password
              </label>
              <div className="w-full rounded-full border border-black/30 overflow-hidden px-5 flex items-center justify-between mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id=""
                  className="flex-1 py-3 outline-none"
                />
                {showPassword ? (
                  <AiOutlineEye
                    size={25}
                    className="text-black/60 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    className="text-black/60 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
              <a
                className="text-right underline font-semibold text-sm block"
                href="/"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-[#222] text-white text-center py-3 rounded-full mt-6 cursor-pointer transition-all hover:bg-[#222]/90"
            />
          </form>
        </div>
      </section>
      <section className="flex-1  lg:block hidden">
        <img src={sideImage} alt="" className="object-cover h-full w-full" />
      </section>
    </main>
  );
};

export default LoginPage;
