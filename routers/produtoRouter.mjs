import { Router } from 'express';
import {
  altera,
  um,
  todos,
  exclui,
  novo
  
} from '../controllers/produtoController.mjs';

const rotasProduto = Router();

rotasProduto.post('/cadastrar', novo);
rotasProduto.get('/listar', todos);
rotasProduto.get('/listar/:id', um);
rotasProduto.put('/editar', altera);
rotasProduto.delete('/deletar', exclui);

export default rotasProduto;
