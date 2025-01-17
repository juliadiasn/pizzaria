import tbVenda from "../models/vendaModel.mjs";

export async function novo(req, res) {
    const criado = await tbVenda.create({
        produtoId: req.body.produtoId,
        clienteId: req.body.clienteId,
        quantidade: req.body.quantidade,
        total: req.body.total,
        datavenda: req.body.datavenda,
    });
    
    res.json(criado)
}

export async function um(req, res) {
    const venda = await tbVenda.findOne({
        where: { id: req.params.id },
    });
    res.json(venda);
}

export async function todos(req, res) {
    const todos = await tbVenda.findAll();
    res.json(todos);
}

export async function altera(req, res) {
    const venda = await tbVenda.findOne({
        where: { id: req.body.id },
    });

    venda.produtoId = req.body.produtoId;
    venda.clienteId = req.body.clienteId;   
    venda.quantidade = req.body.quantidade;
    venda.total = req.body.total;
    venda.datavenda = req.body.datavenda;
    await venda.save();

    res.json(venda);
}

export async function exclui(req, res) {
    const venda = await tbVenda.findOne({
        where: { id: req.body.id },
    });

    await venda.destroy();
    res.json(venda);
}
