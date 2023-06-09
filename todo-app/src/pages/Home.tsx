import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AddTodo, TodoDetails } from "../components";
import { todoAPI } from "../api";

interface TodosType {
  id: string;
  title: string;
  body: string;
  creator: string;
  creator_name: string;
}

const Home = () => {
  const [username, setUsername] = useState(null);
  const [component, setComponent] = useState(<></>);
  const [todosState, setTodosState] = useState<Array<TodosType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [todoDetails, setTodoDetails] = useState(
    <>
      <div className="relative h-full w-full flex items-center justify-center">
        <p className="text-[24px] text-black">
          Select a todo to display or create one
        </p>
      </div>
    </>
  );

  const userHandler = () => {
    if (username === null) {
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
        className="relative mx-auto h-[50px] w-[95%] flex flex-col items-center justify-center border-[1px] border-white/50 text-white cursor-pointer hover:bg-white/50"
        key={id}
        onClick={() => displayTodos(id, creator)}
      >
        <div className=" relative h-1/2 w-[60%] flex items-center justify-start">
          <p className="text-[16px]">{title}</p>
        </div>
        <div className="relative w-[60%] flex items-center justify-end">
          <p className="text-[12px]">By: {creatorName}</p>
        </div>
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
          <button
            className="relative h-[35px] w-[150px] mt-[15%] bg-white text-[12px] text-black"
            onClick={() => addTodoHandler()}
          >
            + Add To Do
          </button>
        </div>
        <div className="relative h-[80%] w-full">
          <div className="relative h-[20%] w-full flex items-center justify-start">
            <p className="ml-[10%] font-medium text-white">To do list:</p>
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
        </div>
        <div className="relative h-[85%] w-full flex items-start justify-start">
          <div className="relative h-full w-[70%]">{todoDetails}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
