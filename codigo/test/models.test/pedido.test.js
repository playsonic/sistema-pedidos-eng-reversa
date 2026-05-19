import { Pedidos } from '../src/models/pedido.js';
import { Produto } from '../src/models/produto.js';

describe('Testes da classe Pedidos', () => {

    test('Cálculo do total: Deve somar os subtotais ao adicionar itens', () => {
        const pedido = new Pedidos();

        const item1 = Produto.criarProduto('pizzap', 'calabresa', 2);
        const item2 = Produto.criarProduto('suco', 'laranja', 1);

        pedido.adicionarItem(item1);
        expect(pedido.total).toBe(20);

        pedido.adicionarItem(item2);
        expect(pedido.total).toBe(23);
    });

    test('Aplicação de desconto: Deve calcular o preço final com a estratégia fornecida', () => {
        const pedido = new Pedidos();

        // Simulando as funções de callback que a Strategy passaria
        const semDesconto = (total) => 0;
        const desconto10 = (total) => total * 0.10;
        const desconto20 = (total) => total * 0.20;

        // Teste 1: Sem desconto (Apenas Taxa de 5%)
        pedido.adicionarItem(Produto.criarProduto('pizzap', 'calabresa', 2)); // Total 20
        expect(pedido.precoFinal(semDesconto)).toBe(21); // (20 - 0) + 1

        pedido.limpar();

        // Teste 2: Desconto de 10%
        pedido.adicionarItem(Produto.criarProduto('pizzam', 'calabresa', 5)); // Total 60
        expect(pedido.precoFinal(desconto10)).toBe(57); // (60 - 6) + 3

        pedido.limpar();

        // Teste 3: Desconto de 20%
        pedido.adicionarItem(Produto.criarProduto('pizzag', 'calabresa', 10)); // Total 140
        expect(pedido.precoFinal(desconto20)).toBe(119); // (140 - 28) + 7
    });

});