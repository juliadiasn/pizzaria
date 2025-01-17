import urlBase from '../contantes/url.mjs';

async function getLista() {
  const resultado = await fetch(urlBase + '/cliente/listar');
  const clientes = await resultado.json();
  return clientes;
}

async function getUm(id) {
  const resultado = await fetch(urlBase + '/cliente/listar/' + id);

  const cliente = await resultado.json();

  return cliente;
}

async function novo(obj) {
  const opcoes = {
    method: 'post',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(obj),
  };

  const resultado = await fetch(urlBase + '/cliente/cadastrar', opcoes);

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

  const resultado = await fetch(urlBase + '/cliente/editar', opcoes);

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

  const resultado = await fetch(urlBase + '/cliente/deletar', opcoes);

  const deletado = await resultado.json();

  return deletado;
}

export { getLista, getUm, novo, altera, exclui };