import Produto from "../../Models/Produto";
import db from "../../utils/db";

export default async function criarProduto(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { produto, descricao, valorCusto, valorVenda, criadoEm } = req.body;

  if (!produto || !descricao || !valorCusto || !valorVenda) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }
  await db.connect();
  const produtoExiste = await Produto.findOne({ produto: produto });

  if (produtoExiste) {
    res.status(422).json({ message: "Esse produto já existe" });
    return;
  }

  const novoProduto = new Produto({
    produto,
    descricao,
    valorCusto,
    valorVenda,
    criadoEm,
  });

  await novoProduto.save();
  await db.disconnect();
  res.status(201).json({
    produto,
    descricao,
    valorCusto,
    valorVenda,
    criadoEm,
  });
}
