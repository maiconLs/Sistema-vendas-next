import Venda from "../../../Models/Venda";
import db from "../../../utils/db";

export default async function criarVenda(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { _id, produto, descricao, valorCusto, valorVenda, criadoEm, usuario } = req.body;


  await db.connect();
  const produtoExiste = await Venda.findOne({ usuario: usuario, produto: produto });

  if (produtoExiste) {
    await db.connect();

    const produtoExistente = {}

    produtoExistente.produto = produto
    produtoExistente.descricao = descricao
    produtoExistente.valorCusto = valorCusto
    produtoExistente.valorVenda = valorVenda
    produtoExistente.criadoEm = criadoEm
    produtoExistente.usuario = usuario
    produtoExistente.quantidade = produtoExiste.quantidade += 1

    await Venda.findOneAndUpdate({produto: produto}, produtoExistente);


    await db.disconnect();
    res.send({
     message: 'Venda realizada com sucesso!',
     produto: produtoExistente
    });

    return
  }

  const novaVenda = new Venda({
    produto,
    descricao,
    valorCusto,
    valorVenda,
    criadoEm,
    usuario,
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
    usuario,
    quantidade: 1
  });
}
