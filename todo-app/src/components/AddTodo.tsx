import React from "react";
import jwt from "jwt-decode";
import { todoAPI } from "../api";

interface PropTypes {
  setElement: (element: JSX.Element) => void;
}

const AddTodo = ({ setElement }: PropTypes) => {
  const createTodo = async () => {
    const token = localStorage.getItem("token");
    if (token === null) return window.alert("Please login first");
    const decodedToken: any = jwt(token);

    const title = document.getElementById("title_input") as HTMLInputElement;
    const body = document.getElementById(
      "body_textarea"
    ) as HTMLTextAreaElement;

    if (title.value === "" || body.value === "")
      return window.alert("Please fill all fields");

    const res = await todoAPI.createTodo(
      title.value,
      body.value,
      decodedToken.userid,
      decodedToken.username
    );
  };

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black/25 z-[2] flex items-center justify-center">
      <div className="relative h-1/2 w-[95%]  bg-white flex flex-col items-center justify-evenly text-black sm:h-[500px] sm:w-[700px]">
        <p>Create Todo</p>
        <div className="flex flex-row items-end justify-center">
          <p className="text-[14px] p-0 m-0 sm:text-[16px]">Title:</p>
          <input
            type="text"
            id="title_input"
            className="ml-[5%] w-[75%] text-[12px] bg-transparent border-b-[1px] border-b-black/25 outline-none sm:text-[16px] sm:w-full"
          />
        </div>
        <div className="relative flex flex-row">
          <p className="text-[14px] p-0 m-0 sm:text-[16px]">Body:</p>
          <textarea
            name=""
            id="body_textarea"
            className="h-[100px] w-[250px] text-[12px] ml-[5%] bg-transparent border-[1px] border-black/25 outline-none p-[1.5%] sm:h-[150px] sm:w-[300px] sm:text-[16px]"
          ></textarea>
        </div>
        <div className="relative w-full flex flex-row items-center justify-evenly">
          <button
            onClick={() => setElement(<></>)}
            className="relative h-[30px] w-[100px] text-[12px] bg-[#434343] text-white sm:h-[40px] sm:w-[150px] sm:text-[16px]"
          >
            Cancel
          </button>
          <button
            className="relative h-[30px] w-[100px] text-[12px] bg-[#434343] text-white sm:h-[40px] sm:w-[150px] sm:text-[16px]"
            onClick={() => createTodo()}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
