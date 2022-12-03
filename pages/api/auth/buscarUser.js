import User from "../../../Models/User";
import db from "../../../utils/db";

export default async function buscarUser(req, res) {
  const { email } = req.body;

  await db.connect();
  const userExiste = await User.findOne({ email: email });

  await db.disconnect();

  res.status(200).json({
    userExiste: userExiste,
  });
}
