import { jest } from '@jest/globals';

jest.unstable_mockModule('../../../../src/modules/orders/services/pedidosService.js', () => ({
    services: {
        pedidoAtual: { itens: [] },
        adicionarPedido: jest.fn(),
        obterTotalFinal: jest.fn(),
        limparPedidos: jest.fn(),
        removerUltimoItem: jest.fn()
    }
}));

jest.unstable_mockModule('../../../../src/shared/utils/linkWhatsapp.js', () => ({
    WhatsappService: { gerarLinkWaMe: jest.fn() }
}));

jest.unstable_mockModule('../../../../src/shared/config/env.js', () => ({
    envConfig: { numeroDono: '5511000000000' }
}));

const { adicionarPedido, finalizarPedido, removerUltimo, buscarPedidoAtual } = await import('../../../../src/modules/orders/controllers/pedidoController.js');
const { services } = await import('../../../../src/modules/orders/services/pedidosService.js');
const { WhatsappService } = await import('../../../../src/shared/utils/linkWhatsapp.js');

const mockRequest = (body = {}) => ({ body });

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Testes do PedidoController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        services.pedidoAtual.itens = [];
    });

    describe('adicionarPedido()', () => {
        test('Deve adicionar um produto com sabor e devolver status 201', async () => {
            const req = mockRequest({ produto: 'pizzap', sabor: 'calabresa', quantidade: 2 });
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'pizzap calabresa', qtd: 2, preco: 10, subtotal: 20 }];

            await adicionarPedido(req, res, mockNext);

            expect(services.adicionarPedido).toHaveBeenCalledWith('pizzap', 'calabresa', 2);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                mensagem: "Produto adicionado com sucesso!",
                carrinho: services.pedidoAtual.itens
            }));
        });

        test('Deve devolver erro 400 se o Service rejeitar a adição do produto', async () => {
            const req = mockRequest({ produto: 'produto_invalido', sabor: 'inexistente', quantidade: 0 });
            const res = mockResponse();

            services.adicionarPedido.mockRejectedValue(new Error("Quantidade inválida."));

            await adicionarPedido(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ erro: "Quantidade inválida." });
        });
    });

    describe('finalizarPedido()', () => {
        test('Deve devolver erro 400 se o carrinho estiver vazio', async () => {
            const req = mockRequest({ numeroCliente: '5511999999999' });
            const res = mockResponse();

            await finalizarPedido(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ erro: "Adicione itens ao pedido antes de finalizar." });

            expect(WhatsappService.gerarLinkWaMe).not.toHaveBeenCalled();
        });

        test('Deve finalizar pedido, limpar carrinho e devolver links do WhatsApp', async () => {
            const req = mockRequest({ numeroCliente: '5511999999999' });
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'pizzap', qtd: 1, preco: 10 }];
            services.obterTotalFinal.mockReturnValue(10);

            WhatsappService.gerarLinkWaMe.mockReturnValue('https://wa.me/mocklink');

            await finalizarPedido(req, res, mockNext);

            expect(services.limparPedidos).toHaveBeenCalled();

            expect(WhatsappService.gerarLinkWaMe).toHaveBeenCalledTimes(2); 

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                mensagem: "Pedido finalizado com sucesso!",
                totalPago: 10,
                linksWhatsapp: {
                    enviarParaCliente: 'https://wa.me/mocklink',
                    enviarParaEstabelecimento: 'https://wa.me/mocklink'
                }
            });
        });

        test('Deve encaminhar erros internos para o middleware global chamando next(erro)', async () => {
            const req = mockRequest({ numeroCliente: '5511999999999' });
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'pizzap', qtd: 1, preco: 10 }];

            const erroSimulado = new Error("Falha ao limpar ficheiro JSON");
            services.limparPedidos.mockRejectedValue(erroSimulado);

            await finalizarPedido(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(erroSimulado);
        });
    });

    describe('removerUltimo()', () => {
        test('Deve devolver erro 400 ao tentar remover de um carrinho vazio', async () => {
            const req = mockRequest();
            const res = mockResponse();

            await removerUltimo(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('Deve remover o último item e devolver status 200', async () => {
            const req = mockRequest();
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'suco laranja', qtd: 1 }];

            await removerUltimo(req, res, mockNext);

            expect(services.removerUltimoItem).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                mensagem: "Último item removido."
            }));
        });
    });

    describe('buscarPedidoAtual()', () => {
        test('Deve devolver os itens atuais e o total', () => {
            const req = mockRequest();
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'suco laranja', qtd: 1 }];
            services.obterTotalFinal.mockReturnValue(2);

            buscarPedidoAtual(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                itens: [{ produto: 'suco laranja', qtd: 1 }],
                total: 2
            });
        });
    });

});