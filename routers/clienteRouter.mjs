import { Router } from 'express';
import {
  novo,
  altera,
  um,
  todos,
  exclui,
} from '../controllers/clienteController.mjs.mjs';

const rotasCliente = Router();

rotasCliente.post('/cadastrar', novo);
rotasCliente.get('/listar', todos);
rotasCliente.get('/listar/:id', um);
rotasCliente.put('/editar', altera);
rotasCliente.delete('/deletar', exclui);

export default rotasCliente;
