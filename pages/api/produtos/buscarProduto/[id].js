
import Produto from '../../../../Models/Produto'
import db from '../../../../utils/db'

const handler = async (req, res) => {
  await db.connect()
  const produto = await Produto.findById(req.query.id)

  if(!produto) {
    res.status(404).json({message: 'Produto não encontrado!'})
  }
  await db.disconnect()
  res.status(200).json({
    produto: produto
  })
}

export default handler