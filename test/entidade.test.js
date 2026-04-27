import { Produto, Pedidos } from '../src/models/entidade.js';

describe('Testes da classe Produto', () => {

    test('Deve criar um ItemPedido corretamente com dados válidos', () => {
        const item = Produto.criarProduto('pizzap', 'calabresa', 2);

        expect(item.produto).toBe('pizzap calabresa'); 
        expect(item.qtd).toBe(2);                     
        expect(item.preco).toBe(10);                  
        expect(item.subtotal).toBe(20);              
    });

    test('Deve lançar erro se a quantidade for zero ou negativa', () => {
        expect(() => {
            Produto.criarProduto('pizzap', 'calabresa', 0);
        }).toThrow('Quantidade inválida. Digite um número maior que zero.');
    });

    test('Deve lançar erro se o produto não existir no cardápio', () => {
        expect(() => {
            Produto.criarProduto('pizzap', 'sabor_inexistente', 1);
        }).toThrow('Produto inválido ou não cadastrado no cardápio.');
    });

});

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

        const semDesconto = (total) => 0;
        const desconto10 = (total) => total * 0.10;
        const desconto20 = (total) => total * 0.20;

        pedido.adicionarItem(Produto.criarProduto('pizzap', 'calabresa', 2)); // Total 20

        expect(pedido.precoFinal(semDesconto)).toBe(21);

        pedido.limpar();
        pedido.adicionarItem(Produto.criarProduto('pizzam', 'calabresa', 5)); // Total 60

        expect(pedido.precoFinal(desconto10)).toBe(57);

        pedido.limpar();
        pedido.adicionarItem(Produto.criarProduto('pizzag', 'calabresa', 10)); // Total 140

        expect(pedido.precoFinal(desconto20)).toBe(119);
    });

});