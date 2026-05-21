import { services } from '../services/pedidosService.js';
import { WhatsappService } from '../../../shared/utils/linkWhatsapp.js';
import { envConfig } from '../../../shared/config/env.js';

export async function adicionarPedido(req, res, next) {
    const { produto, sabor, quantidade } = req.body;

    try {
        
        await services.adicionarPedido(produto, sabor, quantidade);

        return res.status(201).json({
            mensagem: "Produto adicionado com sucesso!",
            carrinho: services.pedidoAtual.itens
        });

    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

export async function finalizarPedido(req, res, next) {
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

        let linkCliente = null;
        if (numeroCliente) {
            const mensagemCliente = `*Olá! Seu pedido foi finalizado com sucesso.*\n\n*Detalhes do seu pedido:*\n${textoDetalhes}\n*Total a pagar: R$ ${totalFinal.toFixed(2)}*\n\nAgradecemos a preferência!`;
            linkCliente = WhatsappService.gerarLinkWaMe(numeroCliente, mensagemCliente);
        }

       
        let numeroDono = envConfig.numeroDono;

        const mensagemDono = `*NOVO PEDIDO!*\n\n*Itens a preparar:*\n${textoDetalhes}\n*Valor Total: R$ ${totalFinal.toFixed(2)}*\n*Contato do Cliente:* ${numeroCliente || 'Não informado'}`;
        const linkDono = WhatsappService.gerarLinkWaMe(numeroDono, mensagemDono);

        await services.limparPedidos();

        return res.status(200).json({
            mensagem: "Pedido finalizado com sucesso!",
            totalPago: totalFinal,
            linksWhatsapp: {
                enviarParaCliente: linkCliente,
                enviarParaEstabelecimento: linkDono
            }
        });

    } catch (erro) {
        next(erro);
    }
}

export async function removerUltimo(req, res, next) {
    if (services.pedidoAtual.itens.length === 0) {
        return res.status(400).json({ erro: "Adicione itens ao pedido antes de remover." });
    }

    try {
        await services.removerUltimoItem();

        return res.status(200).json({
            mensagem: "Último item removido.",
            carrinhoAtualizado: services.pedidoAtual.itens
        });
    } catch (erro) {
        next(erro);
    }
}

export function buscarPedidoAtual(req, res, next) {
    try {
        const itens = services.pedidoAtual.itens;
        const total = services.obterTotalFinal();

        return res.status(200).json({
            itens: itens,
            total: total
        });
    } catch (erro) {
        next(erro);
    }
}