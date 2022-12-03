import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";

export default function NovoProduto({click}) {
  const [novoProduto, setNovoProduto] = useState();
  const { data: session } = useSession();

  const router = useRouter();

  function handleChange(e) {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const data = new Date();
    const user = session.user?.email

    const criadoEm = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;

    setNovoProduto({ ...novoProduto, criadoEm, user});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("/api/produtos/criarProduto/", novoProduto)
      .then((response) => {
        router.push('/produtos')
        click()
        toast.success("Produto criado com sucesso!");
      })
      .catch((error) => toast.error(error.response.data.message));
  }
  return (
    <div className=' w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-40'>
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
            type='number'
            placeholder='Valor de custo'
            name='valorCusto'
            step="any"
            pattern="[0-9]+([0-9]+)?"
            onChange={handleChange}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='number'
            placeholder='Valor de venda'
            name='valorVenda'
            step="any"
            pattern="[0-9]+([0-9]+)?"
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
