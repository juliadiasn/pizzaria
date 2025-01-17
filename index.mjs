import express from 'express';
import rotasFuncionario from './routers/funcionarioRouter.mjs';
import rotasRelatorio from './routers/relatorioRouter.mjs';
import rotasCliente from './routers/clienteRouter.mjs';
import rotasFornecedor from './routers/fornecedorRouter.mjs';
import rotasProduto from './routers/produtoRouter.mjs';
import rotasVenda from './routers/vendaRouter.mjs';
import conexao from './models/sync.mjs';

const app = express();
app.use(express.json());
app.use('/funcionario', rotasFuncionario);
app.use('/relatorio', rotasRelatorio);
app.use('/fornecedor', rotasFornecedor);
app.use('/produto', rotasProduto);
app.use('/cliente', rotasCliente);
app.use('/venda', rotasVenda)
app.use(express.static('./views'));

app.listen(3000, function () {
  console.log('Escutando na porta 3000.');
});
