import urlBase from '../contantes/url.mjs';

async function getLista() {
  const resultado = await fetch(urlBase + '/produto/listar');
  const produtos = await resultado.json();
  return produtos;
}

async function getUm(id) {
  const resultado = await fetch(urlBase + '/produto/listar/' + id);

  const produto = await resultado.json();

  return produto;
}

async function novo(obj) {
  const opcoes = {
    method: 'post',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(obj),
  };

  const resultado = await fetch(urlBase + '/produto/cadastrar', opcoes);

  const cadastrado = await resultado.json();

  return cadastrado;
}

async function altera(obj) {
  const opcoes = {
    method: 'put',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(obj),
  };

  const resultado = await fetch(urlBase + '/produto/editar', opcoes);

  const editado = await resultado.json();

  return editado;
}

async function exclui(id) {
  const opcoes = {
    method: 'delete',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ id: id }),
  };

  const resultado = await fetch(urlBase + '/produto/deletar', opcoes);

  const deletado = await resultado.json();

  return deletado;
}

export { getLista, getUm, novo, altera, exclui };