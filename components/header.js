import React, {useState} from "react";

export default function Header({ title, button }) {

  return (
    <div>
      <div className='bg-slate-200 w-full h-20 pl-56 p-7 flex flex-row justify-between items-center'>
        <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        <input
          className='rounded border p-2 w-56 outline-none ring-indigo-300  focus:ring'
          type='text'
        />
       {button}
      </div>


    </div>
    
  );
}
