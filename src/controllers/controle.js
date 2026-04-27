import { Produto } from '../models/entidade.js';
import { services } from '../services/services.js';
import { WhatsappService } from '../services/WhatsappService.js';

export function adicionarPedido(req, res) {
    
    const { produto, quantidade } = req.body;

    try {
        let novoProduto = Produto.criarProduto(produto, "padrão", quantidade);

        services.adicionarPedido(novoProduto);

        return res.status(201).json({
            mensagem: "Produto adicionado com sucesso!",
            carrinho: services.pedidoAtual.itens
        });

    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

export async function finalizarPedido(req, res) {
    const { numeroCliente } = req.body;

    const listaDeItens = services.pedidoAtual.itens;

    if (listaDeItens.length === 0) {
        return res.status(400).json({ erro: "Adicione itens ao pedido antes de finalizar." });
    }

    try {
        let totalFinal = services.obterTotalFinal();

        let textoDetalhes = "";
        listaDeItens.forEach(item => {
            textoDetalhes += `- ${item.qtd}x ${item.produto} (R$ ${item.preco.toFixed(2)})\n`;
        });

        await services.limparPedidos();

        if (numeroCliente) {
            const mensagem = `*Olá! Seu pedido foi finalizado com sucesso.*\n\n*Detalhes do seu pedido:*\n${textoDetalhes}\n*Total a pagar: R$ ${totalFinal.toFixed(2)}*\n\nAgradecemos a preferência!`;

            try {
                await WhatsappService.enviarMensagem(numeroCliente, mensagem);
            } catch (erroWhatsapp) {
                console.error("Pedido salvo, mas falha ao enviar WhatsApp:", erroWhatsapp);
            }
        }

        return res.status(200).json({
            mensagem: "Pedido finalizado com sucesso!",
            totalPago: totalFinal
        });

    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}

export function removerUltimo(req, res) {
    if (services.pedidoAtual.itens.length === 0) {
        return res.status(400).json({ erro: "Adicione itens ao pedido antes de remover." });
    }

    try {
        services.removerUltimoItem();

        return res.status(200).json({
            mensagem: "Último item removido.",
            carrinhoAtualizado: services.pedidoAtual.itens
        });
    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}

export function buscarPedidoAtual(req, res) {
    try {
        const itens = services.pedidoAtual.itens;
        const total = services.obterTotalFinal();

        return res.status(200).json({
            itens: itens,
            total: total
        });
    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}