import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className='fixed overflow-auto z-40 w-48 min-h-screen bg-slate-500 '>
      <ul className='w-full'>
        <Link href='/'>
          {" "}
          <li className='p-6 text-slate-800 font-bold text-2xl'> Minha Loja</li>
        </Link>
        <hr />

        <Link href='/'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Home</li>
        </Link>
        <Link href='/produtos'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Produtos</li>
        </Link>
        <Link href='/'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Vendas</li>
        </Link>
        <Link href='/'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Despesas</li>
        </Link>
      </ul>
    </div>
  );
}
