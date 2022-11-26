import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    produto: { type: String, required: true },
    descricao: { type: String, required: true },
    valorCusto: { type: String, required: true },
    valorVenda: { type: String, required: true },
    criadoEm: { type: String  },
  },
  {
    timestamps: true,
  }
);

const Produto =
  mongoose.models.Produto || mongoose.model("Produto", ProdutoSchema);

export default Produto;
