/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useToast } from "@/components/ui/use-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../redux/reducers/customerSlice";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function RegisterForm({ className, ...props }) {
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.customers);
  const { toast } = useToast();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(registerCustomer(customer));

      if (result.payload.customer) {
        setCustomer("");
        navigate("/login");
        setValidationErrors([]);
      } else {
        const errors = result.payload.error;
        const allErrors = errors.split(".");
        setValidationErrors(allErrors);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An unexpected error occurred.",
      });
    }
  };
  return (
    <div className={`grid gap-4  ${className}`} {...props}>
      {/* <Button
        variant="outline"
        className="py-5 w-full flex-1 flex  items-center justify-center gap-3"
      >
        <Icon icon="devicon:google" className="w-5 h-5" />
        <p> Sign Up with Google</p>
      </Button>
      <Separator className="bg-black/5" /> */}

      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <section className="flex sm:flex-row flex-col gap-2">
            <div className="flex-1">
              <Label className="text-sm font-light " htmlFor="first_name">
                First name
              </Label>
              <Input
                className="placeholder:text-black/30 text-sm px-3 py-5"
                id="first_name"
                name="first_name"
                placeholder="ex: John"
                type="text"
                autoCapitalize="on"
                autoComplete="first_name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <Label className="text-sm font-light " htmlFor="last_name">
                Last name
              </Label>
              <Input
                className="placeholder:text-black/30 text-sm px-3 py-5"
                id="last_name"
                name="last_name"
                placeholder="ex: Doe"
                type="text"
                autoCapitalize="on"
                autoComplete="last_name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleChange}
                required
              />
            </div>
          </section>
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
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
          </div>
          <span className="text-sm text-black/50 font-extralight">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.{" "}
          </span>

          <div className="items-center my-2 flex gap-2">
            <Checkbox name="terms" required />

            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          {validationErrors.map((error, index) => {
            return (
              <span
                className="text-sm text-red-500 flex items-center gap-2"
                key={index}
              >
                <Icon
                  icon="solar:close-circle-bold-duotone"
                  className="w-4 h-4 flex-shrink-0"
                />
                <span>{error}</span>
              </span>
            );
          })}

          <Button disabled={isLoading} className="mt-6 py-5 text-base">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
          <p className=" text-sm  hover:text-black text-black/80 transition-all">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium ">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export { RegisterForm };
