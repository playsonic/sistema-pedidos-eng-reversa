import { logger } from '../utils/logger.js';

export function errorHandlerGlobal(err, req, res, next) {
    logger.erro("Erro não tratado capturado pelo sistema:", err.message);

    return res.status(500).json({
        erro: "Ocorreu um erro interno no servidor. Tente novamente mais tarde."
    });
}