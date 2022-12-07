import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AiOutlineClose } from "react-icons/ai";

export default function EditarProduto({ id, click }) {
  const [novoProduto, setNovoProduto] = useState();
  const [produto, setProduto] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      await axios
        .get(`/api/produtos/buscarProduto/${id}`)
        .then((res) => {
          setProduto(res.data.produto);
          setNovoProduto(res.data.produto);
          setLoading(false);
        })
        .catch((error) => toast.error(error.response.data.message));
    };

    data();
  }, []);

  function handleChange(e) {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await axios
      .put("/api/produtos/editarProduto", novoProduto)
      .then((response) => {
        setLoading(false);
        router.push("/produtos");
        click();
        toast.success("Produto editado com sucesso!");
      })
      .catch((error) => toast.error(error.response.data.message));
  }

  return (
    <div className=' w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-50'>
      <button onClick={() => click()} className='fixed z-50 top-10 right-10'>
        <AiOutlineClose size={40} />
      </button>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className='w-5/12  bg-white rounded max-[600px]:w-full max-[600px]:m-5'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center m-7'
          >
            <h2 className='font-bold text-2xl text-slate-700 p-3 '>
              Editar produto
            </h2>

            <input
              className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
              type='text'
              placeholder='Nome do produto'
              name='produto'
              onChange={handleChange}
              defaultValue={produto?.produto}
            />
            <input
              className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
              type='text'
              placeholder='Descrição'
              name='descricao'
              onChange={handleChange}
              defaultValue={produto?.descricao}
            />
            <input
              className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
              type='text'
              placeholder='Valor de custo'
              name='valorCusto'
              onChange={handleChange}
              step='any'
              pattern='[0-9]+([.][0-9]+)?'
              defaultValue={produto?.valorCusto}
            />
            <input
              className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
              type='text'
              placeholder='Valor de venda'
              name='valorVenda'
              onChange={handleChange}
              step='any'
              pattern='[0-9]+([.][0-9]+)?'
              defaultValue={produto?.valorVenda}
            />

            <button
              className='w-72 bg-lime-400 rounded h-10 text-white font-bold m-2'
              type='submit'
            >
              {loading ? <div className="loader"></div> : 'Editar'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
