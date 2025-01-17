import { DataTypes } from 'sequelize';
import conexao from '../database/dbConfig.mjs';

const tbRelatorio = conexao.define('Relatorio', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mes: { type: DataTypes.INTEGER, allowNull: false },
    ano: { type: DataTypes.INTEGER, allowNull: false },
    lucroBruto: { type: DataTypes.FLOAT, defaultValue: 0 },
    folhaPagamento: { type: DataTypes.FLOAT, defaultValue: 0 },
    custoMateriaPrima: { type: DataTypes.FLOAT, defaultValue: 0 },
    custoManutencao: { type: DataTypes.FLOAT, defaultValue: 0 },
    lucroLiquido: { type: DataTypes.FLOAT, defaultValue: 0 },
});

tbRelatorio.sync();
export  default tbRelatorio;

