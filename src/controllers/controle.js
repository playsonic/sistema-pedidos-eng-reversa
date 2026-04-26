import { atualizarTela } from '../views/pedidoView.js';
import { Produto } from '../models/entidade.js';
import { services } from '../services/services.js'; 

export function clickAdcionarPedido() {
    let pegarElementoProduto = document.getElementById("produto").value;
    let pegarElementoQuantidade = document.getElementById("qtd").value;

    try {
        let novoProduto = Produto.criarProduto(pegarElementoProduto, "padrão", pegarElementoQuantidade);

        services.adicionarPedido(novoProduto);

        atualizarTela(services.itens, services.total);

    } catch (erro) {
        alert(erro.message);
    }
}

export function clickFinalizarPedido() {
    if (services.itens.length === 0) {
        alert("Adicione itens ao pedido antes de finalizar.");
        return;
    }

    try {
        let totalFinal = services.finalizarPedido(); 
        alert("Total final: R$ " + totalFinal);

        services.limparTudo();

        atualizarTela(services.itens, services.total);

    } catch (error) {
        alert(error.message); 
    }
}

export function clickRemoverUltimo() {
    if (services.itens.length === 0) {
        alert("Adicione itens ao pedido antes de remover.");
        return;
    }

    try {
        services.removerUltimo();
        atualizarTela(services.itens, services.total);
    } catch (error) {
        alert(error.message);
    }
}