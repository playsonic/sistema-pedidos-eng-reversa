export class Produto {
    static #cardapio = {
        "pizzap": 
        { 
            "calabresa": 10, 
            "quatroqueijos": 10, 
            "peperonecheese": 12 
        },
        "pizzam": 
        { 
            "calabresa": 12, 
            "quatroqueijos": 12, 
            "peperonecheese": 14 
        },
        "pizzag": 
        { 
            "calabresa": 14, 
            "quatroqueijos": 14, 
            "peperonecheese": 16 
        },
        "suco": 
        { 
            "uva": 2, 
            "laranja": 3 
        },
        "refrigerante": 
        { 
            "lata": 3, 
            "1litro": 5 },
        "sanduiche": 
        { 
            "misto": 7, 
            "ovo": 8 
        }
    };

    static criarProduto(categoria, sabor, quantidadeDigitada) {
        const qtd = Number(quantidadeDigitada);
        const catNormalizada = categoria.toLowerCase();
        const saborNormalizado = sabor.toLowerCase();

        if (!qtd || qtd <= 0) {
            throw new Error("Quantidade inválida. Digite um número maior que zero.");
        }

        if (!this.#cardapio[catNormalizada] || !this.#cardapio[catNormalizada][saborNormalizado]) {
            throw new Error("Produto inválido ou não cadastrado no cardápio.");
        }

        let precoVigente = this.#cardapio[catNormalizada][saborNormalizado];

        const nomeCompleto = `${categoria} ${sabor}`;

        return new ItemPedido(nomeCompleto, qtd, precoVigente);
    }
}

export class ItemPedido {
    constructor(nomeProduto, quantidade, precoUnitario) {
        this.produto = nomeProduto;
        this.qtd = Number(quantidade);
        this.preco = Number(precoUnitario);
        this.subtotal = this.qtd * this.preco; 
    }
}

export class Pedidos {
    constructor() {
        this.itens = [];
        this.total = 0;
    }

    adicionarItem(novoItem) {
        this.itens.push(novoItem);
        this.total += novoItem.subtotal;
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