import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/models/entidade.js', () => ({
    Produto: { criarProduto: jest.fn() }
}));

jest.unstable_mockModule('../src/services/whatsapp.js', () => ({
    WhatsappService: { enviarMensagem: jest.fn() }
}));

jest.unstable_mockModule('../src/services/services.js', () => ({
    services: {
        pedidoAtual: { itens: [] },
        adicionarPedido: jest.fn(),
        obterTotalFinal: jest.fn(),
        limparPedidos: jest.fn(),
        removerUltimoItem: jest.fn()
    }
}));

const { adicionarPedido, finalizarPedido, removerUltimo, buscarPedidoAtual } = await import('../src/controllers/controle.js');
const { Produto } = await import('../src/models/entidade.js');
const { services } = await import('../src/services/services.js');
const { WhatsappService } = await import('../src/services/whatsapp.js');

const mockRequest = (body = {}) => ({ body });

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};


describe('Testes do PedidoController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        services.pedidoAtual.itens = [];
    });

    describe('adicionarPedido()', () => {
        test('Deve adicionar um produto e retornar status 201', () => {
            const req = mockRequest({ produto: 'pizzap', quantidade: 2 });
            const res = mockResponse();

            Produto.criarProduto.mockReturnValue({ produto: 'pizzap padrão', qtd: 2, preco: 10 });

            adicionarPedido(req, res);

            expect(Produto.criarProduto).toHaveBeenCalledWith('pizzap', 'padrão', 2);
            expect(services.adicionarPedido).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                mensagem: "Produto adicionado com sucesso!"
            }));
        });

        test('Deve retornar erro 400 se o Produto rejeitar a criação', () => {
            const req = mockRequest({ produto: 'produto_invalido', quantidade: 0 });
            const res = mockResponse();

            // Simulamos o model disparando um erro
            Produto.criarProduto.mockImplementation(() => {
                throw new Error("Quantidade inválida.");
            });

            adicionarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ erro: "Quantidade inválida." });
        });
    });

    describe('finalizarPedido()', () => {
        test('Deve retornar erro 400 se o carrinho estiver vazio', async () => {
            const req = mockRequest({ numeroCliente: '5511999999999' });
            const res = mockResponse();

            await finalizarPedido(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ erro: "Adicione itens ao pedido antes de finalizar." });
            expect(WhatsappService.enviarMensagem).not.toHaveBeenCalled();
        });

        test('Deve finalizar pedido, limpar carrinho e chamar Whatsapp se tiver itens', async () => {
            const req = mockRequest({ numeroCliente: '5511999999999' });
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'pizzap', qtd: 1, preco: 10 }];
            services.obterTotalFinal.mockReturnValue(10);

            await finalizarPedido(req, res);

            expect(services.limparPedidos).toHaveBeenCalled();
            expect(WhatsappService.enviarMensagem).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                mensagem: "Pedido finalizado com sucesso!",
                totalPago: 10
            });
        });
    });

    describe('removerUltimo()', () => {
        test('Deve retornar erro 400 ao tentar remover de um carrinho vazio', () => {
            const req = mockRequest();
            const res = mockResponse();

            removerUltimo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('Deve remover o último item e retornar status 200', () => {
            const req = mockRequest();
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'suco', qtd: 1 }];

            removerUltimo(req, res);

            expect(services.removerUltimoItem).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                mensagem: "Último item removido."
            }));
        });
    });

    describe('buscarPedidoAtual()', () => {
        test('Deve retornar os itens atuais e o total', () => {
            const req = mockRequest();
            const res = mockResponse();

            services.pedidoAtual.itens = [{ produto: 'suco', qtd: 1 }];
            services.obterTotalFinal.mockReturnValue(2);

            buscarPedidoAtual(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                itens: [{ produto: 'suco', qtd: 1 }],
                total: 2
            });
        });
    });

});