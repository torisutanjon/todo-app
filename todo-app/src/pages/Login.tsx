import React from "react";
import { accountAPI } from "../api";

const Login = () => {
  const loginHandler = async () => {
    const username = document.getElementById(
      "username_input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password_input"
    ) as HTMLInputElement;

    if (username.value === "" || password.value === "")
      return window.alert("Please fill all fields");

    const res = await accountAPI.loginAccount(username.value, password.value);
  };

  return (
    <div className="relative top-0 left-0 h-screen w-screen bg-white flex items-center justify-center text-black">
      <div className="relative h-[600px] w-[400px] border-[1px] border-black flex flex-col">
        <div className="relative h-[20%] w-full flex items-center justify-center">
          <p className=" text-[14px]">Login As:</p>
        </div>
        <div className="relative h-[40%] w-full flex flex-col items-center justify-evenly">
          <input
            type="text"
            id="username_input"
            placeholder="username"
            className="relative h-[35px] w-[200px] text-[14px]  border-b-[1px] border-b-black outline-none bg-transparent pl-[1%]"
          />
          <input
            type="password"
            id="password_input"
            placeholder="password"
            className="relative h-[35px] w-[200px] text-[14px]  border-b-[1px] border-b-black outline-none bg-transparent pl-[1%]"
          />
          <a href="/sign-in" className="text-[14px] underline">
            Create Account
          </a>
        </div>
        <div className="relative h-[40%] w-full flex flex-col items-center justify-end">
          <button
            className="relative h-[35px] w-[175px] bg-[#434343] text-[14px] text-white mb-[25px]"
            onClick={() => loginHandler()}
          >
            Login
          </button>
          <button
            className="relative h-[35px] w-[175px] bg-[#434343] text-[14px] text-white mb-[50px]"
            onClick={() => (window.location.href = "/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
