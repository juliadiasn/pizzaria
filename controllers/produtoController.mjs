import conexao from '../database/dbConfig.mjs';
import tbFornecedor from '../models/fornecedorModel.mjs';
import tbProduto from '../models/produtoModel.mjs';

export async function novo(req, res) {
  try {
    const criado = await tbProduto.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      precovenda: req.body.precovenda,  
      quantidade: req.body.quantidade,
      fornecedorId: req.body.fornecedorId,
    });

    res.status(201).json(criado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export async function todos(req, res) {
  try {
    // Inclusão do nome do fornecedor
    const produtos = await tbProduto.findAll({
      include: [{
        model: tbFornecedor,
        attributes: ['nome'],
      }]
    });

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function um(req, res) {
  try {
    const produto = await tbProduto.findOne({
      where: { id: req.params.id },
    });

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function altera(req, res) {
  try {
    const produto = await tbProduto.findOne({
      where: { id: req.body.id },
    });

    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
    produto.precovenda = req.body.precovenda;
    produto.quantidade = req.body.quantidade;
    produto.fornecedorId = req.body.fornecedorId;

    await produto.save();

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function exclui(req, res) {
  const produto = await tbProduto.findOne({
    where: { id: req.body.id },
  });

  await produto.destroy();
  res.json(produto);
}
