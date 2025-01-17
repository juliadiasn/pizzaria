import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbProduto = conexao.define(
  'Produto',
  {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    precovenda: DataTypes.DECIMAL,
    quantidade: DataTypes.INTEGER,
    fornecedorId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

tbProduto.sync();
export default tbProduto;
