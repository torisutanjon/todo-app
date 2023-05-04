import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AddTodo, TodoDetails } from "../components";
import { todoAPI } from "../api";

interface TodosType {
  id: string;
  title: string;
  body: string;
  creator: string;
}

const Home = () => {
  const [username, setUsername] = useState(null);
  const [component, setComponent] = useState(<></>);
  const [todosState, setTodosState] = useState<Array<TodosType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [todoDetails, setTodoDetails] = useState(
    <>
      <div className="relative h-full w-full flex items-center justify-center">
        <p className="text-[24px] text-[#8F43EE]">
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
    body: string,
    creator: string
  ) => {
    return (
      <div
        className="relative h-[50px] w-full flex items-center justify-center text-[12px] text-[#8F43EE] hover:bg-[#8F43EE] hover:text-white cursor-pointer"
        key={id}
        onClick={() => displayTodos(id, creator)}
      >
        {title}
      </div>
    );
  };

  const displayTodos = (id: string, creator: string) => {
    setTodoDetails(<TodoDetails key={creator} id={id} creator={creator} />);
  };

  const getTodos = async (userID: string) => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const todos = await todoAPI.getTodo(userID);
      const updatedTodos = todos.map((todo: any) => {
        return {
          id: todo._id,
          title: todo.title,
          body: todo.body,
          creator: todo.creator,
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
    const token = localStorage.getItem("token");
    if (token === null) return;
    const decodedToken: any = jwt(token);
    setUsername(decodedToken.username);
    getTodos(decodedToken.userid);
  }, []);

  return (
    <div className="relative h-screen w-screen top-0 left-0 bg-[#2D2727] flex flex-row">
      {component}
      <div className="relative h-full w-[15%] bg-[#413543] flex flex-col items-center justify-start">
        <div className="relative h-[20%] w-full flex items-start justify-center">
          <button
            className="relative h-[25px] w-[150px] mt-[15%] rounded-[8px] border-[1px] border-[#8F43EE] text-[12px] text-[#8F43EE] hover:bg-[#8F43EE] hover:text-white"
            onClick={() => addTodoHandler()}
          >
            + Add To Do
          </button>
        </div>
        <div className="relative h-[80%] w-full">
          <div className="relative h-[20%] w-full flex items-center justify-start">
            <p className="ml-[10%] font-medium text-[#8F43EE]">To do list:</p>
          </div>
          <div className="relative max-h-[50%] w-full overflow-y-auto">
            {todosState?.length === 0 ? (
              <></>
            ) : (
              todosState?.map((todo: TodosType) => {
                return todoListDiv(
                  todo.id,
                  todo.title,
                  todo.body,
                  todo.creator
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="relative h-full w-[85%] flex flex-col">
        <div className="relative h-[15%] w-full flex items-center justify-end">
          <button
            className="relative h-[45px] w-[200px] border-[1px] border-[#8F43EE] rounded-[10px] mr-[5%] text-[#8F43EE] text-[14px] hover:bg-[#8F43EE] hover:text-white"
            onClick={() => userHandler()}
          >
            {username === null ? (
              <>Login First</>
            ) : (
              <>Signed in as: {"Tristan"}</>
            )}
          </button>
        </div>
        <div className="relative h-[85%] w-full flex items-start justify-start">
          <div className="relative h-[80%] w-[70%]">{todoDetails}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
