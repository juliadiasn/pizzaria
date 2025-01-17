
import tbFuncionario from '../models/funcionarioModel.mjs';

export async function novo(req, res) {
  const criado = await tbFuncionario.create({
    nome: req.body.nome,
    cpf: req.body.cpf,
    cargo: req.body.cargo,
    telefone: req.body.telefone,
    salario: req.body.salario,
  });

  res.json(criado);
}

export async function um(req, res) {
  const funcionario = await tbFuncionario.findOne({
    where: { id: req.params.id },
  });
  res.json(funcionario);
}

export async function todos(req, res) {
  const todos = await tbFuncionario.findAll();
  res.json(todos);
}

export async function altera(req, res) {
  const funcionario = await tbFuncionario.findOne({
    where: { id: req.body.id },
  });

  funcionario.nome = req.body.nome;
  funcionario.cpf = req.body.cpf;
  funcionario.cargo = req.body.cargo;
  funcionario.telefone = req.body.telefone;
  funcionario.salario = req.body.salario;

  await funcionario.save();

  res.json(funcionario);
}

export async function exclui(req, res) {
  const funcionario = await tbFuncionario.findOne({
    where: { id: req.body.id },
  });

  await funcionario.destroy();
  res.json(funcionario);
}