import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState();

  function buscarProduto() {
    const buscando = produtos.filter((produto) =>
      produto.produto.includes(busca)
    );
    setProdutoFiltrado(buscando);
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
            <button onClick={buscarProduto}>Buscar</button>
            <div>
              {
              busca &&
              produtos
                .filter((produto) => produto.produto.includes(busca))
                .map((produto) => (
                  <li>{produto.produto}</li>
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
                    <td className='p-5 w-1/5  text-center'></td>
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
                    <td className='p-5 w-1/5  text-center'></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
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
