import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";

import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";
import EditarProduto from "../components/editarProduto";

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirEditar, setAbrirEditar] = useState(false);
  const [abrirExcluir, setAbrirExcluir] = useState(false);
  const [idProduto, setIdProduto] = useState("");
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState();

  function buscarProduto(e) {
    const buscando = produtos.filter((produto) => produto.produto.includes(e));
    setProdutoFiltrado(buscando);
  }

  function Editar(id) {
    setIdProduto(id);
    setAbrirEditar(true);
  }

  function ModalExcluir(id) {
    setIdProduto(id);
    setAbrirExcluir(true);
  }

  async function Excluir() {
    await axios
      .delete(`/api/excluirProduto/${idProduto}`)
      .then((response) => console.log(idProduto));
  }
  return (
    <div>
      <Nav />
      <Header
        title='Produtos'
        button={
          <button
            onClick={() => setAbrirModal(!abrirModal)}
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
            />
            <button onClick={() => buscarProduto(busca)}>Buscar</button>
            <div>
              {busca &&
                produtos
                  .filter((produto) => produto.produto.includes(busca))
                  .map((produto) => (
                    <li
                      key={produto._id}
                      onClick={(e) => buscarProduto(e.target.innerHTML)}
                    >
                      {produto.produto}
                    </li>
                  ))}
            </div>
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
                      <button onClick={() => Editar(produto._id)}>
                        Editar
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
                      <button onClick={() => Editar(produto._id)}>
                        Editar
                      </button>
                      <button onClick={() => ModalExcluir(produto._id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {abrirExcluir && (
        <div className='fixed z-50 w-full min-h-screen flex justify-center items-center inset-0'>
          <div className='w-1/4 h-44 rounded bg-white flex flex-col justify-around items-center shadow-xl  '>
            <h1>Deseja excluir este produto?</h1>
            <div className="w-full flex flex-row justify-around items-center">
              
              <button onClick={() => Excluir()}>Excluir</button>
              <button onClick={() => setAbrirExcluir(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {abrirModal && (
        <>
          <NovoProduto />{" "}
          <button
            onClick={() => setAbrirModal(!abrirModal)}
            className='fixed z-50 top-10 right-10'
          >
            X
          </button>
        </>
      )}

      {abrirEditar && (
        <>
          <EditarProduto id={idProduto} />{" "}
          <button
            onClick={() => setAbrirEditar(!abrirEditar)}
            className='fixed z-50 top-10 right-10'
          >
            fechar
          </button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const produtos = await Produto.find().lean();
  console.log(produtos);
  return {
    props: {
      produtos: produtos.map(db.convertDocToObj),
    },
  };
}
