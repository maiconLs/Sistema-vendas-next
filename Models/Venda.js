import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema(
  {
    user: { type: String, ref: 'User', required: true },

    produto: { type: String, required: true },
    descricao: { type: String, required: true },
    valorCusto: { type: Number, required: true },
    valorVenda: { type: Number, required: true },
    criadoEm: { type: String  },
    quantidade: { type: Number  },

  },
  {
    timestamps: true,
  }
);

const Venda =
  mongoose.models.Venda || mongoose.model("Venda", VendaSchema);

export default Venda;
