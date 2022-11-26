import Produto from "../../../Models/Produto";
import db from "../../../utils/db";

export default async function excluirProduto(req, res) {


  // const { _id } = req.body;

  const produto = Produto.findById(req.query.id);

  if (!produto) {
    res.status(404).json({ message: "Produto não encontrado!" });
    return;
  }

  await db.connect();

  await Produto.findByIdAndRemove(req.query.id);

  await db.disconnect();

  res.status(200).json({ message: `Produto  removido!` });
}
