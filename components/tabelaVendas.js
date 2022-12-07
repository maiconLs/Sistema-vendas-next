import React from "react";

import { RiDeleteBin2Line } from "react-icons/ri";

export default function TabelaVendas({produto, excluir, classetd, classetr}) {
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
      <td className={classetd}>R$ {produto.criadoEm}</td>
      <td className={classetd}>{produto.quantidade}</td>
      <td className={classetd}>
        <button onClick={() => excluir()}>
          <RiDeleteBin2Line className='fill-red-900' size={25} />
        </button>
      </td>
    </tr>
  );
}
