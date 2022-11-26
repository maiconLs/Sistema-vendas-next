import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditarProduto({ id }) {
  const [novoProduto, setNovoProduto] = useState();
  const [produto, setProduto] = useState();

  useEffect(() => {
    const data = async () => {
      await axios.get(`/api/buscarProduto/${id}`).then((res) => {
        setProduto(res.data.produto);
        setNovoProduto(res.data.produto);
      });
    };

    data();
  }, []);

  function handleChange(e) {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .put("/api/editarProduto", novoProduto)
      .then((response) => {
        setNovoProduto();
        // router.push("/produtos");
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-50'>
      <div className='w-5/12  bg-white rounded '>
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
            defaultValue={produto?.valorCusto}
          />
          <input
            className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
            type='text'
            placeholder='Valor de venda'
            name='valorVenda'
            onChange={handleChange}
            defaultValue={produto?.valorVenda}
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
