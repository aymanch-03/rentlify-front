/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ user_name: "", password: "" });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/v1/users/login",
        user
      );
      setTimeout(() => {
        console.log(result.data.message);
      }, 3000);
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log(error.response.data.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
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
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}

export { UserAuthForm };
