import Venda from "../../../../Models/Venda";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const venda = await Venda.findById(req.query.id);

  if (!venda) {
    res.status(404).json({ message: "Venda não encontrado!" });
  }
  await db.disconnect();
  res.status(200).json({
    venda: venda,
  });
};

export default handler;
