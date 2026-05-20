export class ItemPedido {
    constructor(nomeProduto, quantidade, precoUnitario) {
        this.produto = nomeProduto;
        this.qtd = Number(quantidade);
        this.preco = Number(precoUnitario);
        this.subtotal = this.qtd * this.preco;
    }
}

