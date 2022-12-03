import Head from "next/head";
import Nav from "../components/nav";
import Header from "../components/header";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import db from "../utils/db";

import Venda from "../Models/Venda";
import Produto from "../Models/Produto";

export default function Home({ produtos, vendas }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const data = new Date();

  const criadoEm = `${data.getDate()}/${
    data.getMonth() + 1
  }/${data.getFullYear()}`;

  const totalValorVenda = vendas.reduce(
    (accumulator, value) => accumulator + value.valorVenda * value.quantidade,
    0
  );
  const totalLucro = vendas.reduce(
    (accumulator, value) =>
      accumulator + (value.valorVenda - value.valorCusto) * value.quantidade,
    0
  );
  const totalQuantidadeVenda = vendas.reduce(
    (accumulator, value) => accumulator + value.quantidade,
    0
  );

  const quantidadeProdutos = produtos.length;

  const vendaHoje = vendas.filter((venda) => venda.criadoEm == criadoEm);

  const maisVendidos = vendas.sort((a, b) => b.quantidade - a.quantidade);

  return (
    <div>
      <Head>
        <title>Início</title>
        <meta name='description' content='My app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <header className='bg-slate-200 w-full h-20 pl-56 p-7 flex flex-row justify-start items-center max-[600px]:hidden'>
        <h1 className='text-2xl font-bold text-slate-800'>Início</h1>
      </header>
      <main className='pl-48  flex flex-row mt-5  h-[85vh] max-[600px]:flex-col max-[600px]:pl-0 max-[600px]:mt-36'>
        <section className='flex flex-col justify-start items-center h-full  w-1/2 border-r-2 border-slate-200 max-[600px]:w-screen  '>
          <h1 className='font-bold text-2xl text-slate-700 w-full text-center bg-slate-100 p-3'>
            Vendas
          </h1>
          <div className='w-full p-5'>
            <p className='p-5 text-xl text-slate-700 border-b-2'>
              <b>Valor total:</b>{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalValorVenda)}
            </p>
            <p className='p-5 text-xl text-slate-700 border-b-2'>
              <b>Lucro total:</b>{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalLucro)}
            </p>
            <p className='p-5 text-xl text-slate-700 border-b-2'>
              <b>Quantidade de vendas:</b> {totalQuantidadeVenda}
            </p>
          </div>
        </section>
        <section className='flex flex-col justify-start items-center h-full  w-1/2 max-[600px]:w-screen'>
          <h1 className='font-bold text-2xl text-slate-700 w-full text-center bg-slate-100 p-3'>
            Produtos
          </h1>
          <div className='w-full p-5'>
            <p className='p-5 text-xl text-slate-700 border-b-2'>
              <b>Quantidade de produtos:</b> {quantidadeProdutos}
            </p>
            <h2 className='p-5 text-xl text-slate-700 '>
              <b>Produtos mais vendidos:</b>
            </h2>
            <table>
              <thead>
                <tr>
                  <th className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                    Produto
                  </th>
                  <th className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                    QTD
                  </th>
                  <th className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {maisVendidos.slice(0, 5).map((maisVendido) => (
                  <tr key={maisVendido._id}>
                    <td className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                      {maisVendido.produto}
                    </td>
                    <td className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                      {maisVendido.quantidade}
                    </td>
                    <td className='p-5 w-1/3 border text-lg text-slate-600  text-center'>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        maisVendido.valorVenda * maisVendido.quantidade
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

Home.auth = true;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const { user } = session;
  await db.connect();
  const produtos = await Produto.find({ user: user.email })
    .sort({ createdAt: -1 })
    .lean();
  const vendas = await Venda.find({ user: user.email })
    .sort({ updatedAt: -1 })
    .lean();
  console.log(produtos);
  return {
    props: {
      produtos: produtos.map(db.convertDocToObj),
      vendas: vendas.map(db.convertDocToObj),
    },
  };
}
