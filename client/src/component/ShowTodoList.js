import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../API/api';
import { TodoContext } from '../contextApi/TodoContextProvider';
// import Process from './Process';

const ShowTodoList = () => {
    const { todoList } = useContext(TodoContext);
    const [inProgress, setInprogress] = useState(false);
    const [done, setDone] = useState(false);

    // const handelTodo = (id) => {
       
    // }
    const handelInprogress = (id) => {
        setInprogress(!inProgress); 
        setDone(false)
        const inprogressObj = {inProgress,done}
        fetch(`${baseURL}/update/${id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(inprogressObj)
          })
            .then((res) => res.json())
            .then((data) => {
              
              if (data.insertedId) {
                toast('Your Todo is in progress');
                
              }
            });

       
    }
    const handelDone = (id) => {
        setDone(!done); 
        setInprogress(false);
        const doneObj = {done,inProgress}
        fetch(`${baseURL}/done/${id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(doneObj)
          })
            .then((res) => res.json())
            .then((data) => {
              
              if (data.insertedId) {
                toast('Your Todo is in progress');
                
              }
            });

       
    }

 
  return (
    <>
       <section className='grid justify-center items-center mt-10 gap-y-5'>
              {
                  todoList?.map(todo =>   <article className="w-[200px] h-[100px] border py-4 rounded-lg">
                  <h1 className={( 'text-2xl' && todo.inProgress && !todo.done  ? 'text-green-500 ': null)  || ( 'text-2xl'&& todo.done && !todo.inProgress ? 'line-through ':null)}>Title: {todo.todoName} </h1>
                  <p className={('text-sm' && todo.inProgress && !todo.done  ? 'text-green-500': null) || ('text-sm' && todo.done && !todo.inProgress ? 'line-through':null)} >Description: {todo.todoDescription} </p>
                  <button  className="border bg-slate-500">todo</button>
                  <button onClick={() => handelInprogress(todo._id)} className="border bg-green-600">Inprogress</button>
                  <button onClick={()=>handelDone(todo._id)} className="border bg-red-600">done</button>
                </article>)
         }
      </section>
    </>
  );
};

export default ShowTodoList;
