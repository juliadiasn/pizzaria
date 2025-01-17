import {
  getLista,
  getUm,
  novo,
  altera,
  exclui,
} from './produtoAcessaDados.mjs';

async function salvar() {
  const iptNome = document.getElementById('nome');
  const iptDescricao = document.getElementById('descricao');
  const iptPreco = document.getElementById('preco');
  const iptQuantidade = document.getElementById('quantidade');
  const iptFornecedorId = document.getElementById('fornecedorId');

  const obj = {
    nome: iptNome.value,
    descricao: iptDescricao.value,
    precovenda: iptPreco.value,
    quantidade: iptQuantidade.value,
    fornecedorId: iptFornecedorId.value,
  };

  await novo(obj);

  document.forms[0].reset();

  desenhaTabela();
}

async function editar() {
  const iptId = document.getElementById('id')
  const iptNome = document.getElementById('nome');
  const iptDescricao = document.getElementById('descricao');
  const iptPreco = document.getElementById('preco');
  const iptQuantidade = document.getElementById('quantidade');
  const iptFornecedorId = document.getElementById('fornecedorId');

  const obj = {
    id: iptId.value,
    nome: iptNome.value,
    descricao: iptDescricao.value,
    precovenda: iptPreco.value,
    quantidade: iptQuantidade.value,
    fornecedorId: iptFornecedorId.value,
  };

  await altera(obj);
  desenhaTabela();
}

function decideSalvarEditar(event) {
  event.preventDefault();

  if (document.getElementById('id').value) {
    editar();
  } else {
    salvar();
  }

  document.forms[0].reset();
  document.getElementById('id').value = '';
}

async function excluir(event) {
  const indice = event.target.getAttribute('data-id');

  await exclui(indice);

  desenhaTabela();
}

async function preencheDadosParaEdicao(event) {
  const id = event.target.getAttribute('data-id');

  const produto = await getUm(id);

  document.getElementById('id').value = produto.id;
  document.getElementById('nome').value = produto.nome;
  document.getElementById('descricao').value = produto.descricao;
  document.getElementById('preco').value = produto.precovenda;
  document.getElementById('quantidade').value = produto.quantidade;
  document.getElementById('fornecedorId').value = produto.fornecedorId;
}

async function desenhaTabela() {
  const td_tbody = document.getElementById('tbProdutos');

  td_tbody.innerHTML = '';

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
    td2.innerText = dados[i].nome;
    td3.innerText = dados[i].descricao;
    td4.innerText = dados[i].precovenda;
    td5.innerText = dados[i].quantidade;
    td6.innerText = dados[i].Fornecedor ? dados[i].Fornecedor.nome : 'Fornecedor não encontrado'; // Exibe o nome do fornecedor

    td7.append(btEd, btEx);

    tr.append(td1, td2, td3, td4, td5, td6, td7);

    td_tbody.append(tr);
  }
}

// Eventos

const btSalvar = document.getElementById('btSalvar');

btSalvar.addEventListener('click', decideSalvarEditar);

window.addEventListener('load', desenhaTabela);