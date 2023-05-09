import React, { useEffect, useState } from "react";
import { todoAPI } from "../api";
import jwt from "jwt-decode";
import { CommentSection } from "./index";
interface PropsType {
  id: string;
  creator: string;
}

const TodoDetails = ({ id, creator }: PropsType) => {
  const [dataHolder, setDataHolder] = useState({
    postID: "",
    title: "",
    body: "",
    creatorID: "",
    creatorName: "",
  });
  //for the title input
  const [title, setTitle] = useState("");
  //for the body text area
  const [body, setBody] = useState("");
  const [titleReadOnly, setTitleReadOnly] = useState(true);
  const [bodyReadOnly, setBodyReadOnly] = useState(true);
  const [updateComponent, setUpdateComponent] = useState(<></>);
  const [token] = useState<any>(() => {
    if (localStorage.getItem("token") === null) {
      return null;
    } else {
      return jwt(localStorage.getItem("token")!);
    }
  });

  const getTodoDetailsHandler = async () => {
    try {
      const res = await todoAPI.getTodoDetails(id, creator);
      setDataHolder({
        postID: res._id,
        title: res.title,
        body: res.body,
        creatorID: res.creatorID,
        creatorName: res.creatorName,
      });
      setTitle(res.title);
      setBody(res.body);
    } catch (error) {
      console.log(error);
    }
  };

  const editTitleHandler = () => {
    if (token === null) return window.alert("Login first to do anything");

    if (token.userid !== creator) {
      setTitleReadOnly(true);
      window.alert("Can't edit others' todos!");
    } else {
      setTitleReadOnly(false);
    }
  };

  const editBodyHandler = () => {
    if (token === null) return window.alert("Login first to do anything");

    if (token.userid !== creator) {
      setBodyReadOnly(true);
      window.alert("Can't edit others' todos!");
    } else {
      setBodyReadOnly(false);
    }
  };

  const titleOnchange = (event: any) => {
    setTitle(event.target.value);
  };

  const bodyOnchange = (event: any) => {
    setBody(event.target.value);
  };

  const showUpdateComponent = () => {
    if (title !== dataHolder.title || body !== dataHolder.body) {
      setUpdateComponent(
        <button
          className="relative ml-[15px] h-[25px] w-[75px] text-[12px] border-[1px] border-[#8F43EE] rounded-[2px]"
          onClick={() => updateHandler()}
        >
          Update
        </button>
      );
    } else {
      setUpdateComponent(<></>);
    }
  };

  const updateHandler = async () => {
    await todoAPI.updateTodo(id, title!, body!);
  };

  const deleteHandler = async () => {
    await todoAPI.deleteTodo(id);
  };

  useEffect(() => {
    getTodoDetailsHandler();
  }, [id]);

  useEffect(() => {
    showUpdateComponent();
  }, [title, body]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-start text-[#8F43EE]">
      <div className="relative mt-[10%] h-[40%] w-[80%] flex flex-col items-start justify-start text-[18px]">
        <div className="relative w-full flex flex-row">
          <p>Todo Title:</p>
          <input
            type="text"
            id="title_input"
            value={title}
            onChange={titleOnchange}
            readOnly={titleReadOnly}
            onClick={() => editTitleHandler()}
            className="ml-[5%] bg-[#2D2727] border-b-[2px] border-b-[#8F43EE] outline-none"
          />
        </div>
        <br />
        <div className="relative w-full flex flex-row">
          <p>Todo Body: </p>
          <textarea
            name=""
            id=""
            className="h-[150px] w-[300px] ml-[5%] bg-[#413543] border-[2] border-[#8F43EE] outline-none p-[5px] text-[14px]"
            value={body}
            onChange={bodyOnchange}
            readOnly={bodyReadOnly}
            onClick={() => editBodyHandler()}
          ></textarea>
          <div className="relative flex flex-col">
            {token === null || token.userid !== creator ? (
              <></>
            ) : (
              <button
                className="relative ml-[15px] h-[25px] w-[75px] text-[12px] border-[1px] border-[#8F43EE] rounded-[2px]"
                onClick={() => deleteHandler()}
              >
                Delete
              </button>
            )}
            <br />
            {updateComponent}
          </div>
        </div>
      </div>
      <div className="relative h-[40%] w-[80%] flex items-center justify-center">
        <div className="relative h-[80%] w-full flex flex-row">
          <p>Comments: </p>
          <CommentSection
            todoID={dataHolder.postID}
            todoCreator={dataHolder.creatorID}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
