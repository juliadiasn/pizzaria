import tbCliente from '../models/clienteModel.mjs';
import conexao from '../database/dbConfig.mjs';




export async function novo(req, res) {
  const criado = await tbCliente.create({
    nome: req.body.nome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
  });

  res.json(criado);
}

export async function um(req, res) {
  const cliente = await tbCliente.findOne({
    where: { id: req.params.id },
  });
  res.json(cliente);
}

export async function todos(req, res) {
  const todos = await tbCliente.findAll();
  res.json(todos);
}

export async function altera(req, res) {
  try {
    const cliente = await tbCliente.findOne({
      where: { id: req.body.id },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    cliente.nome = req.body.nome;
    cliente.cpf = req.body.cpf;
    cliente.telefone = req.body.telefone;
    cliente.endereco = req.body.endereco;

    await cliente.save();

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export async function exclui(req, res) {
  try {
    const cliente = await tbCliente.findOne({
      where: { id: req.body.id },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }


    await cliente.destroy();

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
