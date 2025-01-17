import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbFornecedor = conexao.define(
  'Fornecedor',
  {
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    freezeTableName: true, 
  }
);

tbFornecedor.sync();
export default tbFornecedor;
