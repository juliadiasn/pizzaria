import tbFuncionario from '../models/funcionarioModel.mjs';
import tbVenda from '../models/vendaModel.mjs';

export async function todos(req, res) {
  const todos = await tbFuncionario.findAll();
  res.json(todos);
}

function calcularCusto(percentualMin, percentualMax, base) {
  const percentual = Math.random() * (percentualMax - percentualMin) + percentualMin;
  return base * percentual;
}

export async function listarRelatorios(req, res) {
  try {
    const funcionarios = await tbFuncionario.findAll();
    const vendas = await tbVenda.findAll();

    const folhaPagamento = funcionarios.reduce(
      (total, func) => total + Number(func.salario),
      0
    );
    

    const relatorio = [];

    for (let mes = 1; mes <= 12; mes++) {
      const vendasMes = vendas.filter(
        (venda) => new Date(venda.datavenda).getMonth() + 1 === mes
      );

      const lucroBruto = vendasMes.reduce(
        (total, venda) => total + venda.total,
        0
      );

      const custoMateriaPrima = calcularCusto(0.1, 0.2, lucroBruto);
      const custoManutencao = calcularCusto(0.2, 0.3, lucroBruto);

      const lucroLiquido =
        lucroBruto - custoMateriaPrima - custoManutencao - folhaPagamento;

      relatorio.push({
        mes,
        ano: 2025,
        lucroBruto,
        custoMateriaPrima,
        custoManutencao,
        folhaPagamento,
        lucroLiquido,
      });
    }

    res.json(relatorio);
  } catch (error) {
    console.error('Erro ao gerar o relatório:', error);
    res.status(500).json({ error: 'Erro ao gerar o relatório.' });
  }
}
