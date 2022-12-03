import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

export default function Nav() {
  return (
    <div className='fixed top-0 overflow-auto z-30 w-48 h-screen bg-slate-500 max-[600px]:w-full max-[600px]:h-36 '>
      <ul className='w-full max-[600px]:flex max-[600px]:justify-between max-[600px]:flex-col'>
        <div>
          <Link href='/'>
            {" "}
            <li className='p-6 text-slate-800 font-bold text-2xl max-[600px]:text-xl'>
              Minha Loja
            </li>
          </Link>
        </div>
        <hr />
        <div className='max-[600px]:flex'>
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
          <li
            className='p-6 text-white font-bold text-xl cursor-pointer'
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }
          >
            Sair
          </li>
        </div>
      </ul>
    </div>
  );
}
