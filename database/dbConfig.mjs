import { Sequelize } from 'sequelize';

const conexao = new Sequelize({
  database: 'pizzaria',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
});

export default conexao;
