import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className='fixed overflow-auto z-30 w-48 h-screen bg-slate-500 '>
      <ul className='w-full'>
        <Link href='/'>
          {" "}
          <li className='p-6 text-slate-800 font-bold text-2xl'> Minha Loja</li>
        </Link>
        <hr />

        <Link href='/'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Inicio</li>
        </Link>
        <Link href='/produtos'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Produtos</li>
        </Link>
        <Link href='/vendas'>
          {" "}
          <li className='p-6 text-white font-bold text-xl'>Vendas</li>
        </Link>
     
      </ul>
    </div>
  );
}
