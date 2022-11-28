import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from 'next/router'

import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";
import EditarProduto from "../components/editarProduto";

import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify'

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState('hidden');
  const [abrirEditar, setAbrirEditar] = useState('hidden');
  const [abrirExcluir, setAbrirExcluir] = useState(false);
  const [idProduto, setIdProduto] = useState("");
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState();

  const router = useRouter()

  useEffect(() => {
    const buscando = produtos.filter((produto) =>
      produto.produto.toLowerCase().includes(busca.toLowerCase())
    );
    setProdutoFiltrado(buscando);
  }, [busca, produtos]);

  function Editar(id) {
    setIdProduto(id);
    setAbrirEditar('block');
  }

  function ModalExcluir(id) {
    setIdProduto(id);
    setAbrirExcluir(true);
  }

  async function Excluir() {
    await axios
      .delete(`/api/excluirProduto/${idProduto}`)
      .then((response) => {
        router.push('/produtos')
        toast.success('Produto excluido com sucesso!')
        setAbrirExcluir(false)
      });
  }
  return (
    <div>
      <Nav />
      <Header
        title='Produtos'
        button={
          <button
            onClick={() => setAbrirModal('block')}
            className='w-56 bg-lime-400 rounded h-10 text-white font-bold'
          >
            Novo Produto
          </button>
        }
        input={
          <div>
            <input
              className='rounded border p-2 w-56 outline-none ring-indigo-300  focus:ring'
              type='text'
              onChange={(e) => setBusca(e.target.value)}
              placeholder='Buscar produto..'
            />
          </div>
        }
      />

      <div className='pl-48 mt-5 '>
        <table className='w-full '>
          <thead className='bg-slate-100'>
            <tr>
              <th className='p-5 w-1/5  text-center'>Produto</th>
              <th className='p-5 w-1/5  text-center'>Valor de Custo</th>
              <th className='p-5 w-1/5  text-center'>Valor de Venda</th>
              <th className='p-5 w-1/5  text-center'>Criado em</th>
              <th className='p-5 w-1/5  text-center'>#</th>
            </tr>
          </thead>
          <tbody className='bg-slate-50'>
            {produtoFiltrado
              ? produtoFiltrado.map((produto) => (
                  <tr key={produto._id}>
                    <td className='p-5 w-1/5  text-center'>
                      {produto.produto}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      R$ {produto.valorCusto}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      R$ {produto.valorVenda}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      {produto.criadoEm}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      <button
                        className='mr-5'
                        onClick={() => Editar(produto._id)}
                      >
                        <BiEditAlt className='fill-slate-800' size={25} />
                      </button>
                      <button onClick={() => ModalExcluir(produto._id)}>
                        <RiDeleteBin2Line className='fill-red-900' size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              : produtos.map((produto) => (
                  <tr key={produto._id}>
                    <td className='p-5 w-1/5  text-center'>
                      {produto.produto}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      R$ {produto.valorCusto}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      R$ {produto.valorVenda}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      {produto.criadoEm}
                    </td>
                    <td className='p-5 w-1/5  text-center'>
                      <button
                        className='mr-5'
                        onClick={() => Editar(produto._id)}
                      >
                        <BiEditAlt className='fill-slate-800' size={25} />
                      </button>
                      <button onClick={() => ModalExcluir(produto._id)}>
                        <RiDeleteBin2Line className='fill-red-900' size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {abrirExcluir && (
        <div className=' fixed z-50 w-full min-h-screen flex justify-center items-center inset-0'>
          <div className='w-2/6 h-52 rounded-md bg-white flex flex-col justify-around items-center shadow-xl  '>
            <h1 className='font-bold text-xl'>Deseja excluir este produto?</h1>
            <div className='w-full flex flex-row justify-around items-center'>
              <button
                className=' font-bold border-2 px-4 py-1 rounded-md bg-slate-400'
                onClick={() => Excluir()}
              >
                Excluir
              </button>
              <button
                className='font-bold border-2 px-4 py-1 rounded-md bg-gray-200'
                onClick={() => setAbrirExcluir(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
        <>
          <NovoProduto display={abrirModal}/>{" "}
          <button
            onClick={() => setAbrirModal('hidden')}
            className={`${abrirModal} fixed z-50 top-10 right-10`}
          >
            <AiOutlineClose size={40} />
          </button>
        </>
      

    
        <>
          <EditarProduto id={idProduto} display={abrirEditar} />{" "}
          <button
            onClick={() => setAbrirEditar('hidden')}
            className={`${abrirEditar} fixed z-50 top-10 right-10`}
          >
            <AiOutlineClose size={40} />
          </button>
        </>
     
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const produtos = await Produto.find().sort({ createdAt: -1 }).lean();
  console.log(produtos);
  return {
    props: {
      produtos: produtos.map(db.convertDocToObj),
    },
  };
}
