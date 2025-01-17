import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbFuncionario = conexao.define('Funcionario', {
  nome: DataTypes.STRING,
  cpf: DataTypes.STRING,
  cargo: DataTypes.STRING,
  telefone: DataTypes.STRING,
  salario: DataTypes.DECIMAL,
});

tbFuncionario.sync();
export  default tbFuncionario ;
