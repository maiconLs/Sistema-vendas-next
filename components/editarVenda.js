import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AiOutlineClose } from "react-icons/ai";

export default function EditarVenda({ id, click }) {
  const [novaVenda, setNovaVenda] = useState();
  const [venda, setVenda] = useState();

  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`/api/vendas/buscarVenda/${id}`)
        .then((res) => {
          setVenda(res.data.venda);
          setNovaVenda(res.data.venda);
        })
        .catch((error) => toast.error(error.response.data.message));
    };

    data();
  }, []);

  function handleChange(e) {
    setNovaVenda({ ...novaVenda, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .put("/api/vendas/editarVenda", novaVenda)
      .then((response) => {
        router.push("/vendas");
        click();
        toast.success("Venda editada com sucesso!");
      })
      .catch((error) => toast.error(error.response.data.message));
  }

  return (
    <div className=' w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-50'>
      <button
        onClick={() => click()}
        className='fixed z-50 top-10 right-10'
      >
        <AiOutlineClose size={40} />
      </button>
      <div className='w-5/12  bg-white rounded '>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center m-7'
        >
          <h2 className='font-bold text-2xl text-slate-700 p-3 '>
            Editar venda
          </h2>

          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Nome do produto'
            name='venda'
            onChange={handleChange}
            value={venda?.venda}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Descrição'
            name='descricao'
            onChange={handleChange}
            value={venda?.descricao}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de custo'
            name='valorCusto'
            onChange={handleChange}
            step='any'
            pattern='[0-9]+([.][0-9]+)?'
            value={venda?.valorCusto}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de venda'
            name='valorVenda'
            onChange={handleChange}
            step='any'
            pattern='[0-9]+([.][0-9]+)?'
            value={venda?.valorVenda}
          />

          <button
            className='w-72 bg-lime-400 rounded h-10 text-white font-bold m-2'
            type='submit'
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
