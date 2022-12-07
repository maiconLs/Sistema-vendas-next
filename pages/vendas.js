import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import db from "../utils/db";
import Venda from "../Models/Venda";

import Nav from "../components/nav";
import Header from "../components/header";
import NovaVenda from "../components/novaVenda";
import ExcluirItem from "../components/excluirItem";
import TabelaVendas from "../components/tabelaVendas";

export default function Vendas({ vendas }) {
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
    const buscando = vendas?.filter((produto) =>
      produto.produto.toLowerCase().includes(busca.toLowerCase())
    );
    setProdutoFiltrado(buscando);
  }, [busca, vendas, abrirExcluir]);

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
        <title>Vendas</title>
        <meta name='description' content='My app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <Header
        title='Vendas'
        abrir={() => setAbrirModal(true)}
        nomeBotao='Nova Venda'
        busca={setBusca}
      />

      <div className='pl-48 mt-5 max-[600px]:pl-0'>
        {vendas.length !== 0 ? (
          largura > 600 ? (
            <table className='w-full '>
              <thead className='bg-slate-100'>
                <tr className='border-b-2 border-slate-200'>
                  <th className='p-5 w-1/6  text-center'>Produto</th>
                  <th className='p-5 w-1/6  text-center'>Valor de Custo</th>
                  <th className='p-5 w-1/6  text-center'>Valor de Venda</th>
                  <th className='p-5 w-1/6  text-center'>Última venda</th>
                  <th className='p-5 w-1/6  text-center'>
                    Quantidade de vendas
                  </th>
                  <th className='p-5 w-1/6  text-center'>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {produtoFiltrado
                  ? produtoFiltrado.map((produto) => (
                      <TabelaVendas
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        classetd='p-5 w-1/6  text-center'
                        classetr='border-b-2 border-slate-200'
                      />
                    ))
                  : vendas.map((produto) => (
                      <TabelaVendas
                        key={produto._id}
                        produto={produto}
                        excluir={() => ModalExcluir(produto._id)}
                        classetd='p-5 w-1/6  text-center'
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
                          <th className='p-5  text-start'>
                            Última venda
                          </th>
                          <th className='p-5  text-start'>
                            Quantidade de vendas
                          </th>
                          <th className='p-5  text-start'>Excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TabelaVendas
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
                : vendas.map((produto) => (
                    <table className='flex flex-row'>
                      <thead className='bg-slate-100'>
                        <tr className=' border-slate-200'>
                          <th className='p-5  text-start'>Produto</th>
                          <th className='p-5  text-start'>Valor de Custo</th>
                          <th className='p-5  text-start'>Valor de Venda</th>
                          <th className='p-5 text-start'>
                            Última venda
                          </th>
                          <th className='p-5 text-start'>
                            Quantidade de vendas
                          </th>
                          <th className='p-5  text-start'>Excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TabelaVendas
                          key={produto._id}
                          produto={produto}
                          excluir={() => ModalExcluir(produto._id)}
                          classetd='p-5 text-start'
                          classetr='border-b-2 border-slate-200 flex flex-col mb-5'
                        />
                      </tbody>
                    </table>
                  ))}
            </div>
          )
        ) : (
          <h1 className='font-bold p-5 text-xl'>Não há vendas realizadas!</h1>
        )}
      </div>
      {abrirExcluir && (
        <ExcluirItem
          rota={`api/vendas/excluirVenda/${idProduto}`}
          atualizar={"/vendas"}
          fechar={() => setAbrirExcluir(false)}
        />
      )}
      {abrirModal && (
        <>
          <NovaVenda click={() => setAbrirModal(false)} />
        </>
      )}
    </div>
  );
}

Vendas.auth = true;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const { user } = session;
  await db.connect();
  const vendas = await Venda.find({ usuario: user.email })
    .sort({ updatedAt: -1 })
    .lean();
  return {
    props: {
      vendas: vendas.map(db.convertDocToObj),
    },
  };
}
