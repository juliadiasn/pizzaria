import { getLista } from "../relatorio/relatorioAcessaDados.mjs";

async function desenhaTabela() {
  const td_tbody = document.getElementById('tbFuncionarios');

  td_tbody.innerHTML = '';

  const dados = await getLista();

  for (let i = 0; i < dados.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    td1.innerText = dados[i].id;
    td2.innerText = dados[i].nome;
    td3.innerText = dados[i].cpf;

    const salario = !isNaN(parseFloat(dados[i].salario)) 
      ? parseFloat(dados[i].salario).toFixed(2)
      : 'N/A';
    td4.innerText = salario;

    tr.append(td1, td2, td3, td4);
    td_tbody.append(tr);
  }
}

async function desenhaGrafico(relatorio) {
  const ctx = document.getElementById('graficoRelatorio').getContext('2d');

  const labels = relatorio.map(mes => mes.mes);
  const lucroLiquido = relatorio.map(mes => parseFloat(mes.lucroLiquido) || 0);
  const lucroBruto = relatorio.map(mes => parseFloat(mes.lucroBruto) || 0);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Lucro Líquido',
          data: lucroLiquido,
          backgroundColor: 'rgb(75, 192, 75)',
          borderColor: 'rgb(75, 192, 75)',
          borderWidth: 1,
        },
        {
          label: 'Lucro Bruto',
          data: lucroBruto,
          backgroundColor: 'rgba(40, 197, 224, 0.6)',
          borderColor: 'rgba(57, 149, 192, 0.6)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Relatório de Lucros'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function carregarRelatorio() {
  try {
    const response = await fetch('/relatorio/');
    const relatorio = await response.json();

    console.log(relatorio);

    const tbody = document.querySelector('#relatorio tbody');
    tbody.innerHTML = '';

    relatorio.forEach((mes) => {
      const tr = document.createElement('tr');

      const lucroBruto = !isNaN(parseFloat(mes.lucroBruto)) ? parseFloat(mes.lucroBruto).toFixed(2) : 'N/A';
      const custoMateriaPrima = !isNaN(parseFloat(mes.custoMateriaPrima)) ? parseFloat(mes.custoMateriaPrima).toFixed(2) : 'N/A';
      const custoManutencao = !isNaN(parseFloat(mes.custoManutencao)) ? parseFloat(mes.custoManutencao).toFixed(2) : 'N/A';
      const folhaPagamento = !isNaN(parseFloat(mes.folhaPagamento)) ? parseFloat(mes.folhaPagamento).toFixed(2) : 'N/A';
      const lucroLiquido = !isNaN(parseFloat(mes.lucroLiquido)) ? parseFloat(mes.lucroLiquido).toFixed(2) : 'N/A';
      
      tr.innerHTML = `
        <td>${mes.mes}</td>
        <td>${lucroBruto}</td>
        <td>${custoMateriaPrima}</td>
        <td>${custoManutencao}</td>
        <td>${folhaPagamento}</td>
        <td>${lucroLiquido}</td>
      `;
      tbody.appendChild(tr);
    });

    // Chama a função para desenhar o gráfico
    desenhaGrafico(relatorio);
    
  } catch (error) {
    console.error('Erro ao carregar o relatório:', error);
    alert('Erro ao carregar os dados do relatório.');
  }
}

function gerarTabelas() {
  carregarRelatorio();
  desenhaTabela();
}

window.addEventListener('load', gerarTabelas);
