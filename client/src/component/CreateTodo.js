import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../API/api';


const CreateTodo = () => {
    const createTodo = (e) => {
        e.preventDefault();
        const todoName = e.target.todoName.value;
        const todoDescription = e.target.todoDescription.value;
        const newTodo = {
            todoName,
            todoDescription,
            todo: true,
            inProgress: false,
            done: false
        }
        fetch(`${baseURL}/todo`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(newTodo),
          })
            .then((res) => res.json())
            .then((data) => {
              
              if (data.insertedId) {
                toast('Your Todo is successfully created');
                e.target.reset();
              }
            });
       
    }
    return (
        <section className='grid items-center place-items-center mt-14 '>
        <form className='flex flex-col gap-5 border p-5 rounded-md' onSubmit={createTodo}>

            <input type="text" name='todoName' placeholder='Todo' className='border-gray-600 border px-2 py-1 rounded-lg '  />
            <input type="text" name='todoDescription' placeholder='Description ' className='border-gray-600 border px-2 py-1 rounded-lg' />
            <input type="submit" value="Submit"  className='bg-green-400 rounded-xl py-1 text-white font-bold'/>
            </form>
            <ToastContainer />
    </section>
    );
};

export default CreateTodo;