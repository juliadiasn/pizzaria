import e, { Router } from 'express';
import {
  exclui,
  altera,
  novo,
  todos,
  um,
} from '../controllers/vendaController.mjs';

const rotasVenda = Router();
rotasVenda.post('/cadastrar', novo);
rotasVenda.get('/listar', todos);
rotasVenda.get('/listar/:id', um);
rotasVenda.put('/editar', altera);
rotasVenda.delete('/deletar', exclui);

export default rotasVenda;
