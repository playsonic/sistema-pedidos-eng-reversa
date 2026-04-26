class Produto {
    static #tabelaPrecos = {
        "pizzap": 5,
        "pizzam": 7,
        "pizzag": 4,
        "suco": 6,
        "refrigerante": 3,
        "sanduiche": 5

    };

    static criarProduto(produto, quantidadeDigitada) {
        const qtd = Number(quantidadeDigitada);
        const nomeNormalizado = nome.toLowerCase();

        if (!qtd || qtd <= 0) {
            throw new Error("Quantidade inválida. Digite um número maior que zero.");
        }

        let precoVigente = catalago[produto.toLowerCase()] || 0;

        if (precoVigente === 0) {
            throw new Error("Produto inválido ou não cadastrado.");
        }

        return new ItemPedido(produto, qtd, precoVigente);
    }
}

class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = nomeProduto;
        this.qtd = Number(quantidade);
        this.preco = Number(produto.preco);
        this.subtotal = this.qtd * this.preco;
    }

    
}

class Pedidos {
    constructor() {

        if (Pedidos.instancia) {
            return Pedidos.instancia;
        }
        this.itens = [];
        this.total = 0;

        Pedidos.instancia = this;
    }

    adicionarItem(novoItem) {

        this.itens.push(novoItem);
        this.total += novoItem.subtotal
    }

    removerUltimo() {
        if (this.itens.length > 0) {
            let itemRemovido = this.itens.pop();
            this.total -= itemRemovido.subtotal;
        }
    }

    precoFinal() {

        let taxa = this.total * 0.05;
        let desconto = this.total;

        if (this.total > 100) {
            desconto -= (this.total * 0.2);
        } else if (this.total > 50) {
            desconto -= (this.total * 0.1);
        }

        return desconto + taxa;

    }

    limpar() {
        this.itens = [];
        this.total = 0;
    }

}