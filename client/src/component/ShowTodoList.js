import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import baseURL from '../API/api';
import { TodoContext } from '../contextApi/TodoContextProvider';
// import Process from './Process';

const ShowTodoList = () => {
  const { todoList } = useContext(TodoContext);
  const [todo, setTodo] = useState(true);
  const [inProgress, setInprogress] = useState(false);
  const [done, setDone] = useState(false);

  const handelTodo = (id) => {
    setTodo(true);
    setInprogress(false);
    setDone(false);
    const processObject = { inProgress, done,todo };
    fetch(`${baseURL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(processObject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          if (todo === true) {
            toast('You are back to todo');
          }
        }
      });
  };
  const handelInprogress = (id) => {
    setInprogress(!inProgress);
    setDone(false);
    setTodo(false);
    const processObject = { inProgress, done, todo };
    fetch(`${baseURL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(processObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          if (inProgress === true) {
            
            toast('Your Todo is in progress');
          }
        }
      });
  };
  const handelDone = (id) => {
    setDone(!done);
    setInprogress(false);
    setTodo(false);
    const procressObject = { done, inProgress, todo };
    fetch(`${baseURL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(procressObject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          if (done === true) {
            toast('Your Todo is completed');
          }
          
        }
      });
  };

  return (
    <>
      <section className="grid justify-center items-center mt-10 gap-y-5">
        {todoList?.map((todo) => (
          <article className="w-[200px]  border py-4 rounded-lg ">
            <h1
              className={
                ('text-2xl' && todo.inProgress && !todo.done
                  ? 'text-green-500 '
                  : null) ||
                ('text-2xl' && todo.done && !todo.inProgress
                  ? 'line-through '
                  : null)
              }
            >
              Title: {todo.todoName}{' '}
            </h1>
            <p
              className={
                ('text-sm' && todo.inProgress && !todo.done
                  ? 'text-green-500'
                  : null) ||
                ('text-sm' && todo.done && !todo.inProgress
                  ? 'line-through'
                  : null)
              }
            >
              Description: {todo.todoDescription}{' '}
            </p>
            <button onClick={()=> handelTodo(todo._id)} className="border bg-slate-500 px-2 py-1 rounded-lg">todo</button>
            <button
              onClick={() => handelInprogress(todo._id)}
              className="border bg-green-600 px-2 py-1 rounded-lg"
            >
              Inprogress
            </button>
            <button
              onClick={() => handelDone(todo._id)}
              className="border bg-red-600 px-2 py-1 rounded-lg "
            >
              done
            </button>
          </article>
        ))}
        <ToastContainer></ToastContainer>
      </section>
    </>
  );
};

export default ShowTodoList;
