import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbVenda = conexao.define(
  'Venda',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'produtos',
        key: 'id',
      },
    },
    clienteId: DataTypes.INTEGER,
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false },
    datavenda: { type: DataTypes.DATEONLY },
  },
  {
    timestamps: false,
  }
);

tbVenda.sync();
export default tbVenda;
