
import { getSession } from 'next-auth/react'
import Produto from '../../../Models/Produto'
import db from '../../../utils/db'

const handler = async (req, res) => {
  const session = await getSession({ req })
  const {user} = session
  await db.connect()
  const produto = await Produto.find({usuario: user.email})

  if(!produto) {
    res.status(404).json({message: 'Produto não encontrado!'})
  }
  await db.disconnect()
  res.status(200).json({
    produto: produto
  })
}

export default handler