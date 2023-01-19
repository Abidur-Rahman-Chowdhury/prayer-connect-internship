import React from 'react';

const Process = ({ todoName, todoDescription, todo, done, _id, inProgress }) => {
    console.log(todoName, todoDescription, todo, done, _id, inProgress);
  
  return (
    <>
      <article className="w-[200px] h-[100px] border py-4 rounded-lg">
        <h1 className={'text-2xl line-through'}>Title: {todoName} </h1>
        <p>Description: {todoDescription} </p>
        <button className="border bg-slate-500">todo</button>
        <button className="border bg-green-600">Inprogress</button>
        <button className="border bg-red-600">done</button>
      </article>
    </>
  );
};

export default Process;
