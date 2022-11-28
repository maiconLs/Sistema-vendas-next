import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function NovoProduto({display}) {
  const [novoProduto, setNovoProduto] = useState();

  const router = useRouter();

  function handleChange(e) {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
    console.log(novoProduto);
  }

  useEffect(() => {
    const data = new Date();

    const criadoEm = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;

    setNovoProduto({ ...novoProduto, criadoEm });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("/api/criarProduto/", novoProduto)
      .then((response) => {
        router.push("/produtos");
        toast.success("Produto criado com sucesso!");
      })
      .catch((error) => toast.error(error.response.data.message));
  }
  return (
    <div className={`${display} w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-40`}>
      <div className='w-5/12  bg-white rounded '>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center m-7'
        >
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
