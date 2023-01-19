import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import baseURL from '../API/api';
export const TodoContext = createContext();
const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${baseURL}/todo`);
      setTodoList(res.data);
    };
    getTodos();
  }, [todoList]);
  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
