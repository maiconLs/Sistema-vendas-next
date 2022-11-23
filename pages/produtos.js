import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState(false);

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
            {produtos.map((produto) => (
              <tr>
                <td className='p-5 w-1/5  text-center'>{produto.produto}</td>
                <td className='p-5 w-1/5  text-center'>
                  R$ {produto.valorCusto}
                </td>
                <td className='p-5 w-1/5  text-center'>
                  R$ {produto.valorVenda}
                </td>
                <td className='p-5 w-1/5  text-center'>{produto.criadoEm}</td>
                <td className='p-5 w-1/5  text-center'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {abrirModal && (
        <>
          <NovoProduto /> <button onClick={() => setAbrirModal(!abrirModal)} className='fixed z-50 top-10 right-10'>X</button>
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
