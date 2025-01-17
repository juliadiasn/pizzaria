import { Router } from 'express';
import {
  novo,
  altera,
  um,
  todos,
  exclui,
} from '../controllers/fornecedorController.mjs';

const rotasFornecedor = Router();

rotasFornecedor.post('/cadastrar', novo);
rotasFornecedor.get('/listar', todos);
rotasFornecedor.get('/listar/:id', um);
rotasFornecedor.put('/editar', altera);
rotasFornecedor.delete('/deletar', exclui);

export default rotasFornecedor;
