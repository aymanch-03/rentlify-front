/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../../redux/reducers/authCustomerSlice";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CustomerAuthForm({ className, ...props }) {
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authCustomer);

  const { toast } = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(loginCustomer(customer)).then((result) => {
      if (result.payload) {
        setCustomer("");
        navigate("/discover/listings");
        toast({
          variant: "success",
          title: "Login successful!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid login credentials. Please try again.",
        });
      }
    });
  };

  return (
    <div className={`grid gap-4  ${className}`} {...props}>
      {/* <Button
        variant="outline"
        className="py-5 w-full flex-1 flex  items-center justify-center gap-3"
      >
        <Icon icon="devicon:google" className="w-5 h-5" />
        <p> Login with Google</p>
      </Button>
      <Separator className="bg-black/5" /> */}

      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-sm font-light " htmlFor="email">
              Email
            </Label>
            <Input
              className="placeholder:text-black/30 text-sm px-3 py-5"
              id="email"
              name="email"
              placeholder="example@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-sm font-light" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              className="placeholder:text-black/30 text-sm px-3 py-5"
              name="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
            <a
              href=""
              className="underline text-sm text-right hover:text-black text-black/80 transition-all"
            >
              Forgot Password?
            </a>
          </div>
          <Button disabled={isLoading} className="mt-6 py-5 text-base">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
          <p className=" text-sm  hover:text-black text-black/80 transition-all">
            {"Dont't"} have an account?{" "}
            <Link to="/register" className="underline font-medium ">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export { CustomerAuthForm };
