import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Nav from "../components/nav";
import Header from "../components/header";
import db from "../utils/db";
import Produto from "../Models/Produto";
import NovoProduto from "../components/novoProduto";
import EditarProduto from "../components/editarProduto";
import ExcluirItem from "../components/excluirItem";
import TabelaProdutos from "../components/tabelaProdutos";

import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

export default function Produtos({ produtos }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirEditar, setAbrirEditar] = useState(false);
  const [abrirExcluir, setAbrirExcluir] = useState(false);
  const [idProduto, setIdProduto] = useState("");
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState();
  const [largura, setLargura] = useState();

  const router = useRouter();

  useEffect(() => {
    setLargura(window.screen.width);
    const buscando = produtos.filter((produto) =>
      produto.produto.toLowerCase().includes(busca.toLowerCase())
    );
    setProdutoFiltrado(buscando);
  }, [busca, produtos, abrirExcluir, largura]);

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
      <Head>
        <title>Produtos</title>
        <meta name='description' content='My app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <Header
        title='Produtos'
        abrir={() => setAbrirModal(true)}
        nomeBotao='Novo Produto'
        busca={setBusca}
      />

      <div className='pl-48 mt-5 max-[600px]:pl-0 '>
        {produtos.length !== 0 ? (
          largura > 600 ? (
            <table className='w-full '>
              <thead className='bg-slate-100'>
                <tr className='border-b-2 border-slate-200'>
                  <th className='p-5 w-1/5  text-center'>Produto</th>
                  <th className='p-5 w-1/5  text-center'>Valor de Custo</th>
                  <th className='p-5 w-1/5  text-center'>Valor de Venda</th>
                  <th className='p-5 w-1/5  text-center'>Criado em</th>
                  <th className='p-5 w-1/5  text-center'>Editar/Excluir</th>
                </tr>
              </thead>
              <tbody>
                {produtoFiltrado
                  ? produtoFiltrado.map((produto) => (
                      <TabelaProdutos
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        editar={() => Editar(produto._id)}
                        classetd='p-5 w-1/5  text-center'
                        classetr='border-b-2 border-slate-200'
                      />
                    ))
                  : produtos.map((produto) => (
                      <TabelaProdutos
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        editar={() => Editar(produto._id)}
                        classetd='p-5 w-1/5  text-center'
                        classetr='border-b-2 border-slate-200'
                      />
                    ))}
              </tbody>
            </table>
          ) : (
            <div className='w-full  '>
              {produtoFiltrado
                ? produtoFiltrado.map((produto) => (
                    <table className='flex flex row mb-5'>
                      <thead className='bg-slate-100 '>
                        <tr className=' border-slate-200 flex flex-col  '>
                          <th className='p-5  text-start'>Produto</th>
                          <th className='p-5  text-start'>Valor de Custo</th>
                          <th className='p-5  text-start'>Valor de Venda</th>
                          <th className='p-5  text-start'>Criado em</th>
                          <th className='p-5  text-start'>Editar/excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                      <TabelaProdutos
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        editar={() => Editar(produto._id)}
                        classetd='p-5 text-start'
                        classetr=' border-slate-200 flex flex-col mb-5'
                      />
                      </tbody>
                    </table>
                  ))
                : produtos.map((produto) => (
                    <table className='flex flex-row'>
                      <thead className='bg-slate-100'>
                        <tr className=' border-slate-200'>
                          <th className='p-5  text-start'>Produto</th>
                          <th className='p-5  text-start'>Valor de Custo</th>
                          <th className='p-5  text-start'>Valor de Venda</th>
                          <th className='p-5  text-start'>Criado em</th>
                          <th className='p-5  text-start'>Editar/excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                      <TabelaProdutos
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        editar={() => Editar(produto._id)}
                        classetd='p-5 text-start'
                        classetr='border-b-2 border-slate-200 flex flex-col mb-5'

                      />
                      </tbody>
                    </table>
                  ))}
            </div>
          )
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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const { user } = session;
  await db.connect();
  const produtos = await Produto.find({ usuario: user.email })
    .sort({ createdAt: -1 })
    .lean();
  return {
    props: {
      produtos: produtos.map(db.convertDocToObj),
    },
  };
}
