import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbCliente = conexao.define('Cliente', {
  nome: DataTypes.STRING,
  cpf: DataTypes.STRING,
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
});

tbCliente.sync();
export  default tbCliente ;
