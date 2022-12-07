import React from "react";

import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

export default function TabelaProdutos({produto, excluir, editar, classetd, classetr}) {
  return (
    <tr className={classetr} key={produto._id}>
      <td className={classetd}>{produto.produto}</td>
      <td className={classetd}>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(produto.valorCusto)}
      </td>
      <td className={classetd}>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(produto.valorVenda)}
      </td>
      <td className={classetd}>{produto.criadoEm}</td>
      <td className={classetd}>
        <button className='mr-5' onClick={() => editar()}>
          <BiEditAlt className='fill-slate-800' size={25} />
        </button>
        <button onClick={() => excluir()}>
          <RiDeleteBin2Line className='fill-red-900' size={25} />
        </button>
      </td>
    </tr>
  );
}
