/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../redux/reducers/authSlice";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function UserAuthForm({ className, ...props }) {
  const [user, setUser] = useState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(LoginUser(user)).then((result) => {
      if (result.payload) {
        setUser("");
        navigate("/office");
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
    <div className={`grid gap-6  ${className}`} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-sm font-light " htmlFor="user_name">
              Username
            </Label>
            <Input
              className="placeholder:text-black/30 text-sm px-3 py-5"
              id="username"
              name="user_name"
              placeholder="ex: johndoe123"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
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
        </div>
      </form>
    </div>
  );
}

export { UserAuthForm };
