import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { nome, email } = req.body;
  if (!nome || !email) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const newUser = new User({
    nome,
    email,
  });

  const usuario = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created user!",
    _id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
  });
}

export default handler;
