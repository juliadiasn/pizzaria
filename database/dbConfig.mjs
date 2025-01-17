import { Sequelize } from 'sequelize';

const conexao = new Sequelize({
  database: 'pizzaria',
  username: 'root',
  password: '7EUQWzVuKvsXwW1KBjiZOfcRsYoevFoQ',
  dialect: 'postgres',
host: 'dpg-cu52o83tq21c73dvv0hg-a',
port: '5432',
});

export default conexao;
