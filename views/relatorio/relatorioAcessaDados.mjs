import urlBase from '../contantes/url.mjs';

export async function getLista() {
  const resultado = await fetch(urlBase + '/relatorio/listar');
  const relatorioFuncionarios = await resultado.json();
  return relatorioFuncionarios;
}