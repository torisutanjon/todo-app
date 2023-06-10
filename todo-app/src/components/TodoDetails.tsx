import React, { useEffect, useState } from "react";
import { todoAPI } from "../api";
import jwt from "jwt-decode";
import { CommentSection } from "./index";
import { useMediaQuery } from "react-responsive";
import trashIcon from "../assets/trash-icon.png";
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

  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  useEffect(() => {
    getTodoDetailsHandler();
  }, [id]);

  useEffect(() => {
    showUpdateComponent();
  }, [title, body]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-start text-black">
      <div className="relative h-[40%] w-[80%] flex items-start justify-start text-[18px]">
        <div className="relative h-[80%] w-[90%] gridClass">
          <div className="relative flex items-center justify-end">
            <p className="text-[12px] sm:text-[16px]">Todo Title:</p>
          </div>
          <div className="flex items-center justify-start">
            <input
              type="text"
              id="title_input"
              value={title}
              onChange={titleOnchange}
              readOnly={titleReadOnly}
              onClick={() => editTitleHandler()}
              className="relative pl-[5px] h-[30px] w-[165px] text-[10px] outline-none border-[1px] border-black/50 sm:h-[60px] sm:w-[400px] sm:text-[16px]"
            />
          </div>
          <div className="flex items-start justify-end">
            <p className="text-[12px] sm:text-[16px]">Todo Body:</p>
          </div>
          <div className="flex items-start justify-start">
            <textarea
              name=""
              id=""
              className="h-[100px] w-[225px] text-[10px] border-[1px] border-black/50 outline-none p-[5px] sm:h-[150px] sm:w-[400px] sm:text-[16px]"
              value={body}
              onChange={bodyOnchange}
              readOnly={bodyReadOnly}
              onClick={() => editBodyHandler()}
            ></textarea>
            {token === null || token.userid !== creator ? (
              <></>
            ) : (
              <button
                className="relative ml-[15px] h-[25px] w-[40px] flex items-center justify-center text-[12px] sm:h-[30px] sm:w-[100px] sm:bg-[#434343] sm:text-white"
                onClick={() => deleteHandler()}
              >
                {isMobile ? (
                  <img
                    src={trashIcon}
                    className="relative h-[20px] w-[15px]"
                    alt=""
                  />
                ) : (
                  "Delete"
                )}
              </button>
            )}
            <br />
            {updateComponent}
          </div>
        </div>
      </div>
      <div className="relative h-[50%] w-[80%] flex items-end justify-start">
        <div className="relative h-[80%] w-[90%] gridClass2">
          <div className="flex items-start justify-end">
            <p className="text-[12px] sm:text-[16px]">Comments: </p>
          </div>
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
