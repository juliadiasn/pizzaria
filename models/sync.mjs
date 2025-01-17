import conexao from '../database/dbConfig.mjs';
import tbFornecedor from './fornecedorModel.mjs';
import tbProduto from './produtoModel.mjs';


tbFornecedor.hasOne(tbProduto);
tbProduto.belongsTo(tbFornecedor, { foreignKey: 'fornecedorId' });

try {
    await conexao.sync();
    console.log("Database synchronized successfully!");
} catch (error) {
    console.error("Error synchronizing the database:", error);
}

export default conexao;
