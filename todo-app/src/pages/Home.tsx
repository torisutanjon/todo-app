import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AddTodo, TodoDetails } from "../components";
import { todoAPI } from "../api";
import { useMediaQuery } from "react-responsive";

interface TodosType {
  id: string;
  title: string;
  body: string;
  creator: string;
  creator_name: string;
}

const Home = () => {
  const [username, setUsername] = useState("");
  const [component, setComponent] = useState(<></>);
  const [todosState, setTodosState] = useState<Array<TodosType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [todoDetails, setTodoDetails] = useState(
    <>
      <div className="relative h-full w-full flex items-center justify-center">
        <p className="text-[18px] mx-[15%] text-black sm:text-[24px] sm:mx-0">
          Select a todo to display or create one
        </p>
      </div>
    </>
  );

  const userHandler = () => {
    if (username === "") {
      window.location.href = "/login";
    } else {
      window.location.href = "/profile";
    }
  };

  const addTodoHandler = () => {
    setComponent(<AddTodo setElement={setTodoHandler} />);
  };

  const setTodoHandler = (element: JSX.Element) => {
    return setComponent(element);
  };

  const todoListDiv = (
    id: string,
    title: string,
    creator: string,
    creatorName: string
  ) => {
    return (
      <div
        className="relative mx-auto h-[25px] w-[95%] flex flex-col items-center justify-center text-white text-[10px] cursor-pointer hover:bg-white/50 sm:h-[50px] sm:border-[1px] sm:border-white/50 sm:text-[16px]"
        key={id}
        onClick={() => displayTodos(id, creator)}
      >
        {isMobile ? (
          <p>{creatorName}</p>
        ) : (
          <>
            <div className=" relative h-1/2 w-[60%] flex items-center justify-start">
              <p className="text-[16px]">{title}</p>
            </div>
            <div className="relative w-[60%] flex items-center justify-end">
              <p className="text-[12px]">By: {creatorName}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  const displayTodos = (id: string, creator: string) => {
    setTodoDetails(<TodoDetails key={creator} id={id} creator={creator} />);
  };

  const getTodos = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const todos = await todoAPI.getTodo();
      const updatedTodos = todos.map((todo: any) => {
        return {
          id: todo._id,
          title: todo.title,
          body: todo.body,
          creator: todo.creatorID,
          creator_name: todo.creatorName,
        };
      });
      setTodosState(updatedTodos);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  useEffect(() => {
    getTodos();
    const token = localStorage.getItem("token");
    if (token === null) return;
    const decodedToken: any = jwt(token);
    setUsername(decodedToken.username);
  }, []);

  return (
    <div className="relative h-screen w-screen top-0 left-0 bg-white flex flex-row">
      {component}
      <div className="relative h-full w-[15%] bg-[#343434] flex flex-col items-center justify-start">
        <div className="relative h-[20%] w-full flex items-start justify-center">
          {isMobile ? (
            <button
              className="h-[35px] w-[35px] border-[1px] border-white/25 mt-[35%] p-0 flex items-center justify-center"
              onClick={() => addTodoHandler()}
            >
              <p className="p-0 m-0 text-white text-[24px]">+</p>
            </button>
          ) : (
            <button
              className="relative h-[35px] w-[150px] mt-[15%] bg-white text-[12px] text-black"
              onClick={() => addTodoHandler()}
            >
              + Add To Do
            </button>
          )}
        </div>
        <div className="relative h-[80%] w-full">
          <div className="relative h-[10%] w-full flex items-center justify-center sm:h-[20%] sm:justify-start">
            <p className="font-medium text-white text-[10px] sm:text-[16px] sm:ml-[10%]">
              {isMobile ? <>Todos:</> : <>To do list:</>}
            </p>
          </div>
          <div className="relative max-h-[50%] w-full overflow-y-auto">
            {todosState?.length === 0 ? (
              <></>
            ) : (
              todosState?.map((todo: TodosType) => {
                return todoListDiv(
                  todo.id,
                  todo.title,
                  todo.creator,
                  todo.creator_name
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="relative h-full w-[85%] flex flex-col">
        <div className="relative h-[15%] w-full flex items-center justify-end">
          {isMobile ? (
            <button
              className="h-[50px] w-[50px] rounded-[50%] bg-[#343434] mr-[5%] text-white"
              onClick={() => userHandler()}
            >
              {username === "" ? "?" : username.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              className="relative h-[45px] w-[200px] mr-[5%] bg-[#383838] text-white text-[12px] "
              onClick={() => userHandler()}
            >
              {username === null ? (
                <>Login First</>
              ) : (
                <>Signed in as: {username}</>
              )}
            </button>
          )}
        </div>
        <div className="relative h-[85%] w-full flex items-start justify-start">
          <div className="relative h-full w-full sm:w-[70%]">{todoDetails}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
