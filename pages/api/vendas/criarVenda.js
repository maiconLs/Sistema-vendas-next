import Venda from "../../../Models/Venda";
import db from "../../../utils/db";

export default async function criarVenda(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { produto, descricao, valorCusto, valorVenda, criadoEm } = req.body;


  await db.connect();
  const produtoExiste = await Venda.findOne({ produto: produto });

  if (produtoExiste) {
    await db.connect();

    const produtoExistente = {}

    produtoExistente.produto = produto
    produtoExistente.descricao = descricao
    produtoExistente.valorCusto = valorCusto
    produtoExistente.valorVenda = valorVenda
    produtoExistente.quantidade = + 1

    await Venda.findByIdAndUpdate(_id, editar);

    await db.disconnect();
    res.send({
     message: 'Venda realizada!'
    });

    return
  }

  const novaVenda = new Venda({
    produto,
    descricao,
    valorCusto,
    valorVenda,
    criadoEm,
    quantidade: 1,
  });

  await novaVenda.save();
  await db.disconnect();
  res.status(201).json({
    produto,
    descricao,
    valorCusto,
    valorVenda,
    criadoEm,
    quantidade
  });
}
