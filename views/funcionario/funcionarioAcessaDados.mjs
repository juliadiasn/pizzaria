import urlBase from '../contantes/url.mjs';

async function getLista() {
  const resultado = await fetch(urlBase + '/funcionario/listar');
  const funcionarios = await resultado.json();
  return funcionarios;
}

async function getUm(id) {
  const resultado = await fetch(urlBase + '/funcionario/listar/' + id);

  const funcionario = await resultado.json();

  return funcionario;
}

async function novo(obj) {
  const opcoes = {
    method: 'post',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(obj),
  };

  const resultado = await fetch(urlBase + '/funcionario/cadastrar', opcoes);

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

  const resultado = await fetch(urlBase + '/funcionario/editar', opcoes);

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

  const resultado = await fetch(urlBase + '/funcionario/deletar', opcoes);

  const deletado = await resultado.json();

  return deletado;
}

export { getLista, getUm, novo, altera, exclui };