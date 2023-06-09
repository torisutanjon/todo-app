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
      <div className="relative h-[500px] w-[700px] bg-white flex flex-col items-center justify-evenly text-black">
        <p>Create Todo</p>
        <div className="flex flex-row">
          <p>Title:</p>
          <input
            type="text"
            id="title_input"
            className="ml-[5%] bg-transparent border-b-[1px] border-b-black outline-none"
          />
        </div>
        <div className="flex flex-row">
          <p>Body:</p>
          <textarea
            name=""
            id="body_textarea"
            className="h-[150px] w-[300px] ml-[5%] bg-transparent border-[1px] border-black outline-none p-[5%]"
          ></textarea>
        </div>
        <div className="relative w-full flex flex-row items-center justify-evenly">
          <button
            onClick={() => setElement(<></>)}
            className="relative h-[40px] w-[150px] bg-[#434343] text-white"
          >
            Cancel
          </button>
          <button
            className="relative h-[40px] w-[150px]  bg-[#434343] text-white"
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
