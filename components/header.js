import React, { useState } from "react";

export default function Header({ title, abrir, nomeBotao, busca }) {
  return (
    <div>
      <div className='bg-slate-200 w-full h-20 pl-56 p-7 flex flex-row justify-between items-center'>
        <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        <div>
            <input
              className='rounded border p-2 w-56 outline-none ring-indigo-300  focus:ring'
              type='text'
              onChange={(e) => busca(e.target.value)}
              placeholder='Buscar produto..'
            />
          </div>
        <button
            onClick={() => abrir()}
            className='w-56 bg-lime-400 rounded h-10 text-white font-bold'
          >
            {nomeBotao}
          </button>
      </div>
    </div>
  );
}
