import { jest } from '@jest/globals';
import { authMiddlewareFake } from '../../../src/shared/middlewares/authMiddleware.js';

const mockRequest = (authorizationHeader) => ({
    headers: {
        'authorization': authorizationHeader
    }
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Testes do authMiddlewareFake (Middleware de Autenticação)', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve permitir o acesso (chamar next) quando o token for válido', () => {
        const req = mockRequest('senha123');
        const res = mockResponse();

        authMiddlewareFake(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('Deve bloquear o acesso e devolver status 401 quando o token estiver ausente', () => {
        const req = mockRequest(undefined);
        const res = mockResponse();

        authMiddlewareFake(req, res, mockNext);

        expect(mockNext).not.toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            erro: "Acesso Negado: Token de autenticação inválido ou ausente."
        });
    });

    test('Deve bloquear o acesso e devolver status 401 quando o token for incorreto', () => {
        const req = mockRequest('senha_errada_qualquer');
        const res = mockResponse();

        authMiddlewareFake(req, res, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            erro: "Acesso Negado: Token de autenticação inválido ou ausente."
        });
    });

});