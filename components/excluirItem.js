import React from "react";
import axios from "axios";

import { useRouter } from "next/router";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function ExcluirItem({ rota, atualizar, fechar }) {
  const router = useRouter();

  async function Excluir() {
    await axios
      .delete(rota)
      .then((response) => {
        router.push(atualizar);
        toast.success("Item excluido com sucesso!");
        fechar();
      })
      .catch((error) => toast.error(error));
  }

  return (
    <div className='fixed z-50 w-full min-h-screen flex justify-center items-center inset-0'>
      <div className='w-2/6 h-52 rounded-md bg-white flex flex-col justify-around items-center shadow-xl  '>
        <h1 className='font-bold text-xl'>Deseja excluir este item?</h1>
        <div className='w-full flex flex-row justify-around items-center'>
          <button
            className=' font-bold border-2 px-4 py-1 rounded-md bg-slate-400'
            onClick={() => Excluir()}
          >
            Excluir
          </button>
          <button
            className='font-bold border-2 px-4 py-1 rounded-md bg-gray-200'
            onClick={() => fechar()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
