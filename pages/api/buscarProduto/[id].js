
import Produto from '../../../models/Produto'
import db from '../../../utils/db'

const handler = async (req, res) => {
  await db.connect()
  const produto = await Produto.findById(req.query.id)
  await db.disconnect()
  res.status(200).json({
    produto: produto
  })
}

export default handler