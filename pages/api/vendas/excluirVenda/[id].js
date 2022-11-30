import Venda from "../../../../Models/Venda";
import db from "../../../../utils/db";

export default async function excluirVenda(req, res) {
  const venda = Venda.findById(req.query.id);

  if (!venda) {
    res.status(404).json({ message: "Produto não encontrado!" });
    return;
  }

  await db.connect();

  await Venda.findByIdAndRemove(req.query.id);

  await db.disconnect();

  res.status(200).json({ message: `Venda removida!` });
}
