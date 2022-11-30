import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import Produto from "../Models/Produto";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AiOutlineClose } from "react-icons/ai";

export default function NovaVenda({ click}) {
  const [novaVenda, setNovaVenda] = useState({});

  const router = useRouter();

  function handleChange(e) {
    setNovaVenda({ ...novaVenda, [e.target.name]: e.target.value });
    console.log(novaVenda);
  }

  useEffect(() => {
    const data = new Date();

    const criadoEm = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;

    setNovaVenda({ ...novaVenda, criadoEm });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("/api/vendas/criarVenda/", novaVenda)
      .then((response) => {
        router.push("/vendas");
        click();
        toast.success("Venda realizada com sucesso!");
      })
      .catch((error) => toast.error(error.response.data.message));
  }
  return (
    <div className=' w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-40'>
      <button onClick={() => click()} className='fixed z-50 top-10 right-10'>
        <AiOutlineClose size={40} />
      </button>
      <div className='w-5/12  bg-white rounded '>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center m-7'
        >
          <h2 className='font-bold text-2xl text-slate-700 p-3 '>
            Cadastrar nova venda
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
            type='number'
            placeholder='Valor de custo'
            name='valorCusto'
            step='any'
            pattern='[0-9]+([.][0-9]+)?'
            onChange={handleChange}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='number'
            placeholder='Valor de venda'
            name='valorVenda'
            step='any'
            pattern='[0-9]+([.][0-9]+)?'
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

// export async function getServerSideProps() {
//     await db.connect();
//     const produtos = await Produto.find().sort({ createdAt: -1 }).lean();
//     return {
//       props: {
//         produtos: produtos?.map(db.convertDocToObj) || '',
//       },
//     };
//   }
