import { jest } from '@jest/globals';

jest.unstable_mockModule('../../../src/shared/utils/logger.js', () => ({
    logger: {
        info: jest.fn(),
        erro: jest.fn()
    }
}));

const { errorHandlerGlobal } = await import('../../../src/shared/middlewares/errorHandler.js');
const { logger } = await import('../../../src/shared/utils/logger.js');

const mockRequest = () => ({});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Testes do errorHandlerGlobal (Middleware de Erros)', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve registrar o erro no logger, retornar status 500 e uma mensagem genérica', () => {
        const erroSimulado = new Error("Falha catastrófica no banco de dados!");

        const req = mockRequest();
        const res = mockResponse();

        errorHandlerGlobal(erroSimulado, req, res, mockNext);

        expect(logger.erro).toHaveBeenCalledTimes(1);
        expect(logger.erro).toHaveBeenCalledWith("Erro interno no servidor", erroSimulado);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            erro: "Ocorreu um erro interno no servidor."
        });

        expect(mockNext).not.toHaveBeenCalled();
    });

});