import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AiOutlineClose } from "react-icons/ai";

import { useSession } from "next-auth/react";

export default function NovaVenda({ click }) {
  const [novaVenda, setNovaVenda] = useState();
  const [produtos, setProdutos] = useState();
  const [produtoFiltrado, setProdutoFiltrado] = useState();
  const [buscar, setBuscar] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const usuario = session.user.email;

  const router = useRouter();

  function escolherProduto(e) {
    setNovaVenda({ ...e, usuario });
  }

  useEffect(() => {
    const busca = async () => {
      await axios
        .get("/api/produtos/buscarProdutos")
        .then((res) => {
          setProdutos(res.data.produto);
          console.log(produtos);
        })
        .catch((error) => toast.error(error));
    };

    busca();

    const buscando = produtos?.filter((produto) =>
      produto.produto.toLowerCase().includes(buscar?.toLowerCase())
    );
    setProdutoFiltrado(buscando);
  }, [buscar]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = new Date();

    const criadoEm = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
    novaVenda.criadoEm = criadoEm;

    await axios
      .post("/api/vendas/criarVenda/", novaVenda)
      .then((response) => {
        router.push("/vendas");
        setLoading(false);
        click();
        toast.success(response.data.message);
        console.log(response.data.produto);
      })
      .catch((error) => toast.error(error.response.data.message));
  }
  return (
    <div className=' w-full h-full bg-black/[.4] flex flex-row justify-center items-center fixed inset-0 z-40'>
      <button onClick={() => click()} className='fixed z-50 top-10 right-10'>
        <AiOutlineClose size={40} />
      </button>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <div className='w-5/12  bg-white rounded max-[600px]:w-full max-[600px]:m-5'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center m-7'
          >
            <h2 className='font-bold text-2xl text-slate-700 p-3 '>
              Realizar nova venda
            </h2>
            <div>
              <input
                className='rounded border p-2 w-72 outline-none ring-indigo-300 m-4 focus:ring'
                type='text'
                placeholder='Nome do produto'
                name='produto'
                autoComplete='off'
                onChange={(e) => setBuscar(e.target.value)}
              />

              {produtoFiltrado &&
                produtoFiltrado.map((produto) => (
                  <div
                    key={produto._id}
                    className='rounded bg-white p-3 fixed z-50 shadow-lg list-none m-4 mt-0 w-56 '
                  >
                    <li
                      className='cursor-pointer'
                      onClick={() => escolherProduto(produto)}
                    >
                      <button type='submit'>{produto.produto}</button>
                    </li>
                  </div>
                ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
