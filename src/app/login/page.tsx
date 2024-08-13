"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DotPulseButton from "@/components/DotPulseButton";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}
const LoginPage = () => {
  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, SetMessage] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/list");
    }
  }, [isAuthenticated]);

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (mode === MODE.REGISTER) {
      let data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/customer/register/",
          {
            method: "POST",
            body: data,
          }
        );
        const content = await res.json();
        if (res.ok) {
          SetMessage(content.message);
          setIsAuthenticated(true);
          router.push("/list");
        } else {
          setError(content.message);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      }
    }
    if (mode === MODE.LOGIN) {
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/customer/login/", {
          method: "POST",
          credentials: "include",
          body: data,
        });
        const content = await res.json();
        if (res.ok) {
          SetMessage(content.message);
          router.push("/list");
        } else {
          setError(content.message);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8 max-w-xs" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700" htmlFor="">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="john"
              required
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              required
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              required
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.RESET_PASSWORD), setError(""), SetMessage("");
            }}
          >
            Forgot Password?
          </div>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-white p-2 rounded-md relative"
        >
          {buttonTitle}
          {isLoading && (
            <DotPulseButton
              color="white"
              bgColor="#F35C7A"
              borderRadius="6px"
            />
          )}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.REGISTER), setError(""), SetMessage("");
            }}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN), setError(""), SetMessage("");
            }}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN), setError(""), SetMessage("");
            }}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};
export default LoginPage;
