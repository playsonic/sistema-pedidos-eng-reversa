import { Router } from 'express';
import { adicionarPedido, finalizarPedido, removerUltimo, buscarPedidoAtual } from './controllers/pedidoController.js';
import { authMiddlewareFake } from '../../../shared/middlewares/authMiddleware.js';

const ordersRouter = Router();

// Rota publica
ordersRouter.get('/pedidos', buscarPedidoAtual);

// Rotas privadas
ordersRouter.post('/pedidos', authMiddlewareFake, adicionarPedido);
ordersRouter.post('/finalizar', authMiddlewareFake, finalizarPedido);
ordersRouter.delete('/remover', authMiddlewareFake, removerUltimo);

export { ordersRouter };