import { Router } from 'express';
import { adicionarPedido, finalizarPedido, removerUltimo, buscarPedidoAtual } from './controllers/pedidoController.js';

const ordersRouter = Router();

ordersRouter.get('/pedidos', buscarPedidoAtual);
ordersRouter.post('/pedidos', adicionarPedido);
ordersRouter.post('/finalizar', finalizarPedido);
ordersRouter.delete('/remover', removerUltimo);

export { ordersRouter };