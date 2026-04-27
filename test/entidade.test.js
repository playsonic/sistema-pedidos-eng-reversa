import { Produto } from '../src/models/entidade.js';

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