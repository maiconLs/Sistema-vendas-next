import Venda from "../../../Models/Venda";
import db from "../../../utils/db";

export default async function EditarVenda(req, res) {
  if (req.method !== "PUT") {
    return;
  }

  const { _id, produto, descricao, valorCusto, valorVenda } = req.body;

  await db.connect();
  const editar = {}

  editar.produto = produto
  editar.descricao = descricao
  editar.valorCusto = valorCusto
  editar.valorVenda = valorVenda


await Venda.findByIdAndUpdate(_id, editar);

  await db.disconnect();
  res.send({
   message: 'Venda editada!'
  });
}
