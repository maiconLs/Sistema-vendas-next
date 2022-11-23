import React from "react";

export default function NovoProduto({}) {
  return (
    <div className='w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-50'>
      <button className='fixed top-10 right-10'>X</button>
      <div className='w-5/12  bg-white rounded '>
        <form className='flex flex-col justify-center items-center m-7'>
          <h2 className='font-bold text-2xl text-slate-700 p-3 '>
            Cadastrar novo produto
          </h2>

          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Nome do produto'
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Descrição'
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de custo'
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de venda'
          />

          <button
            className='w-72 bg-lime-400 rounded h-10 text-white font-bold m-2'
            type='submit'
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
