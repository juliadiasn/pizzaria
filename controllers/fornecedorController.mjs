import tbFornecedor from '../models/fornecedorModel.mjs';


export async function todos(req, res) {
  try {
    const fornecedores = await tbFornecedor.findAll();
    res.json(fornecedores);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao buscar fornecedores: ' + error.message });
  }
}

export async function novo(req, res) {
  const criado = await tbFornecedor.create({
    nome: req.body.nome,
    cnpj: req.body.cnpj,
    telefone: req.body.telefone,
    email: req.body.email,
  });

  res.json(criado);
}

export async function um(req, res) {
  const fornecedor = await tbFornecedor.findOne({
    where: { id: req.params.id },
  });
  res.json(fornecedor);
}

export async function altera(req, res) {
  const fornecedor = await tbFornecedor.findOne({
    where: { id: req.body.id },
  });

  fornecedor.nome = req.body.nome;
  fornecedor.cnpj = req.body.cnpj;
  fornecedor.telefone = req.body.telefone;
  fornecedor.email = req.body.email;

  await fornecedor.save();

  res.json(fornecedor);
}

export async function exclui(req, res) {
  const fornecedor = await tbFornecedor.findOne({
    where: { id: req.body.id },
  });

  await fornecedor.destroy();
  res.json(fornecedor);
}
