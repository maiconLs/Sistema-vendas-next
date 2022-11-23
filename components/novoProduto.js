import axios from "axios";
import React, { useState } from "react";

export default function NovoProduto() {
  const [novoProduto, setNovoProduto] = useState();

  function handleChange(e) {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
    console.log(novoProduto);
  }

 async function handleSubmit(e){
    e.preventDefault()

    await axios.post('/api/criarProduto', novoProduto)
    .then((response) => {
        setNovoProduto('')
        console.log(response.data)
    })
  }
  return (
    <div className='w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-50'>
      <div className='w-5/12  bg-white rounded '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center m-7'>
          <h2 className='font-bold text-2xl text-slate-700 p-3 '>
            Cadastrar novo produto
          </h2>

          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Nome do produto'
            name='produto'
            onChange={handleChange}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Descrição'
            name='descricao'
            onChange={handleChange}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de custo'
            name='valorCusto'
            onChange={handleChange}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de venda'
            name='valorVenda'
            onChange={handleChange}
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
