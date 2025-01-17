import { Router } from 'express';
import {
  novo,
  altera,
  um,
  todos,
  exclui,
} from '../controllers/funcionarioController.mjs';

const rotasFuncionario = Router();

rotasFuncionario.post('/cadastrar', novo);
rotasFuncionario.get('/listar', todos);
rotasFuncionario.get('/listar/:id', um);
rotasFuncionario.put('/editar', altera);
rotasFuncionario.delete('/deletar', exclui);

export default rotasFuncionario;
