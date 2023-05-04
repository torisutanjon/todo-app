import React, { useEffect, useState } from "react";
import { todoAPI } from "../api";

interface PropsType {
  id: string;
  creator: string;
}

const TodoDetails = ({ id, creator }: PropsType) => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const getTodoDetailsHandler = async () => {
    try {
      const res = await todoAPI.getTodoDetails(id, creator);
      setTitle(res.title);
      setBody(res.body);
    } catch (error) {
      console.log(error);
    }
  };

  const titleOnchange = (event: any) => {
    setTitle(event.target.value);
  };

  const bodyOnchange = (event: any) => {
    setBody(event.target.value);
  };

  useEffect(() => {
    getTodoDetailsHandler();
  }, [id]);
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-start text-[#8F43EE]">
      <div className="relative mt-[10%] h-[40%] w-[80%] flex flex-col items-start justify-start text-[18px]">
        <div className="relative w-full flex flex-row">
          <p>Todo Title:</p>
          {title === undefined ? (
            <>Loading</>
          ) : (
            <input
              type="text"
              id="title_input"
              value={title}
              onChange={titleOnchange}
              className="ml-[5%] bg-[#2D2727] border-b-[2px] border-b-[#8F43EE] outline-none"
            />
          )}
        </div>
        <br />
        <div className="relative w-full flex flex-row">
          <p>Todo Body: </p>
          <textarea
            name=""
            id=""
            className="h-[150px] w-[300px] ml-[5%] bg-[#413543] border-[2] border-[#8F43EE] outline-none p-[5%]"
            value={body}
            onChange={bodyOnchange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
