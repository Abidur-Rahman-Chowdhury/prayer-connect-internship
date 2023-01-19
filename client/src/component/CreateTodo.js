import React from 'react';

const CreateTodo = () => {
    return (
        <section className='grid items-center place-items-center mt-14 '>
        <form className='flex flex-col gap-5 border p-5 rounded-md'>

            <input type="text" name='todoName' placeholder='Todo' className='border-gray-600 border px-2 py-1 rounded-lg '  />
            <input type="text" name='todoDescription' placeholder='Description ' className='border-gray-600 border px-2 py-1 rounded-lg' />
            <input type="submit" value="Submit"  className='bg-green-400 rounded-xl py-1 text-white font-bold'/>
        </form>
    </section>
    );
};

export default CreateTodo;