import { ItemPedido } from './itemPedido.js';

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

    precoFinal(estrategiaDeDesconto) {
        let taxa = this.total * 0.05;


        let valorDoDesconto = estrategiaDeDesconto ? estrategiaDeDesconto(this.total) : 0;

        return (this.total - valorDoDesconto) + taxa;
    }

    limpar() {
        this.itens = [];
        this.total = 0;
    }
}