import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";
import EditarProduto from "../components/editarProduto";
import ExcluirItem from "../components/excluirItem";

import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirEditar, setAbrirEditar] = useState(false);
  const [abrirExcluir, setAbrirExcluir] = useState(false);
  const [idProduto, setIdProduto] = useState("");
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState();

  const router = useRouter();


  useEffect(() => {
    const buscando = produtos.filter((produto) =>
      produto.produto.toLowerCase().includes(busca.toLowerCase())
    );
    setProdutoFiltrado(buscando);
  }, [busca, produtos, abrirExcluir]);

  function Editar(id) {
    setIdProduto(id);
    setAbrirEditar(true);
  }

  function ModalExcluir(id) {
    setIdProduto(id);
    setAbrirExcluir(true);
  }

  return (
    <div>
      <Nav />
      <Header
        title='Produtos'
        abrir={() => setAbrirModal(true)}
        nomeBotao='Novo Produto'
        busca={setBusca}
      />

      <div className='pl-48 mt-5 max-[600px]:pl-0 '>
        {produtos.length !== 0 ? (
          <table className='w-full '>
            <thead className='bg-slate-100'>
              <tr className='border-b-2 border-slate-200'>
                <th className='p-5 w-1/5  text-center'>Produto</th>
                <th className='p-5 w-1/5  text-center'>Valor de Custo</th>
                <th className='p-5 w-1/5  text-center'>Valor de Venda</th>
                <th className='p-5 w-1/5  text-center'>Criado em</th>
                <th className='p-5 w-1/5  text-center'>#</th>
              </tr>
            </thead>
            <tbody>
              {produtoFiltrado
                ? produtoFiltrado.map((produto) => (
                    <tr
                      className='border-b-2 border-slate-200'
                      key={produto._id}
                    >
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
                          <RiDeleteBin2Line
                            className='fill-red-900'
                            size={25}
                          />
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
                          <RiDeleteBin2Line
                            className='fill-red-900'
                            size={25}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <h1 className='font-bold p-5 text-xl'>
            Não há produtos cadastrados!
          </h1>
        )}
      </div>
      {abrirExcluir && (
        <ExcluirItem
          rota={`api/produtos/excluirProduto/${idProduto}`}
          atualizar={"produtos"}
          fechar={() => setAbrirExcluir(false)}
        />
      )}
      {abrirModal && (
        <>
          <NovoProduto click={() => setAbrirModal(false)} />
        </>
      )}

      {abrirEditar && (
        <>
          <EditarProduto id={idProduto} click={() => setAbrirEditar(false)} />{" "}
        </>
      )}
    </div>
  );
}

Produtos.auth = true;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)  
  const { user } = session
  await db.connect();
  const produtos = await Produto.find({user: user.email})
    .sort({ createdAt: -1 })
    .lean();
  return {
    props: {
      produtos: produtos.map(db.convertDocToObj), 
    },
  };
}
