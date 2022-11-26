import Produto from "../../Models/Produto";
import db from "../../utils/db";

export default async function EditarProduto(req, res) {
  if (req.method !== "PUT") {
    return;
  }

  const { _id, produto, descricao, valorCusto, valorVenda } = req.body;

  if (!produto || !descricao || !valorCusto || !valorVenda) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }
  await db.connect();
  const editar = {}

  editar.produto = produto
  editar.descricao = descricao
  editar.valorCusto = valorCusto
  editar.valorVenda = valorVenda


await Produto.findByIdAndUpdate(_id, editar);

  await db.disconnect();
  res.send({
   message: 'Produto editado!'
  });
}
