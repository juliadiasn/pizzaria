import {
  getLista,
  getUm,
  novo,
  altera,
  exclui,
  getUmProduto,
} from './vendaAcessaDados.mjs';

async function obterPrecoUnitario(produtoId) {
  try {
    if (!produtoId) {
      throw new Error('ID do produto não fornecido.');
    }

    const produto = await getUmProduto(produtoId);

    if (!produto || typeof produto.precovenda === 'undefined') {
      throw new Error('Produto não encontrado ou preço inválido.');
    }

    const precovenda = Number(produto.precovenda);
    if (isNaN(precovenda)) {
      throw new Error('O preço do produto não é numérico.');
    }

    console.log('Preço unitário obtido:', precovenda); // Log para depuração
    return precovenda;
  } catch (error) {
    console.error('Erro ao obter o preço do produto:', error);
    alert('Erro ao buscar o preço do produto. Verifique o ID informado.');
    return 0; // Retorna 0 para evitar outros erros
  }
}

async function calcularTotal() {
  const produtoId = document.getElementById('produtoId').value;
  const quantidade = document.getElementById('quantidade').value;
  const totalInput = document.getElementById('total');
  const precoUnitarioInput = document.getElementById('precoUnitario');

  if (produtoId && quantidade) {
    try {
      const precoUnitario = await obterPrecoUnitario(produtoId);

      if (!precoUnitario || isNaN(precoUnitario)) {
        throw new Error('Preço unitário não é válido.');
      }

      precoUnitarioInput.value = precoUnitario.toFixed(2);
      totalInput.value = (quantidade * precoUnitario).toFixed(2);
      console.log('Total calculado:', totalInput.value); // Log para depuração
    } catch (error) {
      console.error('Erro ao calcular o total:', error);
      precoUnitarioInput.value = '';
      totalInput.value = '';
    }
  } else {
    precoUnitarioInput.value = '';
    totalInput.value = '';
  }
}

function preencherDataAutomatica() {
  const dataAtual = new Date().toISOString().split('T')[0]; // Formata a data como YYYY-MM-DD
  document.getElementById('dataVenda').value = dataAtual; // Define o valor no campo data
}

async function salvar() {
  const iptProdutoId = document.getElementById('produtoId');
  const iptClienteId = document.getElementById('clienteId');  
  const iptQuantidade = document.getElementById('quantidade');
  const iptTotal = document.getElementById('total');
  const iptDataVenda = document.getElementById('dataVenda');

  if (!iptProdutoId.value || !iptQuantidade.value || !iptTotal.value || !iptDataVenda.value) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const obj = {
    produtoId: iptProdutoId.value,
    clienteId: iptClienteId.value,
    quantidade: iptQuantidade.value,
    total: parseFloat(iptTotal.value).toFixed(2),
    datavenda: iptDataVenda.value,
  };

  try {
    await novo(obj);
    document.forms[0].reset();
    preencherDataAutomatica(); // Recarrega a data automaticamente após salvar
    desenhaTabela();
  } catch (error) {
    console.error('Erro ao salvar venda:', error);
    alert('Erro ao salvar a venda. Tente novamente.');
  }
}

async function editar() {
  const iptId = document.getElementById('id');
  const iptProdutoId = document.getElementById('produtoId');
  const iptClienteId = document.getElementById('clienteId');
  const iptQuantidade = document.getElementById('quantidade');
  const iptTotal = document.getElementById('total');
  const iptDataVenda = document.getElementById('dataVenda');

  if (!iptProdutoId.value || !iptQuantidade.value || !iptTotal.value) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const obj = {
    id: iptId.value,
    produtoId: iptProdutoId.value,
    clienteId: iptClienteId.value,
    quantidade: iptQuantidade.value,
    total: parseFloat(iptTotal.value).toFixed(2),
    datavenda: iptDataVenda.value,
  };

  try {
    await altera(obj);
    desenhaTabela();
  } catch (error) {
    console.error('Erro ao editar venda:', error);
    alert('Erro ao editar a venda. Tente novamente.');
  }
}

function decideSalvarEditar(event) {
  event.preventDefault();

  if (document.getElementById('id').value) {
    editar();
  } else {
    salvar();
  }

  document.forms[0].reset();
  preencherDataAutomatica();
  document.getElementById('id').value = '';
}

async function excluir(event) {
  const indice = event.target.getAttribute('data-id');

  try {
    await exclui(indice);
    desenhaTabela();
  } catch (error) {
    console.error('Erro ao excluir venda:', error);
    alert('Erro ao excluir a venda. Tente novamente.');
  }
}

async function preencheDadosParaEdicao(event) {
  const id = event.target.getAttribute('data-id');

  try {
    const venda = await getUm(id);

    document.getElementById('id').value = venda.id;
    document.getElementById('produtoId').value = venda.produtoId;
    document.getElementById('clienteId').value = venda.clienteId;
    document.getElementById('quantidade').value = venda.quantidade;
    document.getElementById('total').value = venda.total;
    document.getElementById('dataVenda').value = venda.datavenda;

    const precoUnitario = await obterPrecoUnitario(venda.produtoId);
    document.getElementById('precoUnitario').value = precoUnitario.toFixed(2);
  } catch (error) {
    console.error('Erro ao preencher dados para edição:', error);
    alert('Erro ao carregar os dados da venda. Tente novamente.');
  }
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

async function desenhaTabela() {
  const td_tbody = document.getElementById('tbVendas');

  td_tbody.innerHTML = '';

  try {
    const dados = await getLista();

    for (let i = 0; i < dados.length; i++) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');
      const td5 = document.createElement('td');
      const td6 = document.createElement('td');
      const td7 = document.createElement('td');
      const btEd = document.createElement('button');
      const btEx = document.createElement('button');

      btEd.innerText = 'Editar';

      btEd.setAttribute('data-id', dados[i].id);

      btEd.addEventListener('click', preencheDadosParaEdicao);

      btEx.innerText = 'Excluir';

      btEx.setAttribute('data-id', dados[i].id);

      btEx.addEventListener('click', excluir);

      td1.innerText = dados[i].id;
      td2.innerText = dados[i].produtoId;
      td3.innerText = dados[i].clienteId;
      td4.innerText = dados[i].quantidade;
      td5.innerText = dados[i].total;
      td6.innerText = formatarData(dados[i].datavenda); // Formata a data

      td7.append(btEd, btEx);

      tr.append(td1, td2, td3, td4, td5, td6, td7);

      td_tbody.append(tr);
    }
  } catch (error) {
    console.error('Erro ao carregar a tabela:', error);
    alert('Erro ao carregar os dados das vendas. Tente novamente.');
  }
}

// Eventos

const btSalvar = document.getElementById('btSalvar');

btSalvar.addEventListener('click', decideSalvarEditar);

document.getElementById('produtoId').addEventListener('change', calcularTotal);
document.getElementById('quantidade').addEventListener('input', calcularTotal);

window.addEventListener('load', () => {
  preencherDataAutomatica();
  desenhaTabela();
});
