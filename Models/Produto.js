import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    usuario: { type: String, ref: 'User', required: true },
    produto: { type: String, required: true },
    descricao: { type: String, required: true },
    valorCusto: { type: Number, required: true },
    valorVenda: { type: Number, required: true },
    criadoEm: { type: String  },
  },
  {
    timestamps: true,
  }
);

const Produto =
  mongoose.models.Produto || mongoose.model("Produto", ProdutoSchema);

export default Produto;
