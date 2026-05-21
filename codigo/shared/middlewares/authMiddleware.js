export function authMiddlewareFake(req, res, next) {
    const token = req.headers['authorization'];

    const tokenValido = 'senha123';

    if (token === tokenValido) {
        return next();
    }

    return res.status(401).json({
        erro: "Acesso Negado: Token de autenticação inválido ou ausente."
    });
}