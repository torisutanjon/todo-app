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
    <div className="absolute h-screen w-screen top-0 left-0 bg-[#8F43EE]/25 z-[2] flex items-center justify-center">
      <div className="relative h-[500px] w-[700px] border-[2px] border-[#8F43EE] rounded-[10px] bg-[#2D2727] flex flex-col items-center justify-evenly text-[#8F43EE]">
        <p>Create Todo</p>
        <div className="flex flex-row">
          <p>Title:</p>
          <input
            type="text"
            id="title_input"
            className="ml-[5%] bg-[#2D2727] border-b-[2px] border-b-[#8F43EE] outline-none"
          />
        </div>
        <div className="flex flex-row">
          <p>Body:</p>
          <textarea
            name=""
            id="body_textarea"
            className="h-[150px] w-[300px] ml-[5%] bg-[#413543] border-[2] border-[#8F43EE] outline-none p-[5%]"
          ></textarea>
        </div>
        <div className="relative w-full flex flex-row items-center justify-evenly">
          <button
            onClick={() => setElement(<></>)}
            className="relative h-[40px] w-[150px] border-[1px] border-[#8F43EE] rounded-[4px] hover:bg-[#8F43EE] hover:text-white"
          >
            Cancel
          </button>
          <button
            className="relative h-[40px] w-[150px] border-[1px] border-[#8F43EE] rounded-[4px] hover:bg-[#8F43EE] hover:text-white"
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
