import React, { useState } from "react";

export default function Header({ title, abrir, nomeBotao, busca }) {
  return (
    <div>
      <div className='bg-slate-200 w-full h-20 pl-56 p-7 flex flex-row justify-between items-center max-[600px]:pl-0 max-[600px]:mt-36'>
        <div className='w-28 max-[600px]:hidden'>
          <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        </div>

        <div>
          <input
            className='rounded border p-2 ml-2 w-56 outline-none ring-indigo-300  focus:ring'
            type='text'
            onChange={(e) => busca(e.target.value)}
            placeholder='Buscar item..'
          />
        </div>
        <button
          onClick={() => abrir()}
          className='w-56 bg-lime-400 rounded h-10 text-white font-bold max-[600px]:fixed max-[600px]:bottom-5 max-[600px]:right-5 max-[600px]:z-40 max-[600px]:w-56'
        >
          {nomeBotao}
        </button>
      </div>
    </div>
  );
}
